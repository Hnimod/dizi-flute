import { useCallback, useEffect, useMemo, useState } from "react";
import { JianpuRenderer } from "./JianpuRenderer";

interface JianpuBuilderProps {
  value: string;
  onChange: (jianpu: string) => void;
  timeSignature: string;
  title?: string;
  keySignature?: string;
  tempo?: number;
}

interface Modifiers {
  octave: number;
  duration: "" | "_" | "__";
  accidental: "" | "#" | "b";
  tonguing: boolean;
  beam: boolean;
  slur: boolean;
}

const INITIAL_MODS: Modifiers = {
  octave: 0,
  duration: "",
  accidental: "",
  tonguing: false,
  beam: false,
  slur: false,
};

function buildNoteToken(digit: string, mods: Modifiers): string {
  let token = "";
  if (mods.accidental) token += mods.accidental;
  token += digit;
  if (mods.octave > 0) token += "'".repeat(mods.octave);
  if (mods.octave < 0) token += ",".repeat(-mods.octave);
  if (mods.duration || mods.beam) token += mods.duration || "_";
  if (mods.tonguing) token += "T";
  return token;
}

function tokenBeats(token: string): number {
  if (token === "-") return 1;
  if (token === "0") return 1;
  if (token === "0_") return 0.5;
  if (token === "0__") return 0.25;
  if (token === "|" || token === "||" || token === "[" || token === "]" || token === "(" || token === ")" || token === "~" || token === "V") return 0;
  if (token.startsWith("T:") || token.startsWith("orn:")) return 0;
  if (token.includes("__")) return 0.25;
  if (token.includes("_")) return 0.5;
  if (/[1-7]/.test(token)) return 1;
  return 0;
}

function beatsPerMeasure(timeSig: string): number {
  const parts = timeSig.split("/");
  return parseInt(parts[0] || "4", 10);
}

function getCurrentMeasureBeats(tokens: string[]): number {
  let beats = 0;
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i]!;
    if (t === "|" || t === "||") break;
    beats += tokenBeats(t);
  }
  return beats;
}

function getWarnings(tokens: string[], timeSig: string): string[] {
  const warnings: string[] = [];
  const expected = beatsPerMeasure(timeSig);

  // Check bracket matching
  let openBeam = 0;
  let openSlur = 0;
  for (const t of tokens) {
    if (t === "[") openBeam++;
    if (t === "]") openBeam--;
    if (t === "(") openSlur++;
    if (t === ")") openSlur--;
    if (openBeam < 0) { warnings.push("Unexpected ]"); openBeam = 0; }
    if (openSlur < 0) { warnings.push("Unexpected )"); openSlur = 0; }
  }
  if (openBeam > 0) warnings.push("Unclosed [ bracket");
  if (openSlur > 0) warnings.push("Unclosed ( slur");

  // Check completed measures
  let measureBeats = 0;
  let measureNum = 1;
  for (const t of tokens) {
    if (t === "|" || t === "||") {
      if (measureBeats !== expected && measureBeats > 0) {
        warnings.push(`Measure ${measureNum}: ${measureBeats} beats (expected ${expected})`);
      }
      measureNum++;
      measureBeats = 0;
    } else {
      measureBeats += tokenBeats(t);
    }
  }

  return warnings;
}

const btnBase =
  "flex items-center justify-center rounded-md text-sm font-medium transition-all";
const btnNote =
  `${btnBase} h-10 w-10 hover:opacity-80`;
const btnMod =
  `${btnBase} h-8 px-2.5 text-xs`;
const btnAction =
  `${btnBase} h-8 px-3 text-xs`;

export function JianpuBuilder({
  value,
  onChange,
  timeSignature,
  title,
  keySignature,
  tempo,
}: JianpuBuilderProps) {
  const [tokens, setTokens] = useState<string[]>(() => {
    if (!value.trim()) return [];
    // Preserve newlines as "\n" tokens
    const result: string[] = [];
    for (const line of value.split("\n")) {
      if (result.length > 0) result.push("\n");
      const trimmed = line.trim();
      if (trimmed) result.push(...trimmed.split(/\s+/));
    }
    return result;
  });
  const [mods, setMods] = useState<Modifiers>(INITIAL_MODS);

  const jianpuText = useMemo(() => {
    const parts: string[] = [];
    let lineTokens: string[] = [];
    for (const t of tokens) {
      if (t === "\n") {
        parts.push(lineTokens.join(" "));
        lineTokens = [];
      } else {
        lineTokens.push(t);
      }
    }
    if (lineTokens.length > 0) parts.push(lineTokens.join(" "));
    return parts.join("\n");
  }, [tokens]);
  const currentBeats = useMemo(() => getCurrentMeasureBeats(tokens), [tokens]);
  const expected = beatsPerMeasure(timeSignature);
  const warnings = useMemo(() => getWarnings(tokens, timeSignature), [tokens, timeSignature]);

  useEffect(() => {
    onChange(jianpuText);
  }, [jianpuText, onChange]);

  const append = useCallback(
    (...newTokens: string[]) => {
      setTokens((prev) => [...prev, ...newTokens]);
    },
    [],
  );

  const undo = useCallback(() => {
    setTokens((prev) => {
      const next = prev.slice(0, -1);
      // If we removed a ] or ), turn off the modifier
      const removed = prev[prev.length - 1];
      if (removed === "]") setMods((m) => ({ ...m, beam: true }));
      if (removed === ")") setMods((m) => ({ ...m, slur: true }));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setTokens([]);
    setMods(INITIAL_MODS);
  }, []);

  const addNote = useCallback(
    (digit: string) => {
      const token = buildNoteToken(digit, mods);
      append(token);
      // Reset one-shot modifiers
      setMods((m) => ({
        ...m,
        accidental: "",
        tonguing: false,
      }));
    },
    [mods, append],
  );

  const addRest = useCallback(() => {
    const token = mods.duration ? `0${mods.duration}` : "0";
    append(token);
  }, [mods.duration, append]);

  const addHold = useCallback(() => append("-"), [append]);

  const addBarLine = useCallback(() => append("|"), [append]);
  const addEndBar = useCallback(() => append("||"), [append]);
  const addBreath = useCallback(() => append("V"), [append]);
  const addNewLine = useCallback(() => {
    setTokens((prev) => [...prev, "\n"]);
  }, []);

  const toggleBeam = useCallback(() => {
    if (mods.beam) {
      append("]");
      setMods((m) => ({ ...m, beam: false }));
    } else {
      append("[");
      setMods((m) => ({ ...m, beam: true, duration: "_" }));
    }
  }, [mods.beam, append]);

  const toggleSlur = useCallback(() => {
    if (mods.slur) {
      append(")");
      setMods((m) => ({ ...m, slur: false }));
    } else {
      append("(");
      setMods((m) => ({ ...m, slur: true }));
    }
  }, [mods.slur, append]);

  const toggleMod = useCallback(
    (key: keyof Modifiers, val: unknown) => {
      setMods((m) => ({ ...m, [key]: m[key] === val ? (typeof val === "boolean" ? false : "") : val }));
    },
    [],
  );

  // Active modifier style
  const modStyle = (active: boolean) => ({
    backgroundColor: active ? "var(--color-accent)" : "var(--color-bg-tertiary)",
    color: active ? "white" : "var(--color-text)",
    border: `1px solid ${active ? "var(--color-accent)" : "var(--color-border)"}`,
  });

  const noteStyle = {
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-text)",
    border: "1px solid var(--color-border)",
  };

  // Beat indicator dots
  const beatDots = [];
  const wholeBeatsFilled = Math.floor(currentBeats);
  const fractional = currentBeats - wholeBeatsFilled;
  for (let i = 0; i < expected; i++) {
    if (i < wholeBeatsFilled) {
      beatDots.push("full");
    } else if (i === wholeBeatsFilled && fractional > 0) {
      beatDots.push("partial");
    } else {
      beatDots.push("empty");
    }
  }

  return (
    <div>
      {/* Beat indicator */}
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2 mb-2 text-sm"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      >
        <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Beats:
        </span>
        <div className="flex gap-1">
          {beatDots.map((dot, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor:
                  dot === "full"
                    ? "var(--color-accent)"
                    : dot === "partial"
                      ? "var(--color-accent)"
                      : "var(--color-bg-tertiary)",
                opacity: dot === "partial" ? 0.5 : 1,
                border: "1px solid var(--color-border)",
              }}
            />
          ))}
        </div>
        <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {currentBeats}/{expected}
        </span>
        {currentBeats > expected && (
          <span className="text-xs font-medium text-amber-500">Over!</span>
        )}
      </div>

      {/* Modifier toggles */}
      <div
        className="flex flex-wrap gap-1.5 rounded-lg px-3 py-2 mb-2"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      >
        <button className={btnMod} style={modStyle(mods.accidental === "#")} onClick={() => toggleMod("accidental", "#")}>
          ♯
        </button>
        <button className={btnMod} style={modStyle(mods.accidental === "b")} onClick={() => toggleMod("accidental", "b")}>
          ♭
        </button>
        <div className="w-px mx-0.5" style={{ backgroundColor: "var(--color-border)" }} />
        <button className={btnMod} style={modStyle(mods.duration === "_")} onClick={() => toggleMod("duration", "_")}>
          8th
        </button>
        <button className={btnMod} style={modStyle(mods.duration === "__")} onClick={() => toggleMod("duration", "__")}>
          16th
        </button>
        <div className="w-px mx-0.5" style={{ backgroundColor: "var(--color-border)" }} />
        <button className={btnMod} style={modStyle(mods.tonguing)} onClick={() => toggleMod("tonguing", true)}>
          T
        </button>
        <div className="w-px mx-0.5" style={{ backgroundColor: "var(--color-border)" }} />
        <button
          className={btnMod}
          style={modStyle(false)}
          onClick={() => setMods((m) => ({ ...m, octave: Math.min(2, m.octave + 1) }))}
        >
          Oct▲
        </button>
        <span className="flex items-center text-xs min-w-[2rem] justify-center" style={{ color: "var(--color-text-secondary)" }}>
          {mods.octave > 0 ? `+${mods.octave}` : mods.octave < 0 ? mods.octave : "0"}
        </span>
        <button
          className={btnMod}
          style={modStyle(false)}
          onClick={() => setMods((m) => ({ ...m, octave: Math.max(-2, m.octave - 1) }))}
        >
          Oct▼
        </button>
        <div className="w-px mx-0.5" style={{ backgroundColor: "var(--color-border)" }} />
        <button className={btnMod} style={modStyle(mods.beam)} onClick={toggleBeam}>
          {mods.beam ? "beam ]" : "beam ["}
        </button>
        <button className={btnMod} style={modStyle(mods.slur)} onClick={toggleSlur}>
          {mods.slur ? "slur )" : "slur ("}
        </button>
      </div>

      {/* Note buttons */}
      <div
        className="rounded-lg px-3 py-2 mb-2"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      >
        <div className="flex gap-1.5 mb-1.5">
          {["1", "2", "3", "4", "5", "6", "7"].map((d) => (
            <button key={d} className={btnNote} style={noteStyle} onClick={() => addNote(d)}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button className={btnAction} style={noteStyle} onClick={addRest}>
            0 rest
          </button>
          <button className={btnAction} style={noteStyle} onClick={addHold}>
            − hold
          </button>
          <button className={btnAction} style={noteStyle} onClick={addBarLine}>
            | bar
          </button>
          <button className={btnAction} style={noteStyle} onClick={addEndBar}>
            || end
          </button>
          <button className={btnAction} style={noteStyle} onClick={addBreath}>
            V breath
          </button>
          <button className={btnAction} style={noteStyle} onClick={addNewLine}>
            ↵ line
          </button>
        </div>
      </div>

      {/* Built notation + actions */}
      <div
        className="rounded-lg px-3 py-2 mb-2"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      >
        <div className="flex items-start gap-2 mb-2">
          <div
            className="flex-1 font-mono text-sm min-h-[2rem] p-1.5 rounded whitespace-pre-wrap break-all"
            style={{ color: "var(--color-text)", backgroundColor: "var(--color-bg)" }}
          >
            {jianpuText || <span style={{ color: "var(--color-text-secondary)" }}>Click notes to build notation...</span>}
          </div>
        </div>
        <div className="flex gap-2">
          <button className={btnAction} style={noteStyle} onClick={undo} disabled={tokens.length === 0}>
            ↩ Undo
          </button>
          <button className={btnAction} style={noteStyle} onClick={clear} disabled={tokens.length === 0}>
            ✕ Clear
          </button>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="rounded-lg px-3 py-2 mb-2 text-xs space-y-1" style={{ backgroundColor: "var(--color-accent-light)" }}>
          {warnings.map((w, i) => (
            <div key={i} style={{ color: "var(--color-accent)" }}>
              ⚠ {w}
            </div>
          ))}
        </div>
      )}

      {/* Live preview */}
      {tokens.length > 0 && (
        <div
          className="rounded-lg p-4 overflow-x-auto"
          style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
        >
          <JianpuRenderer
            content={jianpuText}
            title={title}
            keySignature={keySignature}
            timeSignature={timeSignature}
            tempo={tempo}
          />
        </div>
      )}
    </div>
  );
}
