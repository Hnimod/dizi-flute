/**
 * VexFlow-based staff notation renderer.
 * Renders professional staff notation with notes positioned to align with jianpu layout.
 */
import { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Beam,
  Curve,
  Dot,
  Annotation,
  AnnotationVerticalJustify,
  BarNote,
  BarlineType,
} from "vexflow";
import type { LayoutItem, Token } from "../jianpu/types";

// --- Pitch mapping (reused from custom renderer) ---

const NOTE_ORDER = ["C", "D", "E", "F", "G", "A", "B"];
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const ENHARMONIC_FLAT: Record<string, string> = {
  "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb",
};

const KEY_TO_NORM: Record<string, string> = {
  C: "C", D: "D", E: "E", F: "F", G: "G", A: "A", B: "B",
  "bD": "Db", "bE": "Eb", "bB": "Bb", "bA": "Ab", "bG": "Gb",
  "#C": "C#", "#F": "F#",
};

// VexFlow key signature names
const KEY_TO_VF: Record<string, string> = {
  C: "C", D: "D", E: "E", F: "F", G: "G", A: "A", B: "B",
  "Db": "Db", "Eb": "Eb", "Bb": "Bb", "Ab": "Ab", "Gb": "Gb",
  "C#": "C#", "F#": "F#",
};

interface ScaleEntry {
  noteName: string;
  letter: string;
  diatonicBase: number;
}

function buildScaleInfo(key: string): ScaleEntry[] {
  const normKey = KEY_TO_NORM[key] || key;
  let baseNote = normKey.replace(/[#b]/, "");
  let baseSemitone = CHROMATIC.indexOf(baseNote);
  if (normKey.includes("#")) baseSemitone = (baseSemitone + 1) % 12;
  if (normKey.includes("b")) baseSemitone = (baseSemitone + 11) % 12;
  const useFlats = normKey.includes("b") || ["F", "Bb", "Eb", "Ab", "Db", "Gb"].includes(normKey);

  return MAJOR_INTERVALS.map((interval) => {
    const semitones = (baseSemitone + interval) % 12;
    let noteName = CHROMATIC[semitones]!;
    if (useFlats && ENHARMONIC_FLAT[noteName]) {
      noteName = ENHARMONIC_FLAT[noteName]!;
    }
    const letter = noteName[0]!;
    const diatonicBase = NOTE_ORDER.indexOf(letter);
    return { noteName, letter, diatonicBase };
  });
}

function extractMainDigit(value: string): string {
  const graceMatch = value.match(/^\(([1-7][',]*)\)(?:\(([1-7][',]*)\))?([1-7])/);
  if (graceMatch) return graceMatch[3]!;
  return value[0] || value;
}

/**
 * Convert jianpu digit + octave + key to VexFlow key string.
 * Returns e.g. "f#/4", "a/4", "b/3"
 */
function noteToVexKey(digit: string, octave: number, scaleInfo: ScaleEntry[]): string | null {
  const idx = parseInt(digit) - 1;
  if (idx < 0 || idx > 6) return null;

  const entry = scaleInfo[idx]!;
  const absOctave = 4 + octave;

  // VexFlow format: "letter/octave" (lowercase for sharps/flats via Accidental)
  return `${entry.letter.toLowerCase()}/${absOctave}`;
}

/**
 * Map jianpu duration to VexFlow duration string.
 * VexFlow durations: "w" (whole), "h" (half), "q" (quarter), "8" (eighth), "16" (sixteenth)
 */
function toVexDuration(token: Token, holdCount: number): string {
  if (token.type !== "note" && token.type !== "rest") return "q";

  const dur = (token as { duration?: string }).duration;
  const dotted = token.type === "note" && token.dotted;

  if (dur === "sixteenth") return dotted ? "16d" : "16";
  if (dur === "eighth") return dotted ? "8d" : "8";

  // Quarter + holds
  if (holdCount >= 3) return dotted ? "wd" : "w";
  if (holdCount === 1) return dotted ? "hd" : "h";
  return dotted ? "qd" : "q";
}

// --- Flatten layout items ---

interface FlatItem {
  token: Token;
  x: number;
  width: number;
  inBeam: boolean;
  inSlur: boolean;
  slurGroupIdx: number;
  beatIndex: number | null;
}

function flattenItems(items: LayoutItem[], inBeam = false, inSlur = false, slurIdx = -1): FlatItem[] {
  const result: FlatItem[] = [];
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      const isBeam = item.groupType === "beam";
      const isSlur = item.groupType === "slur";
      result.push(...flattenItems(
        item.children,
        isBeam || inBeam,
        isSlur || inSlur,
        isSlur ? items.indexOf(item) : slurIdx,
      ));
    } else {
      result.push({ token: item.token, x: item.x, width: item.width, inBeam, inSlur, slurGroupIdx: slurIdx, beatIndex: item.beatIndex });
    }
  }
  return result;
}

// --- Main VexFlow rendering component ---

interface VexFlowStaffLineProps {
  items: LayoutItem[];
  maxWidth: number;
  keySignature: string;
  timeSignature?: string;
  containerWidth: number;
  showJianpu?: boolean;
  /** Callback with note positions (beatIndex → pixel x) after VexFlow renders, for aligning jianpu below */
  onNotePositions?: (positions: Map<number, number>) => void;
}

export function VexFlowStaffLine({ items, maxWidth, keySignature, timeSignature, containerWidth, showJianpu = true, onNotePositions }: VexFlowStaffLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    // Clear previous render
    containerRef.current.innerHTML = "";

    const normKey = KEY_TO_NORM[keySignature] || keySignature;
    const vfKey = KEY_TO_VF[normKey] || "C";
    const scaleInfo = buildScaleInfo(keySignature);

    // Calculate pixel width for VexFlow based on container
    const staveWidth = containerWidth - 10;
    if (staveWidth <= 0) return;

    // Create renderer — extra height for ledger lines below staff
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    const height = 130;
    renderer.resize(containerWidth, height);
    const context = renderer.getContext();

    // Create stave with clef, key signature, and time signature
    const stave = new Stave(0, 10, staveWidth);
    stave.addClef("treble");
    stave.addKeySignature(vfKey);
    if (timeSignature) {
      stave.addTimeSignature(timeSignature);
    }
    stave.setContext(context);
    stave.draw();

    // Get the available note area width
    const noteStartX = stave.getNoteStartX();
    const noteEndX = stave.getNoteEndX();
    const noteAreaWidth = noteEndX - noteStartX;

    // Flatten items and build VexFlow notes
    const flat = flattenItems(items);
    const vfNotes: StaveNote[] = [];
    const beamGroups: StaveNote[][] = [];
    let currentBeamGroup: StaveNote[] | null = null;
    const slurPairs: Map<number, { first: StaveNote; last: StaveNote }> = new Map();

    // First pass: count holds per note
    const holdCounts: number[] = [];
    for (let i = 0; i < flat.length; i++) {
      let count = 0;
      if (flat[i]!.token.type === "note") {
        for (let j = i + 1; j < flat.length; j++) {
          if (flat[j]!.token.type === "hold") count++;
          else break;
        }
      }
      holdCounts.push(count);
    }

    for (let i = 0; i < flat.length; i++) {
      const item = flat[i]!;
      const token = item.token;

      if (token.type === "note") {
        const mainDigit = extractMainDigit(token.value);
        const vexKey = noteToVexKey(mainDigit, token.octave, scaleInfo);
        if (!vexKey) continue;

        const duration = toVexDuration(token, holdCounts[i]!);
        const note = new StaveNote({
          keys: [vexKey],
          duration,
          autoStem: true,
        });

        // Add dot for dotted notes
        if (duration.endsWith("d")) {
          Dot.buildAndAttach([note]);
        }

        // Add jianpu number annotation below the note
        if (showJianpu) {
          let jianpuText = mainDigit;
          // Add octave dots: · below for lower, · above for upper
          if (token.octave < 0) jianpuText += "\u0323".repeat(-token.octave); // combining dot below
          if (token.octave > 0) jianpuText += "\u0307".repeat(token.octave);  // combining dot above
          note.addModifier(
            new Annotation(jianpuText)
              .setVerticalJustification(AnnotationVerticalJustify.BOTTOM)
              .setFont("sans-serif", 13, "bold"),
          );
        }

        vfNotes.push(note);

        // Track beam groups
        if (item.inBeam && (duration === "8" || duration === "16" || duration === "8d" || duration === "16d")) {
          if (!currentBeamGroup) currentBeamGroup = [];
          currentBeamGroup.push(note);
        } else {
          if (currentBeamGroup && currentBeamGroup.length >= 2) {
            beamGroups.push(currentBeamGroup);
          }
          currentBeamGroup = null;
        }

        // Track slur groups
        if (item.inSlur && item.slurGroupIdx >= 0) {
          const existing = slurPairs.get(item.slurGroupIdx);
          if (!existing) {
            slurPairs.set(item.slurGroupIdx, { first: note, last: note });
          } else {
            existing.last = note;
          }
        }

      } else if (token.type === "rest") {
        const duration = toVexDuration(token, 0);
        const note = new StaveNote({
          keys: ["b/4"],
          duration: `${duration}r`,
        });

        if (showJianpu) {
          note.addModifier(
            new Annotation("0")
              .setVerticalJustification(AnnotationVerticalJustify.BOTTOM)
              .setFont("sans-serif", 13, "bold"),
          );
        }

        vfNotes.push(note);

        // End beam group on rest
        if (currentBeamGroup && currentBeamGroup.length >= 2) {
          beamGroups.push(currentBeamGroup);
        }
        currentBeamGroup = null;

      } else if (token.type === "bar") {
        // Insert bar line
        let barType = BarlineType.SINGLE;
        if (token.value === "||") barType = BarlineType.DOUBLE;
        else if (token.value === ":|" || token.value === ":||") barType = BarlineType.REPEAT_END;
        else if (token.value === "|:") barType = BarlineType.REPEAT_BEGIN;

        const barNote = new BarNote().setType(barType);
        vfNotes.push(barNote as unknown as StaveNote);

        // End beam group at bar line
        if (currentBeamGroup && currentBeamGroup.length >= 2) {
          beamGroups.push(currentBeamGroup);
        }
        currentBeamGroup = null;
      }
      // Skip holds, ties, breath, etc. — handled via duration/decorations
    }

    // End any remaining beam group
    if (currentBeamGroup && currentBeamGroup.length >= 2) {
      beamGroups.push(currentBeamGroup);
    }

    if (vfNotes.length === 0) return;

    // Create voice and format
    try {
      const voice = new Voice({ numBeats: vfNotes.length, beatValue: 4 }).setMode(Voice.Mode.SOFT);
      voice.addTickables(vfNotes);

      new Formatter().joinVoices([voice]).format([voice], noteAreaWidth);

      // Create beams BEFORE drawing so VexFlow suppresses individual flags
      const beams: Beam[] = [];
      for (const group of beamGroups) {
        try {
          beams.push(new Beam(group));
        } catch { /* skip invalid beam groups */ }
      }

      voice.draw(context, stave);

      // Extract note x-positions keyed by beatIndex for jianpu alignment
      if (onNotePositions) {
        const positions = new Map<number, number>();
        let noteIdx = 0;
        for (let i = 0; i < flat.length; i++) {
          const fi = flat[i]!;
          const t = fi.token.type;
          if (t === "note" || t === "rest" || t === "bar") {
            if (noteIdx < vfNotes.length && fi.beatIndex !== null) {
              positions.set(fi.beatIndex, vfNotes[noteIdx]!.getAbsoluteX());
            }
            noteIdx++;
          }
        }
        onNotePositions(positions);
      }

      // Draw beams after voice
      for (const beam of beams) {
        beam.setContext(context).draw();
      }

      // Draw slurs (curves below)
      for (const { first, last } of slurPairs.values()) {
        if (first !== last) {
          try {
            const curve = new Curve(first, last, {
              cps: [{ x: 0, y: 15 }, { x: 0, y: 15 }],
              position: Curve.Position.NEAR_HEAD,
              positionEnd: Curve.Position.NEAR_HEAD,
            });
            curve.setContext(context).draw();
          } catch { /* skip invalid curves */ }
        }
      }
    } catch (e) {
      console.warn("[VexFlow] Render error:", e);
    }
  }, [items, maxWidth, keySignature, timeSignature, containerWidth, showJianpu]);

  return (
    <div
      ref={containerRef}
      className="staff-notation"
      style={{ width: "100%" }}
    />
  );
}
