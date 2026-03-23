interface JianpuRendererProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
  activeBeatIndex?: number;
}

export type Token =
  | {
      type: "note";
      value: string;
      octave: number;
      dotted: boolean;
      accidental?: "#" | "b";
      duration?: "eighth" | "sixteenth";
      fermata?: boolean;
      staccato?: boolean;
      accent?: boolean;
      trill?: boolean;
    }
  | { type: "rest"; duration?: "eighth" | "sixteenth" }
  | { type: "hold" }
  | { type: "bar"; value: string }
  | { type: "text"; value: string }
  | { type: "tie" }
  | { type: "slur-start" }
  | { type: "slur-end" }
  | { type: "beam-start" }
  | { type: "beam-end" }
  | { type: "tonguing"; technique: string }
  | { type: "ornament"; name: string };

// Extended note regex:
// optional tr prefix, optional # or b, digit 1-7, optional octave ',
// optional dot, optional _ or __, optional articulation ^;>
const EXT_NOTE_RE =
  /^(tr)?(#|b)?([1-7])([',]*)(\.*)?(__?)?([;^>])?$/;

// Grace note: (x)... same extensions
const EXT_GRACE_RE =
  /^(tr)?\(([1-7])\)(#|b)?([1-7])([',]*)(\.*)?(__?)?([;^>])?$/;

export function isNotationLine(line: string): boolean {
  return /[1-7]/.test(line) && /[|\-]/.test(line);
}

function isBeat(token: Token): boolean {
  return token.type === "note" || token.type === "rest" || token.type === "hold";
}

export function parseToken(raw: string): Token {
  // Bar lines
  if (/^:?\|{1,2}:?$/.test(raw)) {
    return { type: "bar", value: raw };
  }

  // Tie
  if (raw === "~") {
    return { type: "tie" };
  }

  // Slur markers
  if (raw === "(") return { type: "slur-start" };
  if (raw === ")") return { type: "slur-end" };

  // Beam markers
  if (raw === "[") return { type: "beam-start" };
  if (raw === "]") return { type: "beam-end" };

  // Tonguing annotation: T:single, T:double, T:triple
  if (raw.startsWith("T:")) {
    return { type: "tonguing", technique: raw.slice(2) };
  }

  // Ornament annotation: orn:slide-up, orn:vibrato, etc.
  if (raw.startsWith("orn:")) {
    return { type: "ornament", name: raw.slice(4) };
  }

  // Rest (with optional duration)
  if (raw === "0") return { type: "rest" };
  if (raw === "0_") return { type: "rest", duration: "eighth" };
  if (raw === "0__") return { type: "rest", duration: "sixteenth" };

  // Hold
  if (raw === "-") return { type: "hold" };

  // Extended note
  const m = raw.match(EXT_NOTE_RE);
  if (m) {
    const trill = !!m[1];
    const accidental = m[2] as "#" | "b" | undefined;
    const digit = m[3]!;
    const octaveChars = m[4] || "";
    const dots = m[5] || "";
    const underscores = m[6] || "";
    const articulation = m[7] || "";

    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }

    const duration =
      underscores === "__" ? "sixteenth" : underscores === "_" ? "eighth" : undefined;

    return {
      type: "note",
      value: digit + dots,
      octave,
      dotted: dots.length > 0,
      accidental,
      duration,
      fermata: articulation === "^",
      staccato: articulation === ";",
      accent: articulation === ">",
      trill,
    };
  }

  // Extended grace note
  const g = raw.match(EXT_GRACE_RE);
  if (g) {
    const trill = !!g[1];
    const graceNote = g[2]!;
    const accidental = g[3] as "#" | "b" | undefined;
    const mainNote = g[4]!;
    const octaveChars = g[5] || "";
    const dots = g[6] || "";
    const underscores = g[7] || "";
    const articulation = g[8] || "";

    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }

    const duration =
      underscores === "__" ? "sixteenth" : underscores === "_" ? "eighth" : undefined;

    return {
      type: "note",
      value: `(${graceNote})${mainNote}${dots}`,
      octave,
      dotted: dots.length > 0,
      accidental,
      duration,
      fermata: articulation === "^",
      staccato: articulation === ";",
      accent: articulation === ">",
      trill,
    };
  }

  // Fallback: text token
  return { type: "text", value: raw };
}

function renderToken(token: Token, key: number, beatIndex: number | null, activeBeatIndex?: number) {
  const isActive = beatIndex !== null && beatIndex === activeBeatIndex;
  const beatAttr = beatIndex !== null ? { "data-beat": beatIndex } : undefined;

  switch (token.type) {
    case "note": {
      const cls = [
        "jianpu-note",
        token.octave > 0 && "jianpu-note-up",
        token.octave < 0 && "jianpu-note-down",
        token.duration === "eighth" && "jianpu-eighth",
        token.duration === "sixteenth" && "jianpu-sixteenth",
        token.accidental === "#" && "jianpu-sharp",
        token.accidental === "b" && "jianpu-flat",
        token.fermata && "jianpu-fermata",
        token.staccato && "jianpu-staccato",
        token.accent && "jianpu-accent",
        token.trill && "jianpu-trill",
        isActive && "jianpu-active",
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <span key={key} className={cls} {...beatAttr}>
          {token.value}
        </span>
      );
    }
    case "rest": {
      const cls = [
        "jianpu-rest",
        token.duration === "eighth" && "jianpu-eighth",
        token.duration === "sixteenth" && "jianpu-sixteenth",
        isActive && "jianpu-active",
      ]
        .filter(Boolean)
        .join(" ");
      return (
        <span key={key} className={cls} {...beatAttr}>
          0
        </span>
      );
    }
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
    case "tie":
      return (
        <span key={key} className="jianpu-tie">
          ⌢
        </span>
      );
    case "slur-start":
      return <span key={key} className="jianpu-slur-mark jianpu-slur-start" />;
    case "slur-end":
      return <span key={key} className="jianpu-slur-mark jianpu-slur-end" />;
    case "beam-start":
      return null;
    case "beam-end":
      return null;
    case "tonguing":
      return (
        <span key={key} className="jianpu-tonguing">
          {token.technique === "single" ? "T" : token.technique === "double" ? "TK" : token.technique === "triple" ? "TTK" : token.technique}
        </span>
      );
    case "ornament":
      return (
        <span key={key} className="jianpu-ornament">
          {token.name}
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
        if (headerLines.length > 0) {
          inNotation = true;
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
      {headerLines.length > 0 && (
        <div className="jianpu-header">
          {headerLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}

      {notationLines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (trimmed === "") {
          return <div key={lineIdx} className="h-2" />;
        }

        const rawTokens = trimmed.split(/\s+/).map(parseToken);

        // Group beamed tokens
        const elements: React.ReactNode[] = [];
        let i = 0;
        let tokenKey = 0;

        while (i < rawTokens.length) {
          const token = rawTokens[i]!;

          if (token.type === "beam-start") {
            // Collect beamed notes until beam-end
            const beamTokens: Token[] = [];
            i++;
            while (i < rawTokens.length && rawTokens[i]!.type !== "beam-end") {
              beamTokens.push(rawTokens[i]!);
              i++;
            }
            i++; // skip beam-end

            elements.push(
              <span key={`beam-${tokenKey}`} className="jianpu-beam">
                {beamTokens.map((bt) => {
                  const bi = isBeat(bt) ? beatCounter++ : null;
                  return renderToken(bt, tokenKey++, bi, activeBeatIndex);
                })}
              </span>,
            );
          } else {
            const bi = isBeat(token) ? beatCounter++ : null;
            const el = renderToken(token, tokenKey++, bi, activeBeatIndex);
            if (el) elements.push(el);
            i++;
          }
        }

        return (
          <div key={lineIdx} className="jianpu-line">
            {elements}
          </div>
        );
      })}
    </div>
  );
}
