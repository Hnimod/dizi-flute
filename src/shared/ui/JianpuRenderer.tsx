interface JianpuRendererProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
  activeBeatIndex?: number;
}

export type Token =
  | { type: "note"; value: string; octave: number; dotted: boolean }
  | { type: "rest" }
  | { type: "hold" }
  | { type: "bar"; value: string }
  | { type: "text"; value: string };

const NOTE_RE = /^([1-7])([',]*)(\.*)?$/;
const GRACE_RE = /^\(([1-7])\)([1-7])([',]*)(\.*)?$/;

export function isNotationLine(line: string): boolean {
  // A notation line contains digits 1-7 and at least one bar line or dash
  return /[1-7]/.test(line) && /[|\-]/.test(line);
}

function isBeat(token: Token): boolean {
  return token.type === "note" || token.type === "rest" || token.type === "hold";
}

export function parseToken(raw: string): Token {
  // Bar lines
  if (/^\|{1,2}:?$/.test(raw) || /^:\|{1,2}:?$/.test(raw)) {
    return { type: "bar", value: raw };
  }

  // Rest
  if (raw === "0") {
    return { type: "rest" };
  }

  // Hold
  if (raw === "-") {
    return { type: "hold" };
  }

  // Note with optional octave and dot
  const m = raw.match(NOTE_RE);
  if (m) {
    const value = m[1]!;
    const octaveChars = m[2] || "";
    const dots = m[3] || "";
    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }
    return { type: "note", value: value + dots, octave, dotted: dots.length > 0 };
  }

  // Grace note: (2)3 or (2)3'
  const g = raw.match(GRACE_RE);
  if (g) {
    const graceNote = g[1]!;
    const mainNote = g[2]!;
    const octaveChars = g[3] || "";
    const dots = g[4] || "";
    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }
    return {
      type: "note",
      value: `(${graceNote})${mainNote}${dots}`,
      octave,
      dotted: dots.length > 0,
    };
  }

  // Fallback: text token (ornaments like "tr", dynamics like "pp", etc.)
  return { type: "text", value: raw };
}

function renderToken(token: Token, key: number, beatIndex: number | null, activeBeatIndex?: number) {
  const isActive = beatIndex !== null && beatIndex === activeBeatIndex;
  const beatAttr = beatIndex !== null ? { "data-beat": beatIndex } : undefined;

  switch (token.type) {
    case "note": {
      let cls = "jianpu-note";
      if (token.octave > 0) cls += " jianpu-note-up";
      if (token.octave < 0) cls += " jianpu-note-down";
      if (isActive) cls += " jianpu-active";
      return (
        <span key={key} className={cls} {...beatAttr}>
          {token.value}
        </span>
      );
    }
    case "rest":
      return (
        <span key={key} className={`jianpu-rest${isActive ? " jianpu-active" : ""}`} {...beatAttr}>
          0
        </span>
      );
    case "hold":
      return (
        <span key={key} className={`jianpu-hold${isActive ? " jianpu-active" : ""}`} {...beatAttr}>
          –
        </span>
      );
    case "bar":
      return (
        <span key={key} className="jianpu-bar">
          {token.value}
        </span>
      );
    case "text":
      return (
        <span key={key} className="jianpu-text">
          {token.value}
        </span>
      );
  }
}

export function JianpuRenderer({ content, className = "", style, activeBeatIndex }: JianpuRendererProps) {
  const lines = content.split("\n");
  const headerLines: string[] = [];
  const notationLines: string[] = [];
  let inNotation = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!inNotation) {
      if (trimmed === "") {
        // Empty line before notation starts — skip or keep in header
        if (headerLines.length > 0) {
          inNotation = true; // blank line after header = notation starts next
        }
        continue;
      }
      if (isNotationLine(trimmed)) {
        inNotation = true;
        notationLines.push(line);
      } else {
        headerLines.push(trimmed);
      }
    } else {
      notationLines.push(line);
    }
  }

  let beatCounter = 0;

  return (
    <div className={className} style={style}>
      {/* Header: title, key, tempo */}
      {headerLines.length > 0 && (
        <div className="jianpu-header">
          {headerLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}

      {/* Notation lines */}
      {notationLines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (trimmed === "") {
          return <div key={lineIdx} className="h-2" />;
        }

        const tokens = trimmed.split(/\s+/).map(parseToken);
        return (
          <div key={lineIdx} className="jianpu-line">
            {tokens.map((token, tokenIdx) => {
              const bi = isBeat(token) ? beatCounter++ : null;
              return renderToken(token, tokenIdx, bi, activeBeatIndex);
            })}
          </div>
        );
      })}
    </div>
  );
}
