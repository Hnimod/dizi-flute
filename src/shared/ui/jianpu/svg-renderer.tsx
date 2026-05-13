import type { LayoutItem, InteractiveOpts } from "./types";
import {
  Y_VOLTA, Y_MARK, Y_OCTAVE_UP, Y_NOTE, Y_BEAM, Y_BEAM2, Y_OCTAVE_DOWN,
} from "./constants";
import { isBeat } from "./parser";
import { flatFirst, flatLast } from "./layout";

// Ornament names that render as Chinese characters (non-italic, bold)
const ORNAMENT_CHARS: Record<string, string> = {
  die: "又",
  da: "⺘",
  zeng: "赠",
  bo: "∽",
  "lower-bo": "≁",
  flutter: "*",
  "slide-up": "↗",
  "slide-down": "↘",
  fly: "飞",
  "return-slide": "回",
  "glide-up": "⇗",
  "glide-down": "⇘",
};

// Map symbol names to technique page info. `href` overrides the default
// `/techniques/${id}` link target (used for marks that live in knowledge docs).
const SYMBOL_TECHNIQUE: Record<string, { id: string; name: string; description: string; href?: string }> = {
  die: { id: "die-yin", name: "叠音 Stacked Grace", description: "Quick grace from one hole above, finger only" },
  da: { id: "da-yin", name: "打音 Struck Grace", description: "Quick strike from one hole below, finger only" },
  zeng: { id: "zeng-yin", name: "赠音 Trailing Note", description: "Trailing gift note at end of held note" },
  bo: { id: "bo-yin", name: "上波音 Upper Mordent", description: "Single rapid upper-neighbor flick" },
  "lower-bo": { id: "lower-bo-yin", name: "下波音 Lower Mordent", description: "Single rapid lower-neighbor flick" },
  vibrato: { id: "vibrato", name: "气震音 Breath Vibrato", description: "Pulse diaphragm to make notes shimmer" },
  flutter: { id: "flutter-tongue", name: "花舌 Flutter Tongue", description: "Roll tongue while playing" },
  "slide-up": { id: "slides", name: "上滑音 Slide Up", description: "Glide pitch upward into note" },
  "slide-down": { id: "slides", name: "下滑音 Slide Down", description: "Glide pitch downward" },
  fly: { id: "flying-fingers", name: "飞指 Flying Fingers", description: "Rapid finger flutter across tone holes for shimmering effect" },
  "return-slide": { id: "hui-hua-yin", name: "回滑音 Return Slide", description: "Slide up then immediately back down — rounded arch gesture" },
  "glide-up": { id: "li-yin", name: "上历音 Upper Glissando", description: "Rapid ascending scalar run blurring into one sweep" },
  "glide-down": { id: "li-yin", name: "下历音 Lower Glissando", description: "Rapid descending scalar run blurring into one sweep" },
  single: { id: "tonguing", name: "吐音 Single Tonguing", description: "Crisp tongue attack — say 'tu'" },
  double: { id: "double-tonguing", name: "双吐 Double Tonguing", description: "Alternating tu-ku for fast passages" },
  triple: { id: "triple-tonguing", name: "三吐 Triple Tonguing", description: "Tu-tu-ku pattern for triplets" },
  "rit.": { id: "rhythm-reading", name: "渐慢 Ritardando", description: "Gradually slow down from this point" },
  "accel.": { id: "rhythm-reading", name: "渐快 Accelerando", description: "Gradually speed up from this point" },
  "a tempo": { id: "rhythm-reading", name: "回原速 A Tempo", description: "Return to the original tempo" },
  tie: { id: "long-tones", name: "连音线 Tie", description: "Hold the note continuously — don't re-tongue the second note" },
  slur: { id: "long-tones", name: "圆滑线 Slur", description: "Play all notes smoothly in one breath without re-tonguing" },
  repeatStart: { id: "rhythm-reading", name: "反复记号 Repeat Start", description: "Play from here, then go back and repeat when you reach the repeat end" },
  repeatEnd: { id: "rhythm-reading", name: "反复记号 Repeat End", description: "Go back to the repeat start and play the section again" },
  volta1: { id: "rhythm-reading", name: "第一房子 1st Ending", description: "Play this ending the first time through the repeat" },
  volta2: { id: "rhythm-reading", name: "第二房子 2nd Ending", description: "Play this ending the second time — skip the 1st ending" },
  volta3: { id: "rhythm-reading", name: "第三房子 3rd Ending", description: "Play this ending the third time through" },
  trill: { id: "trill", name: "颤音 Trill", description: "Rapid alternation with upper neighbor note" },
  staccato: { id: "tonguing", name: "顿音 Staccato", description: "Play short and detached" },
  fermata: { id: "rhythm-reading", name: "延长记号 Fermata", description: "Hold the note longer than written" },
  accent: { id: "dynamics", name: "重音 Accent", description: "Emphasize this note" },
  graceNote: { id: "grace-note", name: "倚音 Grace Note", description: "Quick ornamental note before the main note" },
  breath: { id: "dynamics", name: "换气 Breath Mark", description: "Take a breath here" },
  dot: { id: "dotted-rhythm", name: "附点 Dotted Note", description: "Extends duration by half" },
  octaveUp: { id: "two-octave-range", name: "高音 High Octave", description: "Play one octave higher" },
  octaveDown: { id: "two-octave-range", name: "低音 Low Octave", description: "Play one octave lower" },
  rest: { id: "rhythm-reading", name: "休止符 Rest", description: "Silence for the marked duration" },
  hold: { id: "rhythm-reading", name: "延音线 Hold", description: "Continue holding the previous note" },
  "nav:segno": { id: "jianpu-format-spec", name: "Segno", description: "The sign — D.S. instructions send you back to this point", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:coda": { id: "jianpu-format-spec", name: "Coda", description: "Start of the coda section. 'To Coda' / 'al Coda' jumps you here", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:ds": { id: "jianpu-format-spec", name: "D.S. (Dal Segno)", description: "Italian for 'from the sign' — jump back to the segno", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:dc": { id: "jianpu-format-spec", name: "D.C. (Da Capo)", description: "Italian for 'from the head' — jump back to the very beginning", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:fine": { id: "jianpu-format-spec", name: "Fine", description: "End of the piece, used with D.C. or D.S. to mark where to stop", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:to-coda": { id: "jianpu-format-spec", name: "To Coda", description: "On a repeat triggered by D.S./D.C. al Coda, jump from here to the coda", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:ds-al-fine": { id: "jianpu-format-spec", name: "D.S. al Fine", description: "Jump back to the segno, play through to the 'Fine' mark", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:ds-al-coda": { id: "jianpu-format-spec", name: "D.S. al Coda", description: "Jump to segno, play until 'To Coda', then jump to the coda", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:dc-al-fine": { id: "jianpu-format-spec", name: "D.C. al Fine", description: "Jump to the beginning, play through to the 'Fine' mark", href: "/knowledge/jianpu-format-spec#navigation-marks" },
  "nav:dc-al-coda": { id: "jianpu-format-spec", name: "D.C. al Coda", description: "Jump to the beginning, play until 'To Coda', then jump to the coda", href: "/knowledge/jianpu-format-spec#navigation-marks" },
};

function ornamentDisplay(name: string): { text: string; isChar: boolean } {
  const char = ORNAMENT_CHARS[name];
  if (!char) return { text: name, isChar: false };
  return { text: char, isChar: true };
}

// Authentic glyph path data adapted from Wikimedia Commons SVGs (public domain).
// Each entry: source bbox (sx0, sy0, sw, sh) for centering math, and the path `d`.
//
// SegnoTeken.svg  — https://commons.wikimedia.org/wiki/File:SegnoTeken.svg
// Coda_sign.svg   — https://commons.wikimedia.org/wiki/File:Coda_sign.svg
// Music-mordent.svg / Music-inverted-mordent.svg — same Wikimedia Commons category.

const GLYPH_SEGNO_PATH = "m 0.9,8.8 c -0.1,1.1 -0.1,2.2 0.2,3.4 0.4,1.6 1.2,3.1 2,4.3 1.3,1.7 2.9,3.2 4.5,4.3 1.4,1.1 2.8,1.8 4.1,2.7 -3.5,6 -7.6,13.3 -10.9,19.1 l 3.9,0 c 3.3,-5.7 6.9,-12.3 9.9,-17.3 1.2,0.6 2.3,1.5 3.3,2.3 1.1,0.9 1.9,1.8 2.8,2.8 0.9,1.1 1.5,2.3 2.1,3.5 0.7,1.9 1.1,4.2 -0.5,6 -1,0.9 -2,1 -3,0.7 -1.1,-0.3 -1.8,-1.1 -2.1,-1.9 0.1,-0.4 0.8,-0.4 1.3,-1.2 0.7,-1.1 1,-2.2 0.8,-3.5 -0.2,-1.2 -0.8,-2.1 -1.7,-2.8 -0.6,-0.4 -1.3,-0.4 -1.9,-0.4 -0.6,-0.1 -1.4,0.1 -1.8,0.3 -0.5,0.3 -0.9,0.8 -1.2,1.4 -0.3,0.6 -0.4,1.4 -0.4,2.2 0.1,1.3 0.4,2.5 1,3.7 0.6,1.1 1.4,2 2.5,2.8 1.6,1.1 3.3,1.5 5.1,1.4 1.8,-0.2 3.4,-0.9 4.8,-2.3 C 27.1,38.8 28,37 28.2,34.9 28.3,33.8 28.3,32.7 28,31.5 27.8,30.6 27.5,29.8 27.2,29.1 26.7,27.6 25.3,26.2 24.3,25.2 23.5,24.4 22.6,23.6 21.5,22.8 20.1,21.7 18.7,21 17.4,20.1 20.9,14.1 25,6.8 28.3,1 L 24.4,1 C 21.2,6.6 17.4,13.2 14.5,18.3 13.4,17.9 12.1,16.8 11.1,16 10,15.1 9.1,14.3 8.3,13.2 7.4,12.1 6.8,11.1 6.2,9.7 5.9,8.9 5.7,8.1 5.6,7.2 5.4,5.7 5.7,4.7 6.7,3.6 c 1,-0.9 1.8,-1 3,-0.7 1.1,0.3 1.8,1 2.1,1.9 -0.4,0.5 -1,0.6 -1.3,1.2 -0.7,1.1 -1,2.2 -0.8,3.5 0.2,1.2 0.8,2.1 1.7,2.8 0.6,0.4 1.3,0.4 1.9,0.4 0.8,0 1.2,-0.1 1.8,-0.3 C 15.6,12.1 16,11.6 16.3,11 16.6,10.4 16.7,9.6 16.7,8.7 16.6,7.4 16.3,6.2 15.7,5.1 15.1,4 14.3,3.1 13.2,2.3 12.5,1.8 11.7,1.5 11,1.3 9.9,1 8.7,1 7.6,1.1 6.9,1.2 6.1,1.4 5.3,1.8 4.5,2.2 4,2.7 3.3,3.4 1.9,4.9 1.1,6.9 0.9,8.8 Z m 20.7,8.9 c 0,0.7 0.4,1.5 1.1,1.8 0.6,0.3 1.4,0.1 2,-0.2 0.5,-0.4 0.7,-1 0.7,-1.5 0,-1 -0.6,-1.7 -1.4,-1.9 -0.5,-0.1 -1.2,0 -1.75,0.4 -0.55,0.4 -0.55,0.9 -0.65,1.4 z M 4.2,27 c 0.3,0.5 0.9,0.9 1.7,1 0.8,0.1 1.4,-0.4 1.7,-1.1 C 8,26.2 7.8,25.3 7.3,24.7 6.8,24 6,24 5.2,24.2 4.6,24.3 4.3,24.8 4.05,25.35 3.8,25.9 3.9,26.5 4.2,27 Z";
const GLYPH_SEGNO_BBOX = { x: 0, y: 1, w: 28.3, h: 43 };

const GLYPH_CODA_PATHS = [
  "M0.513184,13.2156L0.54834,12.5166L4.55835,12.4785C4.84717,8.28442,7.67236,5.20239,11.5413,4.47046L11.5493,0.508545C11.8704,0.508545,11.7593,0.514404,12.1033,0.514404L12.0862,13.0854Z M11.5364,5.32544C8.82837,6.17944,8.44434,10.7385,8.39526,12.3965L11.4343,12.4146Z",
  "M23.4873,13.2156C23.4722,11.6836,23.4521,13.9236,23.4521,12.5166L19.4412,12.4785C19.1523,8.28442,16.3284,5.20239,12.4592,4.47046L12.4502,0.508545L11.8972,0.514404L11.9143,13.0854C15.8943,13.0854,19.4082,13.2156,23.4873,13.2156Z M12.4644,5.32544C15.1724,6.17944,15.5552,10.7385,15.6052,12.3965L12.5662,12.4146Z",
  "M0.512939,12.7876C0.528076,14.3196,0.548096,12.0796,0.548096,13.4866L4.55811,13.5247C4.84692,17.7188,7.67212,20.8008,11.541,21.5327L11.5491,25.4946L12.103,25.4888L12.0859,12.9177Z M11.5361,20.6777C8.82813,19.8237,8.44409,15.2646,8.39502,13.6067L11.4341,13.5886Z",
  "M23.4871,12.7876L23.4519,13.4866L19.4409,13.5247C19.1521,17.7188,16.3281,20.8008,12.459,21.5327L12.45,25.4946L11.897,25.4888L11.9141,12.9177C15.894,12.9177,19.408,12.7876,23.4871,12.7876Z M12.4641,20.6777C15.1721,19.8237,15.5549,15.2646,15.605,13.6067L12.5659,13.5886Z",
];
const GLYPH_CODA_BBOX = { x: 0, y: 0, w: 24, h: 26 };

const GLYPH_MORDENT_PATH = "m 71,27.9 14,-14.7 12.6,10.7 10.4,-10.8 13.5,11 5.7,-6.3 0,4.7 L 114.9,36 101.8,25.2 92.1,36.3 78.7,25.2 71,33.7 z";
const GLYPH_MORDENT_BBOX = { x: 71, y: 13.2, w: 49.6, h: 23.1 };

// Music-fermata.svg — https://commons.wikimedia.org/wiki/File:Music-fermata.svg
// Arc + center dot. Drops the original SVG's note glyph; bbox covers arc + dot.
const GLYPH_FERMATA_PATHS = [
  "M 68,36 C 68,25.5 76.6,3 99.4,3 120.1,3 130.9,23.2 131,36 l -3.6,0 C 127.7,30.9 121,11.8 99.5,12 83.5,12.1 71.2,24.4 71.4,36 z",
  "m 104,31 a 3.5,3.5 0 1 1 -9.5,0 3.5,3.5 0 1 1 9.5,0 z",
];
const GLYPH_FERMATA_BBOX = { x: 68, y: 3, w: 63, h: 33 };

// Accent.svg — https://commons.wikimedia.org/wiki/File:Accent.svg
// A right-pointing wedge (>) traced as a single filled outline.
const GLYPH_ACCENT_PATH = "M 0.056,0.148 C 0.024,0.14 0,0.112 0,0.076 0,0.036 0.036,0 0.076,0 0.084,0 0.088,0.004 0.092,0.004 l 1.632,0.42 C 1.776,0.424 1.8,0.448 1.8,0.5 1.8,0.552 1.776,0.576 1.724,0.576 L 0.092,0.996 C 0.088,0.996 0.084,1 0.076,1 0.036,1 0,0.964 0,0.924 0,0.888 0.024,0.86 0.056,0.852 L 1.06,0.592 1.62,0.5 1.06,0.408 Z";
const GLYPH_ACCENT_BBOX = { x: 0, y: 0, w: 1.8, h: 1 };

function renderScaledGlyph(
  d: string | string[],
  bbox: { x: number; y: number; w: number; h: number },
  targetW: number,
  cx: number,
  cy: number,
  key: string,
  info: { name: string; id: string; description: string; href?: string } | undefined,
  opts: InteractiveOpts | undefined,
  extra?: React.ReactNode,
): React.ReactNode {
  const scale = targetW / bbox.w;
  const tx = cx - (bbox.x + bbox.w / 2) * scale;
  const ty = cy - (bbox.y + bbox.h / 2) * scale;
  const hoverEnter = opts?.onSymbolHover && info ? (e: React.MouseEvent) => opts.onSymbolHover!(e, info) : undefined;
  const paths = Array.isArray(d) ? d : [d];
  return (
    <g
      key={key}
      transform={`translate(${tx} ${ty}) scale(${scale})`}
      style={hoverEnter ? { cursor: "help" } : undefined}
      onMouseEnter={hoverEnter}
      onMouseLeave={opts?.onSymbolLeave}
    >
      <rect x={bbox.x} y={bbox.y} width={bbox.w} height={bbox.h} fill="transparent" />
      {paths.map((p, i) => <path key={i} d={p} fill="var(--color-text)" fillRule="evenodd" />)}
      {extra}
    </g>
  );
}

function renderSegnoGlyph(x: number, y: number, key: string, opts?: InteractiveOpts): React.ReactNode {
  return renderScaledGlyph(GLYPH_SEGNO_PATH, GLYPH_SEGNO_BBOX, 7, x, y, key, SYMBOL_TECHNIQUE["nav:segno"], opts);
}

function renderCodaGlyph(x: number, y: number, key: string, opts?: InteractiveOpts): React.ReactNode {
  return renderScaledGlyph(GLYPH_CODA_PATHS, GLYPH_CODA_BBOX, 9, x, y, key, SYMBOL_TECHNIQUE["nav:coda"], opts);
}

function renderMordentGlyph(x: number, y: number, key: string, opts?: InteractiveOpts): React.ReactNode {
  return renderScaledGlyph(GLYPH_MORDENT_PATH, GLYPH_MORDENT_BBOX, 10, x, y, key, SYMBOL_TECHNIQUE["bo"], opts);
}

function renderFermataGlyph(x: number, y: number, key: string, opts?: InteractiveOpts): React.ReactNode {
  return renderScaledGlyph(GLYPH_FERMATA_PATHS, GLYPH_FERMATA_BBOX, 10, x, y, key, SYMBOL_TECHNIQUE["fermata"], opts);
}

function renderAccentGlyph(x: number, y: number, key: string, opts?: InteractiveOpts): React.ReactNode {
  return renderScaledGlyph(GLYPH_ACCENT_PATH, GLYPH_ACCENT_BBOX, 7, x, y, key, SYMBOL_TECHNIQUE["accent"], opts);
}

function renderLowerMordentGlyph(x: number, y: number, key: string, opts?: InteractiveOpts): React.ReactNode {
  // Same zigzag plus a vertical line through the center (the "lower" variant).
  const cx = GLYPH_MORDENT_BBOX.x + GLYPH_MORDENT_BBOX.w / 2;
  const extra = (
    <line
      x1={cx}
      y1={GLYPH_MORDENT_BBOX.y - 8}
      x2={cx}
      y2={GLYPH_MORDENT_BBOX.y + GLYPH_MORDENT_BBOX.h + 8}
      stroke="var(--color-text)"
      strokeWidth={7}
      strokeLinecap="square"
    />
  );
  return renderScaledGlyph(GLYPH_MORDENT_PATH, GLYPH_MORDENT_BBOX, 10, x, y, key, SYMBOL_TECHNIQUE["lower-bo"], opts, extra);
}

function renderVibratoWave(x: number, y: number, key: string, opts?: InteractiveOpts): React.ReactNode {
  const w = 5;
  const info = SYMBOL_TECHNIQUE["vibrato"];
  const hoverEnter = opts?.onSymbolHover && info
    ? (e: React.MouseEvent) => opts.onSymbolHover!(e, info)
    : undefined;
  const hoverLeave = opts?.onSymbolLeave;
  return (
    <g key={key} style={hoverEnter ? { cursor: "help" } : undefined} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
      <rect x={x - w} y={y - 4} width={w * 2} height={8} fill="transparent" />
      <path
        d={`M ${x - w} ${y} q ${w * 0.33} -3 ${w * 0.66} 0 q ${w * 0.33} 3 ${w * 0.66} 0 q ${w * 0.33} -3 ${w * 0.66} 0`}
        fill="none"
        stroke="var(--color-text)"
        strokeWidth="1.2"
      />
    </g>
  );
}

export function renderSvgItems(
  items: LayoutItem[],
  activeBeatIndex: number | undefined,
  elements: React.ReactNode[],
  keyPrefix: string,
  opts?: InteractiveOpts,
  incomingVolta?: { ending: number } | null,
  incomingTie?: boolean,
  lineEndX?: number,
): { openVolta: { ending: number } | null; openTie: boolean } {
  const pendingAnnotations: string[] = [];

  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx]!;
    const key = `${keyPrefix}-${idx}`;

    // Annotations: render above the next item's center x
    if (item.token.type === "tempo") {
      const next = items[idx + 1];
      const targetX = next ? (next.children ? flatFirst(next.children)?.x ?? next.x : next.x) : item.x;
      const tpInfo = SYMBOL_TECHNIQUE[item.token.text];
      const tpHover = opts?.onSymbolHover && tpInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, tpInfo) : undefined;
      elements.push(
        <text
          key={key}
          x={targetX}
          y={Y_MARK}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={7}
          fontWeight="600"
          fontStyle="italic"
          fontFamily="sans-serif"
          fill="var(--color-text-secondary)"
          style={tpHover ? { cursor: "help" } : undefined}
          onMouseEnter={tpHover}
          onMouseLeave={opts?.onSymbolLeave}
        >
          {item.token.text}
        </text>,
      );
      continue;
    }

    if (item.token.type === "nav") {
      const next = items[idx + 1];
      const targetX = next ? (next.children ? flatFirst(next.children)?.x ?? next.x : next.x) : item.x;
      if (item.token.kind === "segno") {
        elements.push(renderSegnoGlyph(targetX, Y_MARK, key, opts));
      } else if (item.token.kind === "coda") {
        elements.push(renderCodaGlyph(targetX, Y_MARK, key, opts));
      } else {
        // Text labels (D.S./D.C./Fine/To Coda/...) — right-align so the label sits
        // BEFORE the next item rather than extending past it (which would clip at the
        // SVG viewBox edge when placed near the line end).
        const labelEndX = next ? targetX - (next.width / 2) - 2 : item.x;
        const navInfo = SYMBOL_TECHNIQUE[`nav:${item.token.kind}`];
        const navHover = opts?.onSymbolHover && navInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, navInfo) : undefined;
        elements.push(
          <text
            key={key}
            x={labelEndX}
            y={Y_MARK}
            textAnchor="end"
            dominantBaseline="central"
            fontSize={7}
            fontWeight={600}
            fontStyle="italic"
            fontFamily="sans-serif"
            fill="var(--color-text)"
            style={navHover ? { cursor: "help" } : undefined}
            onMouseEnter={navHover}
            onMouseLeave={opts?.onSymbolLeave}
          >
            {item.token.text}
          </text>,
        );
      }
      continue;
    }

    if (item.token.type === "tonguing" || item.token.type === "ornament") {
      pendingAnnotations.push(
        item.token.type === "tonguing" ? `T:${item.token.technique}` : item.token.name,
      );
      const next = items[idx + 1];
      const targetX = next ? (next.children ? flatFirst(next.children)?.x ?? next.x : next.x) : item.x;
      if (item.token.type === "tonguing") {
        const tInfo = SYMBOL_TECHNIQUE[item.token.technique];
        const tHover = opts?.onSymbolHover && tInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, tInfo) : undefined;
        elements.push(
          <text
            key={key}
            x={targetX}
            y={Y_MARK}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fontFamily="sans-serif"
            fill="var(--color-accent)"
            style={tHover ? { cursor: "help" } : undefined}
            onMouseEnter={tHover}
            onMouseLeave={opts?.onSymbolLeave}
          >
            {item.token.technique === "single"
              ? "T"
              : item.token.technique === "double"
                ? "TK"
                : item.token.technique === "triple"
                  ? "TTK"
                  : item.token.technique}
          </text>,
        );
      } else if (item.token.name === "vibrato") {
        elements.push(renderVibratoWave(targetX, Y_MARK, key, opts));
      } else if (item.token.name === "bo") {
        elements.push(renderMordentGlyph(targetX, Y_MARK, key, opts));
      } else if (item.token.name === "lower-bo") {
        elements.push(renderLowerMordentGlyph(targetX, Y_MARK, key, opts));
      } else {
        const { text: ornText, isChar } = ornamentDisplay(item.token.name);
        const oInfo = SYMBOL_TECHNIQUE[item.token.name];
        const oHover = opts?.onSymbolHover && oInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, oInfo) : undefined;
        elements.push(
          <text
            key={key}
            x={targetX}
            y={Y_MARK}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={8}
            fontStyle={isChar ? "normal" : "italic"}
            fontWeight={isChar ? "700" : undefined}
            fontFamily="sans-serif"
            fill="var(--color-text-secondary)"
            style={oHover ? { cursor: "help" } : undefined}
            onMouseEnter={oHover}
            onMouseLeave={opts?.onSymbolLeave}
          >
            {ornText}
          </text>,
        );
      }
      continue;
    }

    if (item.groupType === "cue" && item.children) {
      const cueElements: React.ReactNode[] = [];
      renderSvgItems(item.children, activeBeatIndex, cueElements, `${key}-cue`, opts);
      const first = flatFirst(item.children);
      const last = flatLast(item.children);
      const sx = (first ? first.x : item.x - item.width / 2) - 14;
      const ex = (last ? last.x : item.x + item.width / 2) + 14;
      const midX = (sx + ex) / 2;
      const topY = Y_OCTAVE_UP - 4;
      const botY = Y_OCTAVE_DOWN + 4;
      const stroke = "var(--color-text-secondary)";
      const bowDepth = 4;
      elements.push(
        <g key={key} opacity="0.55" fontStyle="italic">
          {cueElements}
          {/* Round parentheses around the cue group */}
          <path
            d={`M ${sx} ${topY} Q ${sx - bowDepth} ${(topY + botY) / 2} ${sx} ${botY}`}
            fill="none"
            stroke={stroke}
            strokeWidth="0.9"
          />
          <path
            d={`M ${ex} ${topY} Q ${ex + bowDepth} ${(topY + botY) / 2} ${ex} ${botY}`}
            fill="none"
            stroke={stroke}
            strokeWidth="0.9"
          />
          <text
            x={midX}
            y={topY - 3}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={5.5}
            fontFamily="sans-serif"
            fontStyle="normal"
            fill={stroke}
          >
            cue
          </text>
        </g>,
      );
      continue;
    }

    if (item.groupType === "slur" && item.children) {
      // Render children first
      renderSvgItems(item.children, activeBeatIndex, elements, `${key}-s`, opts);
      // Draw slur arc above
      const first = flatFirst(item.children);
      const last = flatLast(item.children);
      if (first && last) {
        const sx = first.x;
        const ex = last.x;
        const midX = (sx + ex) / 2;
        const arcHeight = Math.min(10, (ex - sx) * 0.15 + 4);
        const slurInfo = SYMBOL_TECHNIQUE["slur"];
        const slurHover = opts?.onSymbolHover && slurInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, slurInfo) : undefined;
        const slurD = `M ${sx} ${Y_OCTAVE_UP - 4} Q ${midX} ${Y_OCTAVE_UP - 4 - arcHeight} ${ex} ${Y_OCTAVE_UP - 4}`;
        elements.push(
          <g key={`${key}-arc`} style={slurHover ? { cursor: "help" } : undefined} onMouseEnter={slurHover} onMouseLeave={opts?.onSymbolLeave}>
            <path d={slurD} fill="none" stroke="transparent" strokeWidth="6" />
            <path d={slurD} fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.2" />
          </g>,
        );
      }
    } else if (item.groupType === "beam" && item.children) {
      // Render children
      renderSvgItems(item.children, activeBeatIndex, elements, `${key}-b`, opts);
      // Draw beam line
      const first = item.children.find(c => isBeat(c.token));
      const last = [...item.children].reverse().find(c => isBeat(c.token));
      if (first && last) {
        const x1 = first.x - 5;
        const x2 = last.x + 5;
        elements.push(
          <line
            key={`${key}-beam`}
            x1={x1}
            y1={Y_BEAM}
            x2={x2}
            y2={Y_BEAM}
            stroke="var(--color-text)"
            strokeWidth="1.5"
          />,
        );
        // Draw partial second beam lines for contiguous sixteenth note runs
        let runStart: number | null = null;
        let beam2Idx = 0;
        for (let ci = 0; ci <= item.children.length; ci++) {
          const child = item.children[ci];
          if (child && !isBeat(child.token)) continue; // skip annotations
          const isSixteenth =
            child?.token.type === "note" && child.token.duration === "sixteenth";
          if (isSixteenth && runStart === null) {
            runStart = ci;
          } else if (!isSixteenth && runStart !== null) {
            const rs = item.children[runStart]!;
            const re = item.children[ci - 1]!;
            elements.push(
              <line
                key={`${key}-beam2-${beam2Idx++}`}
                x1={rs.x - 5}
                y1={Y_BEAM2}
                x2={re.x + 5}
                y2={Y_BEAM2}
                stroke="var(--color-text)"
                strokeWidth="1.5"
              />,
            );
            runStart = null;
          }
        }
      }
    } else {
      renderSvgToken(item, activeBeatIndex, elements, key, opts, [...pendingAnnotations]);
      if (isBeat(item.token)) pendingAnnotations.length = 0;
    }
  }

  // Post-pass: render volta brackets
  let currentVolta: { ending: number; startX: number; continuation: boolean } | null =
    incomingVolta ? { ending: incomingVolta.ending, startX: 0, continuation: true } : null;
  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx]!;
    if (item.token.type === "volta") {
      if (currentVolta) {
        renderVoltaBracket(currentVolta, item.x, elements, keyPrefix, true, currentVolta.continuation, opts);
      }
      const nextItem = items[idx + 1];
      const startX = nextItem ? nextItem.x : item.x;
      currentVolta = { ending: item.token.ending, startX, continuation: false };
    } else if (item.token.type === "bar" && (item.token.value === ":|" || item.token.value === "||")) {
      if (currentVolta) {
        renderVoltaBracket(currentVolta, item.x, elements, keyPrefix, true, currentVolta.continuation, opts);
        currentVolta = null;
      }
    }
  }
  // Close volta at end of line if still open (no right edge — continues next line)
  if (currentVolta && items.length > 0) {
    const last = items[items.length - 1]!;
    renderVoltaBracket(currentVolta, last.x + last.width / 2, elements, keyPrefix, false, currentVolta.continuation, opts);
  }
  // Post-pass: render tie arcs (~( ... ~))
  // Flatten all items including beam/slur children for tie lookups
  function flattenItems(list: LayoutItem[]): LayoutItem[] {
    const flat: LayoutItem[] = [];
    for (const it of list) {
      flat.push(it);
      if (it.children) flat.push(...flattenItems(it.children));
    }
    return flat;
  }
  const allFlat = flattenItems(items);
  // Continuation tie from previous line: arc enters from left edge.
  let tieStartX: number | null = incomingTie ? 0 : null;
  const tieInfo = SYMBOL_TECHNIQUE["tie"];
  const drawTieArc = (x1: number, x2: number, idKey: string) => {
    const midX = (x1 + x2) / 2;
    const tieHover = opts?.onSymbolHover && tieInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, tieInfo) : undefined;
    const arcD = `M ${x1} ${Y_NOTE - 12} Q ${midX} ${Y_NOTE - 20} ${x2} ${Y_NOTE - 12}`;
    elements.push(
      <g key={idKey} style={tieHover ? { cursor: "help" } : undefined} onMouseEnter={tieHover} onMouseLeave={opts?.onSymbolLeave}>
        <path d={arcD} fill="none" stroke="transparent" strokeWidth="6" />
        <path d={arcD} fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.2" />
      </g>,
    );
  };
  for (let fi = 0; fi < allFlat.length; fi++) {
    const it = allFlat[fi]!;
    if (it.token.type === "tie-start") {
      // Find next beat after this marker
      for (let j = fi + 1; j < allFlat.length; j++) {
        if (isBeat(allFlat[j]!.token)) { tieStartX = allFlat[j]!.x; break; }
      }
    } else if (it.token.type === "tie-end" && tieStartX !== null) {
      // Find previous beat before this marker
      let tieEndX = tieStartX;
      for (let j = fi - 1; j >= 0; j--) {
        if (isBeat(allFlat[j]!.token)) { tieEndX = allFlat[j]!.x; break; }
      }
      drawTieArc(tieStartX, tieEndX, `${keyPrefix}-tie-${tieStartX}-${tieEndX}`);
      tieStartX = null;
    }
  }
  // Tie still open at end of line: trail arc to right edge and tell next line to continue.
  let openTie = false;
  if (tieStartX !== null && lineEndX !== undefined) {
    drawTieArc(tieStartX, lineEndX, `${keyPrefix}-tie-trail-${tieStartX}`);
    openTie = true;
  }

  return { openVolta: currentVolta ? { ending: currentVolta.ending } : null, openTie };
}

function renderVoltaBracket(
  volta: { ending: number; startX: number },
  endX: number,
  elements: React.ReactNode[],
  keyPrefix: string,
  closedEnd: boolean,
  continuation: boolean = false,
  opts?: InteractiveOpts,
) {
  const y = Y_VOLTA;
  const vKey = `volta${volta.ending}` as keyof typeof SYMBOL_TECHNIQUE;
  const vInfo = SYMBOL_TECHNIQUE[vKey] ?? SYMBOL_TECHNIQUE["volta1"];
  const vHover = opts?.onSymbolHover && vInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, vInfo) : undefined;
  elements.push(
    <g
      key={`${keyPrefix}-volta-${volta.ending}-${volta.startX}-${continuation ? "cont" : "start"}`}
      style={vHover ? { cursor: "help" } : undefined}
      onMouseEnter={vHover}
      onMouseLeave={opts?.onSymbolLeave}
    >
      <rect x={volta.startX} y={y - 2} width={endX - volta.startX} height={10} fill="transparent" />
      {!continuation && (
        <line x1={volta.startX} y1={y + 5} x2={volta.startX} y2={y} stroke="var(--color-text)" strokeWidth="1" />
      )}
      <line x1={volta.startX} y1={y} x2={endX} y2={y} stroke="var(--color-text)" strokeWidth="1" />
      {closedEnd && (
        <line x1={endX} y1={y} x2={endX} y2={y + 5} stroke="var(--color-text)" strokeWidth="1" />
      )}
      {!continuation && (
        <text x={volta.startX - 10} y={y + 5} fontSize="7" fontWeight="600" fill="var(--color-text)">{volta.ending}.</text>
      )}
    </g>,
  );
}

function renderSvgToken(
  item: LayoutItem,
  activeBeatIndex: number | undefined,
  elements: React.ReactNode[],
  key: string,
  opts?: InteractiveOpts,
  annotations: string[] = [],
) {
  const { token, x, width, beatIndex, tokenIdx } = item;
  const isActive = beatIndex !== null && beatIndex === activeBeatIndex;
  const isSelected = opts?.selectedTokenIdx === tokenIdx;
  const textColor = isActive ? "white" : "var(--color-text)";
  const secondaryColor = isActive ? "white" : "var(--color-text-secondary)";
  const clickable = opts?.interactive && isBeat(token);
  const beatClickable = !clickable && opts?.onBeatClick && beatIndex !== null;
  const clickHandler = clickable
    ? () => opts.onTokenClick?.(tokenIdx, x, (opts.lineYOffset ?? 0) + Y_NOTE)
    : beatClickable
      ? () => opts.onBeatClick!(beatIndex!)
      : undefined;
  const noteHoverEnter = opts?.onNoteHover && token.type === "note"
    ? (e: React.MouseEvent) => opts.onNoteHover!(token, e, annotations)
    : undefined;
  const noteHoverLeave = opts?.onNoteLeave;

  switch (token.type) {
    case "note": {
      // data-beat group wrapper for scrollIntoView
      const beatAttr = beatIndex !== null ? { "data-beat": beatIndex } : undefined;

      // Accidental
      if (token.accidental) {
        elements.push(
          <text
            key={`${key}-acc`}
            x={x - 7}
            y={Y_NOTE}
            textAnchor="middle"
            fontSize="9"
            fill={textColor}
          >
            {token.accidental === "#" ? "♯" : "♭"}
          </text>,
        );
      }

      // Selection highlight
      if (isSelected) {
        elements.push(
          <rect
            key={`${key}-sel`}
            x={x - width / 2}
            y={Y_NOTE - 15}
            width={width}
            height={20}
            rx={3}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeDasharray="3 2"
          />,
        );
      }

      // Note number (with grace note handling)
      const noteColor = isSelected ? "var(--color-accent)" : textColor;
      const noteStyle = clickable || beatClickable ? { cursor: "pointer" as const } : undefined;
      const graceMatch = token.value.match(/^\((\d[',]*)\)\((\d[',]*)\)(\d.*)$/)
        || token.value.match(/^\((\d[',]*)\)(\d.*)$/);

      if (graceMatch) {
        const isDouble = graceMatch.length === 4;
        const graceRaws = isDouble ? [graceMatch[1]!, graceMatch[2]!] : [graceMatch[1]!];
        const graceText = graceRaws.map((g) => g.replace(/[',]/g, "")).join("");
        const mainText = isDouble ? graceMatch[3]! : graceMatch[2]!;
        // Grace notes as small superscript
        const graceX = x - 6;
        const graceY = Y_OCTAVE_UP - 2;
        const gnInfo = SYMBOL_TECHNIQUE["graceNote"];
        const gnHover = opts?.onSymbolHover && gnInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, gnInfo) : undefined;
        elements.push(
          <text
            key={`${key}-grace`}
            x={graceX}
            y={graceY}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fill={noteColor}
            style={gnHover ? { cursor: "help" } : undefined}
            onMouseEnter={gnHover}
            onMouseLeave={opts?.onSymbolLeave}
          >
            {graceText}
          </text>,
        );
        // Octave dots for grace notes
        let graceCharIdx = 0;
        for (const raw of graceRaws) {
          let oct = 0;
          for (const c of raw) { if (c === "'") oct++; if (c === ",") oct--; }
          const dotX = graceX - (graceRaws.length > 1 ? (graceText.length / 2 - graceCharIdx - 0.5) * 5 : 0);
          if (oct > 0) {
            for (let d = 0; d < oct; d++) {
              elements.push(<circle key={`${key}-gou${graceCharIdx}-${d}`} cx={dotX} cy={graceY - 6 - d * 3} r={1} fill={noteColor} />);
            }
          }
          if (oct < 0) {
            for (let d = 0; d < -oct; d++) {
              elements.push(<circle key={`${key}-god${graceCharIdx}-${d}`} cx={dotX} cy={graceY + 4 + d * 3} r={1} fill={noteColor} />);
            }
          }
          graceCharIdx++;
        }
        // Main note digit
        elements.push(
          <text
            key={key}
            x={x}
            y={Y_NOTE}
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={noteColor}
            style={noteHoverEnter ? { ...noteStyle, cursor: "help" } : noteStyle}
            onClick={clickHandler}
            onMouseEnter={noteHoverEnter}
            onMouseLeave={noteHoverLeave}
            {...beatAttr}
          >
            {mainText}
          </text>,
        );
      } else {
        elements.push(
          <text
            key={key}
            x={x}
            y={Y_NOTE}
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={noteColor}
            style={noteHoverEnter ? { ...noteStyle, cursor: "help" } : noteStyle}
            onClick={clickHandler}
            onMouseEnter={noteHoverEnter}
            onMouseLeave={noteHoverLeave}
            {...beatAttr}
          >
            {token.value}
          </text>,
        );
      }

      // Augmentation dot (dotted rhythm)
      if (token.dotted) {
        const dotInfo = SYMBOL_TECHNIQUE["dot"];
        const dotHover = opts?.onSymbolHover && dotInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, dotInfo) : undefined;
        elements.push(
          <g key={`${key}-dot`} style={dotHover ? { cursor: "help" } : undefined} onMouseEnter={dotHover} onMouseLeave={opts?.onSymbolLeave}>
            <rect x={x + 3} y={Y_NOTE - 8} width={8} height={8} fill="transparent" />
            <circle cx={x + 7} cy={Y_NOTE - 4} r={1.5} fill={noteColor} />
          </g>,
        );
      }

      // Octave dots
      if (token.octave > 0) {
        const ouInfo = SYMBOL_TECHNIQUE["octaveUp"];
        const ouHover = opts?.onSymbolHover && ouInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, ouInfo) : undefined;
        for (let d = 0; d < token.octave; d++) {
          elements.push(
            <g key={`${key}-ou${d}`} style={ouHover ? { cursor: "help" } : undefined} onMouseEnter={ouHover} onMouseLeave={opts?.onSymbolLeave}>
              <rect x={x - 4} y={Y_OCTAVE_UP - d * 4 - 4} width={8} height={8} fill="transparent" />
              <circle cx={x} cy={Y_OCTAVE_UP - d * 4} r={1.5} fill={textColor} />
            </g>,
          );
        }
      }
      if (token.octave < 0) {
        const odInfo = SYMBOL_TECHNIQUE["octaveDown"];
        const odHover = opts?.onSymbolHover && odInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, odInfo) : undefined;
        for (let d = 0; d < -token.octave; d++) {
          elements.push(
            <g key={`${key}-od${d}`} style={odHover ? { cursor: "help" } : undefined} onMouseEnter={odHover} onMouseLeave={opts?.onSymbolLeave}>
              <rect x={x - 4} y={Y_OCTAVE_DOWN + d * 4 - 4} width={8} height={8} fill="transparent" />
              <circle cx={x} cy={Y_OCTAVE_DOWN + d * 4} r={1.5} fill={textColor} />
            </g>,
          );
        }
      }

      // Duration underlines (for non-beamed notes)
      if (token.duration === "eighth" || token.duration === "sixteenth") {
        elements.push(
          <line
            key={`${key}-dur`}
            x1={x - 5}
            y1={Y_BEAM}
            x2={x + 5}
            y2={Y_BEAM}
            stroke={textColor}
            strokeWidth="1.5"
          />,
        );
        if (token.duration === "sixteenth") {
          elements.push(
            <line
              key={`${key}-dur2`}
              x1={x - 5}
              y1={Y_BEAM2}
              x2={x + 5}
              y2={Y_BEAM2}
              stroke={textColor}
              strokeWidth="1.5"
            />,
          );
        }
      }

      // Above-note marks
      const markY = token.octave > 0 ? Y_MARK - 2 : Y_MARK;
      if (token.tonguing) {
        elements.push(
          <text
            key={`${key}-tng`}
            x={x}
            y={markY}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fontFamily="sans-serif"
            fill="var(--color-accent)"
          >
            T
          </text>,
        );
      }
      if (token.fermata) {
        elements.push(renderFermataGlyph(x, markY, `${key}-fer`, opts));
      }
      if (token.staccato) {
        const stcInfo = SYMBOL_TECHNIQUE["staccato"];
        const stcHover = opts?.onSymbolHover && stcInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, stcInfo) : undefined;
        elements.push(
          <g key={`${key}-stc`} style={stcHover ? { cursor: "help" } : undefined} onMouseEnter={stcHover} onMouseLeave={opts?.onSymbolLeave}>
            <rect x={x - 4} y={markY - 4} width={8} height={8} fill="transparent" />
            <circle cx={x} cy={markY} r={1.3} fill={textColor} />
          </g>,
        );
      }
      if (token.accent) {
        elements.push(renderAccentGlyph(x, markY, `${key}-acn`, opts));
      }
      if (token.trill) {
        const trInfo = SYMBOL_TECHNIQUE["trill"];
        const trHover = opts?.onSymbolHover && trInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, trInfo) : undefined;
        elements.push(
          <text
            key={`${key}-trl`}
            x={x}
            y={markY}
            textAnchor="middle"
            fontSize="8"
            fontStyle="italic"
            fill={textColor}
            style={trHover ? { cursor: "help" } : undefined}
            onMouseEnter={trHover}
            onMouseLeave={opts?.onSymbolLeave}
          >
            tr
          </text>,
        );
      }
      break;
    }
    case "rest": {
      const beatAttr = beatIndex !== null ? { "data-beat": beatIndex } : undefined;
      const restInfo = SYMBOL_TECHNIQUE["rest"];
      const restHover = opts?.onSymbolHover && restInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, restInfo) : undefined;
      elements.push(
        <text
          key={key}
          x={x}
          y={Y_NOTE}
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill={isSelected ? "var(--color-accent)" : secondaryColor}
          style={restHover ? { cursor: "help" } : (clickable || beatClickable ? { cursor: "pointer" } : undefined)}
          onClick={clickHandler}
          onMouseEnter={restHover}
          onMouseLeave={opts?.onSymbolLeave}
          {...beatAttr}
        >
          0
        </text>,
      );
      // Duration underlines for rests
      if (token.duration === "eighth" || token.duration === "sixteenth") {
        elements.push(
          <line
            key={`${key}-dur`}
            x1={x - 5}
            y1={Y_BEAM}
            x2={x + 5}
            y2={Y_BEAM}
            stroke={secondaryColor}
            strokeWidth="1.5"
          />,
        );
        if (token.duration === "sixteenth") {
          elements.push(
            <line
              key={`${key}-dur2`}
              x1={x - 5}
              y1={Y_BEAM2}
              x2={x + 5}
              y2={Y_BEAM2}
              stroke={secondaryColor}
              strokeWidth="1.5"
            />,
          );
        }
      }
      break;
    }
    case "hold": {
      const beatAttr = beatIndex !== null ? { "data-beat": beatIndex } : undefined;
      const holdInfo = SYMBOL_TECHNIQUE["hold"];
      const holdHover = opts?.onSymbolHover && holdInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, holdInfo) : undefined;
      elements.push(
        <text
          key={key}
          x={x}
          y={Y_NOTE}
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill={isSelected ? "var(--color-accent)" : secondaryColor}
          style={holdHover ? { cursor: "help" } : (clickable || beatClickable ? { cursor: "pointer" } : undefined)}
          onClick={clickHandler}
          onMouseEnter={holdHover}
          onMouseLeave={opts?.onSymbolLeave}
          {...beatAttr}
        >
          –
        </text>,
      );
      break;
    }
    case "bar": {
      const isDouble = token.value === "||";
      const isRepeatStart = token.value === "|:";
      const isRepeatEnd = token.value === ":|";
      if (isDouble) {
        // Double bar: thin line + thick line
        elements.push(
          <line
            key={`${key}-a`}
            x1={x - 3}
            y1={Y_NOTE - 12}
            x2={x - 3}
            y2={Y_NOTE + 4}
            stroke="var(--color-text-secondary)"
            strokeWidth="1"
          />,
        );
        elements.push(
          <line
            key={`${key}-b`}
            x1={x + 2}
            y1={Y_NOTE - 12}
            x2={x + 2}
            y2={Y_NOTE + 4}
            stroke="var(--color-text)"
            strokeWidth="2.5"
          />,
        );
      } else if (isRepeatStart) {
        const rsInfo = SYMBOL_TECHNIQUE["repeatStart"];
        const rsHover = opts?.onSymbolHover && rsInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, rsInfo) : undefined;
        elements.push(
          <g key={key} style={rsHover ? { cursor: "help" } : undefined} onMouseEnter={rsHover} onMouseLeave={opts?.onSymbolLeave}>
            <rect x={x - 5} y={Y_NOTE - 12} width={12} height={18} fill="transparent" />
            <line x1={x - 3} y1={Y_NOTE - 12} x2={x - 3} y2={Y_NOTE + 4} stroke="var(--color-text)" strokeWidth="2.5" />
            <line x1={x + 2} y1={Y_NOTE - 12} x2={x + 2} y2={Y_NOTE + 4} stroke="var(--color-text-secondary)" strokeWidth="1" />
            <circle cx={x + 5} cy={Y_NOTE - 5} r={1.3} fill="var(--color-text)" />
            <circle cx={x + 5} cy={Y_NOTE + 1} r={1.3} fill="var(--color-text)" />
          </g>,
        );
      } else if (isRepeatEnd) {
        const reInfo = SYMBOL_TECHNIQUE["repeatEnd"];
        const reHover = opts?.onSymbolHover && reInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, reInfo) : undefined;
        elements.push(
          <g key={key} style={reHover ? { cursor: "help" } : undefined} onMouseEnter={reHover} onMouseLeave={opts?.onSymbolLeave}>
            <rect x={x - 7} y={Y_NOTE - 12} width={12} height={18} fill="transparent" />
            <circle cx={x - 5} cy={Y_NOTE - 5} r={1.3} fill="var(--color-text)" />
            <circle cx={x - 5} cy={Y_NOTE + 1} r={1.3} fill="var(--color-text)" />
            <line x1={x - 2} y1={Y_NOTE - 12} x2={x - 2} y2={Y_NOTE + 4} stroke="var(--color-text-secondary)" strokeWidth="1" />
            <line x1={x + 3} y1={Y_NOTE - 12} x2={x + 3} y2={Y_NOTE + 4} stroke="var(--color-text)" strokeWidth="2.5" />
          </g>,
        );
      } else {
        elements.push(
          <line
            key={key}
            x1={x}
            y1={Y_NOTE - 12}
            x2={x}
            y2={Y_NOTE + 4}
            stroke="var(--color-text-secondary)"
            strokeWidth="1"
          />,
        );
      }
      break;
    }
    case "tie":
      // `~` is a documented spacer — visible tie arcs are drawn from `~(` / `~)`
      // markers in the tie post-pass of renderSvgItems.
      break;
    case "breath": {
      const brInfo = SYMBOL_TECHNIQUE["breath"];
      const brHover = opts?.onSymbolHover && brInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, brInfo) : undefined;
      elements.push(
        <text
          key={key}
          x={x}
          y={Y_NOTE - 14}
          textAnchor="middle"
          fontSize="8"
          fill="var(--color-text-secondary)"
          style={brHover ? { cursor: "help" } : undefined}
          onMouseEnter={brHover}
          onMouseLeave={opts?.onSymbolLeave}
        >
          ∨
        </text>,
      );
      break;
    }
    // `tonguing`, `ornament`, `tempo`, and `nav` tokens are handled directly in
    // renderSvgItems' main loop (which `continue`s past them) and never reach this switch.
    case "text":
      elements.push(
        <text
          key={key}
          x={x}
          y={Y_NOTE}
          textAnchor="middle"
          fontSize="12"
          fill="var(--color-text-secondary)"
        >
          {token.value}
        </text>,
      );
      break;
  }
}
