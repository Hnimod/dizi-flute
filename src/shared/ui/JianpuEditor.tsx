import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { JianpuRenderer, parseToken } from "./JianpuRenderer";

interface JianpuEditorProps {
  value: string;
  onChange: (jianpu: string) => void;
  timeSignature: string;
  title?: string;
  keySignature?: string;
  tempo?: number;
}

function buildNoteToken(
  digit: string,
  octave: number,
  duration: "" | "_" | "__",
  accidental: "" | "#" | "b",
  tonguing: boolean,
): string {
  let t = "";
  if (accidental) t += accidental;
  t += digit;
  if (octave > 0) t += "'".repeat(octave);
  if (octave < 0) t += ",".repeat(-octave);
  if (duration) t += duration;
  if (tonguing) t += "T";
  return t;
}

function parseToTokenArray(value: string): string[] {
  if (!value.trim()) return [];
  const result: string[] = [];
  for (const line of value.split("\n")) {
    if (result.length > 0) result.push("\n");
    const trimmed = line.trim();
    if (trimmed) result.push(...trimmed.split(/\s+/));
  }
  return result;
}

function tokensToString(tokens: string[]): string {
  const parts: string[] = [];
  let line: string[] = [];
  for (const t of tokens) {
    if (t === "\n") {
      parts.push(line.join(" "));
      line = [];
    } else {
      line.push(t);
    }
  }
  if (line.length > 0) parts.push(line.join(" "));
  return parts.join("\n");
}

const btnSm = "flex items-center justify-center rounded text-xs font-medium h-7 px-2 transition-all";

function tokenBeats(raw: string): number {
  if (raw === "-") return 1;
  if (raw === "0") return 1;
  if (raw === "0_") return 0.5;
  if (raw === "0__") return 0.25;
  if (raw.includes("__")) return 0.25;
  if (raw.includes("_")) return 0.5;
  if (/[1-7]/.test(raw)) return 1;
  return 0;
}

function beatsPerMeasure(ts: string): number {
  return parseInt(ts.split("/")[0] || "4", 10);
}

export function JianpuEditor({
  value,
  onChange,
  timeSignature,
  title,
  keySignature,
  tempo,
}: JianpuEditorProps) {
  const [tokens, setTokens] = useState<string[]>(() => parseToTokenArray(value));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const jianpuText = useMemo(() => tokensToString(tokens), [tokens]);

  useEffect(() => {
    onChange(jianpuText);
  }, [jianpuText, onChange]);

  // Sync if external value changes
  useEffect(() => {
    const current = tokensToString(tokens);
    if (value !== current) {
      setTokens(parseToTokenArray(value));
      setSelectedIdx(null);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTokenClick = useCallback(
    (tokenIdx: number, svgX: number, svgY: number) => {
      // Find the SVG element position relative to container
      const container = containerRef.current;
      if (!container) return;
      const svgEl = container.querySelectorAll(".jianpu-svg")[0];
      if (!svgEl) {
        setSelectedIdx(tokenIdx);
        setPopoverPos({ x: 100, y: 60 });

        return;
      }
      // Use a rough position based on click
      setSelectedIdx(tokenIdx);
      // Position popover near the click area
      const rect = container.getBoundingClientRect();
      setPopoverPos({
        x: Math.min(rect.width - 200, Math.max(0, svgX * (rect.width / 800))),
        y: svgY + 20,
      });
    },
    [],
  );

  const updateToken = useCallback(
    (idx: number, newToken: string) => {
      setTokens((prev) => {
        const next = [...prev];
        next[idx] = newToken;
        return next;
      });
    },
    [],
  );

  const insertToken = useCallback(
    (idx: number, newToken: string) => {
      setTokens((prev) => {
        const next = [...prev];
        next.splice(idx, 0, newToken);
        return next;
      });
      setSelectedIdx(null);
      setPopoverPos(null);
    },
    [],
  );

  const deleteToken = useCallback(
    (idx: number) => {
      setTokens((prev) => prev.filter((_, i) => i !== idx));
      setSelectedIdx(null);
      setPopoverPos(null);
    },
    [],
  );

  const appendToken = useCallback(
    (newToken: string) => {
      setTokens((prev) => [...prev, newToken]);
    },
    [],
  );

  const closePopover = useCallback(() => {
    setSelectedIdx(null);
    setPopoverPos(null);
  }, []);

  // Get current beat count in current measure
  const currentMeasureBeats = useMemo(() => {
    let beats = 0;
    for (let i = tokens.length - 1; i >= 0; i--) {
      const t = tokens[i]!;
      if (t === "|" || t === "||" || t === "\n") break;
      beats += tokenBeats(t);
    }
    return beats;
  }, [tokens]);

  const expected = beatsPerMeasure(timeSignature);

  // Selected token info
  const selectedToken = selectedIdx !== null ? tokens[selectedIdx] : null;
  const parsedSelected = selectedToken ? parseToken(selectedToken) : null;

  const noteStyle = {
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-text)",
    border: "1px solid var(--color-border)",
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Beat indicator */}
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 mb-2 text-xs"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      >
        <span style={{ color: "var(--color-text-secondary)" }}>Measure:</span>
        <div className="flex gap-0.5">
          {Array.from({ length: expected }, (_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: i < Math.floor(currentMeasureBeats) ? "var(--color-accent)" : "var(--color-bg-tertiary)",
                opacity: i === Math.floor(currentMeasureBeats) && currentMeasureBeats % 1 > 0 ? 0.5 : 1,
                border: "1px solid var(--color-border)",
              }}
            />
          ))}
        </div>
        <span style={{ color: "var(--color-text-secondary)" }}>{currentMeasureBeats}/{expected}</span>
      </div>

      {/* Quick add toolbar */}
      <div
        className="flex flex-wrap gap-1 rounded-lg px-2 py-1.5 mb-2"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      >
        {["1", "2", "3", "4", "5", "6", "7"].map((d) => (
          <button key={d} className={btnSm} style={noteStyle} onClick={() => appendToken(d)}>
            {d}
          </button>
        ))}
        <span className="w-px mx-0.5 self-stretch" style={{ backgroundColor: "var(--color-border)" }} />
        <button className={btnSm} style={noteStyle} onClick={() => appendToken("0")}>0</button>
        <button className={btnSm} style={noteStyle} onClick={() => appendToken("-")}>−</button>
        <button className={btnSm} style={noteStyle} onClick={() => appendToken("|")}>|</button>
        <button className={btnSm} style={noteStyle} onClick={() => appendToken("||")}>||</button>
        <button className={btnSm} style={noteStyle} onClick={() => appendToken("\n")}>↵</button>
      </div>

      {/* Interactive SVG notation */}
      <div
        className="rounded-lg p-4 overflow-x-auto"
        style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
      >
        {tokens.length > 0 ? (
          <JianpuRenderer
            content={jianpuText}
            title={title}
            keySignature={keySignature}
            timeSignature={timeSignature}
            tempo={tempo}
            interactive
            selectedTokenIdx={selectedIdx}
            onTokenClick={handleTokenClick}
          />
        ) : (
          <p className="text-sm text-center py-8" style={{ color: "var(--color-text-secondary)" }}>
            Click the note buttons above to start writing notation
          </p>
        )}
      </div>

      {/* Note editing popover */}
      {selectedIdx !== null && popoverPos && parsedSelected && (
        <NotePopover
          token={parsedSelected}
          position={popoverPos}
          onUpdate={(newToken) => {
            updateToken(selectedIdx, newToken);
          }}
          onInsertBefore={(newToken) => insertToken(selectedIdx, newToken)}
          onDelete={() => deleteToken(selectedIdx)}
          onClose={closePopover}
        />
      )}
    </div>
  );
}

// ─── Note Popover ───

interface NotePopoverProps {
  token: ReturnType<typeof parseToken>;
  position: { x: number; y: number };
  onUpdate: (newToken: string) => void;
  onInsertBefore: (newToken: string) => void;
  onDelete: () => void;
  onClose: () => void;
}

function NotePopover({ token, position, onUpdate, onDelete, onClose }: NotePopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const btnSm2 = "flex items-center justify-center rounded text-xs font-medium h-7 min-w-7 px-1.5 transition-all";

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

  if (token.type === "note") {
    const digit = token.value.replace(/[^1-7]/g, "").charAt(0) || "1";
    const oct = token.octave;
    const dur = token.duration === "eighth" ? "_" : token.duration === "sixteenth" ? "__" : "";
    const acc = token.accidental || "";
    const tng = token.tonguing || false;

    const rebuild = (
      d = digit,
      o = oct,
      du: "" | "_" | "__" = dur as "" | "_" | "__",
      a: "" | "#" | "b" = acc as "" | "#" | "b",
      t = tng,
    ) => onUpdate(buildNoteToken(d, o, du, a, t));

    return (
      <div
        ref={ref}
        className="absolute z-50 rounded-lg shadow-lg p-2.5 space-y-1.5"
        style={{
          left: Math.max(0, position.x - 80),
          top: position.y,
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--color-shadow) 0 4px 12px",
          minWidth: "220px",
        }}
      >
        {/* Note digit */}
        <div className="flex gap-1">
          {["1", "2", "3", "4", "5", "6", "7"].map((d) => (
            <button key={d} className={btnSm2} style={modStyle(d === digit)} onClick={() => rebuild(d)}>
              {d}
            </button>
          ))}
        </div>

        {/* Octave + Duration + Modifiers */}
        <div className="flex gap-1 flex-wrap">
          <button className={btnSm2} style={noteStyle} onClick={() => rebuild(digit, oct - 1)}>▼</button>
          <span className="flex items-center text-xs min-w-6 justify-center" style={{ color: "var(--color-text-secondary)" }}>
            {oct > 0 ? `+${oct}` : oct}
          </span>
          <button className={btnSm2} style={noteStyle} onClick={() => rebuild(digit, oct + 1)}>▲</button>
          <span className="w-px mx-0.5 self-stretch" style={{ backgroundColor: "var(--color-border)" }} />
          <button className={btnSm2} style={modStyle(dur === "")} onClick={() => rebuild(digit, oct, "")}>♩</button>
          <button className={btnSm2} style={modStyle(dur === "_")} onClick={() => rebuild(digit, oct, "_")}>♪</button>
          <button className={btnSm2} style={modStyle(dur === "__")} onClick={() => rebuild(digit, oct, "__")}>♬</button>
        </div>

        <div className="flex gap-1 flex-wrap">
          <button className={btnSm2} style={modStyle(acc === "#")} onClick={() => rebuild(digit, oct, dur as "" | "_" | "__", acc === "#" ? "" : "#")}>♯</button>
          <button className={btnSm2} style={modStyle(acc === "b")} onClick={() => rebuild(digit, oct, dur as "" | "_" | "__", acc === "b" ? "" : "b")}>♭</button>
          <button className={btnSm2} style={modStyle(tng)} onClick={() => rebuild(digit, oct, dur as "" | "_" | "__", acc as "" | "#" | "b", !tng)}>T</button>
          <span className="w-px mx-0.5 self-stretch" style={{ backgroundColor: "var(--color-border)" }} />
          <button className={btnSm2} style={{ ...noteStyle, color: "var(--color-accent)" }} onClick={() => onUpdate("-")}>→ −</button>
          <button className={btnSm2} style={{ ...noteStyle, color: "var(--color-accent)" }} onClick={() => onUpdate("0")}>→ 0</button>
          <button className={`${btnSm2} text-red-500`} style={noteStyle} onClick={onDelete}>✕</button>
        </div>
      </div>
    );
  }

  // For rest/hold — simpler popover
  return (
    <div
      ref={ref}
      className="absolute z-50 rounded-lg shadow-lg p-2.5"
      style={{
        left: Math.max(0, position.x - 60),
        top: position.y,
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--color-shadow) 0 4px 12px",
      }}
    >
      <div className="flex gap-1">
        <span className="text-xs flex items-center mr-1" style={{ color: "var(--color-text-secondary)" }}>
          Change to:
        </span>
        {["1", "2", "3", "4", "5", "6", "7"].map((d) => (
          <button key={d} className={btnSm2} style={noteStyle} onClick={() => onUpdate(d)}>
            {d}
          </button>
        ))}
        <button className={btnSm2} style={noteStyle} onClick={() => onUpdate("0")}>0</button>
        <button className={btnSm2} style={noteStyle} onClick={() => onUpdate("-")}>−</button>
        <button className={`${btnSm2} text-red-500`} style={noteStyle} onClick={onDelete}>✕</button>
      </div>
    </div>
  );
}
