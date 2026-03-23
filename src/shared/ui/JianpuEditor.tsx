import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { JianpuRenderer, parseToken } from "./JianpuRenderer";

interface JianpuEditorProps {
  value: string;
  onChange: (jianpu: string) => void;
  timeSignature: string;
  title?: string;
  keySignature?: string;
  tempo?: number;
  onEditModeChange?: (editing: boolean) => void;
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

// ─── Styles ───

const activeStyle = (on: boolean) => ({
  backgroundColor: on ? "var(--color-accent)" : "var(--color-bg-tertiary)",
  color: on ? "white" : "var(--color-text)",
  border: `1px solid ${on ? "var(--color-accent)" : "var(--color-border)"}`,
});

const btnStyle = {
  backgroundColor: "var(--color-bg-tertiary)",
  color: "var(--color-text)",
  border: "1px solid var(--color-border)",
};

// ─── Main Component ───

export function JianpuEditor({
  value,
  onChange,
  timeSignature,
  title,
  keySignature,
  tempo,
  onEditModeChange,
}: JianpuEditorProps) {
  const [tokens, setTokens] = useState<string[]>(() => parseToTokenArray(value));
  const [editMode, setEditMode] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [beamActive, setBeamActive] = useState(false);
  const [slurActive, setSlurActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const jianpuText = useMemo(() => tokensToString(tokens), [tokens]);

  useEffect(() => { onChange(jianpuText); }, [jianpuText, onChange]);

  useEffect(() => {
    const current = tokensToString(tokens);
    if (value !== current) {
      setTokens(parseToTokenArray(value));
      setSelectedIdx(null);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTokenClick = useCallback(
    (tokenIdx: number) => {
      setSelectedIdx((prev) => (prev === tokenIdx ? null : tokenIdx));
    },
    [],
  );

  const updateToken = useCallback((idx: number, newToken: string) => {
    setTokens((prev) => { const n = [...prev]; n[idx] = newToken; return n; });
  }, []);

  const deleteToken = useCallback((idx: number) => {
    setTokens((prev) => prev.filter((_, i) => i !== idx));
    setSelectedIdx(null);
  }, []);

  const appendToken = useCallback((t: string) => {
    setTokens((prev) => [...prev, t]);
  }, []);

  const closePopover = useCallback(() => { setSelectedIdx(null); }, []);

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
  const selectedToken = selectedIdx !== null ? tokens[selectedIdx] : null;
  const parsedSelected = selectedToken ? parseToken(selectedToken) : null;

  return (
    <div ref={containerRef} className="relative">
      {/* Edit mode toggle — subtle inline */}
      {!editMode && (
        <div className="flex justify-end mb-1">
          <button
            className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-secondary)" }}
            onClick={() => { setEditMode(true); onEditModeChange?.(true); }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
        </div>
      )}

      {editMode && (
        <>
          {/* Done button */}
          <div className="flex justify-end mb-1">
            <button
              className="flex items-center gap-1 text-xs font-medium hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-accent)" }}
              onClick={() => { setEditMode(false); setSelectedIdx(null); setBeamActive(false); setSlurActive(false); onEditModeChange?.(false); }}
            >
              Done
            </button>
          </div>

          {/* Beat indicator */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-2 mb-3"
            style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>Beat</span>
            <div className="flex gap-1">
              {Array.from({ length: expected }, (_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    backgroundColor: i < Math.floor(currentMeasureBeats) ? "var(--color-accent)"
                      : i === Math.floor(currentMeasureBeats) && currentMeasureBeats % 1 > 0 ? "var(--color-accent)" : "var(--color-bg-tertiary)",
                    opacity: i === Math.floor(currentMeasureBeats) && currentMeasureBeats % 1 > 0 ? 0.4 : 1,
                    border: "1px solid var(--color-border)",
                  }}
                />
              ))}
            </div>
            <span className="text-xs tabular-nums" style={{ color: "var(--color-text-secondary)" }}>
              {currentMeasureBeats}/{expected}
            </span>
          </div>
        </>
      )}

      {editMode && (
      <>
      {/* Toolbar: Notes */}
      <div
        className="rounded-xl px-3 py-3 mb-2 space-y-2"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      >
        {/* Note digits */}
        <div className="flex gap-2 justify-center">
          {["1", "2", "3", "4", "5", "6", "7"].map((d) => (
            <button
              key={d}
              className="flex items-center justify-center rounded-lg text-base font-semibold h-11 w-11 active:scale-95 transition-transform"
              style={btnStyle}
              onClick={() => appendToken(beamActive ? `${d}_` : d)}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Tools row */}
        <div className="flex gap-2 justify-center flex-wrap">
          <button className="flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 active:scale-95 transition-transform" style={btnStyle} onClick={() => appendToken("0")}>
            0 rest
          </button>
          <button className="flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 active:scale-95 transition-transform" style={btnStyle} onClick={() => appendToken("-")}>
            − hold
          </button>
          <button className="flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 active:scale-95 transition-transform" style={btnStyle} onClick={() => appendToken("|")}>
            | bar
          </button>
          <button className="flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 active:scale-95 transition-transform" style={btnStyle} onClick={() => appendToken("||")}>
            || end
          </button>
          <button className="flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 active:scale-95 transition-transform" style={btnStyle} onClick={() => appendToken("\n")}>
            ↵
          </button>
        </div>

        {/* Breath */}
        <div className="flex gap-2 justify-center">
          <button className="flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 active:scale-95 transition-transform" style={btnStyle} onClick={() => appendToken("V")}>
            ∨ breath
          </button>
        </div>
      </div>

      {/* Toggle modes: Slur & Beam — separate section */}
      <div
        className="flex gap-2 justify-center rounded-xl px-3 py-2 mb-2"
        style={{ backgroundColor: "var(--color-bg-tertiary)", border: "1px dashed var(--color-border)" }}
      >
        <span className="text-xs flex items-center" style={{ color: "var(--color-text-secondary)" }}>Mode:</span>
        <button
          className="flex items-center gap-1.5 rounded-full text-sm font-medium h-9 px-4 active:scale-95 transition-all"
          style={{
            backgroundColor: slurActive ? "var(--color-accent)" : "transparent",
            color: slurActive ? "white" : "var(--color-text-secondary)",
            border: `2px solid ${slurActive ? "var(--color-accent)" : "var(--color-border)"}`,
          }}
          onClick={() => {
            if (slurActive) { appendToken(")"); setSlurActive(false); }
            else { appendToken("("); setSlurActive(true); }
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: slurActive ? "white" : "var(--color-border)" }} />
          {slurActive ? "End slur )" : "Slur ("}
        </button>
        <button
          className="flex items-center gap-1.5 rounded-full text-sm font-medium h-9 px-4 active:scale-95 transition-all"
          style={{
            backgroundColor: beamActive ? "var(--color-accent)" : "transparent",
            color: beamActive ? "white" : "var(--color-text-secondary)",
            border: `2px solid ${beamActive ? "var(--color-accent)" : "var(--color-border)"}`,
          }}
          onClick={() => {
            if (beamActive) { appendToken("]"); setBeamActive(false); }
            else { appendToken("["); setBeamActive(true); }
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: beamActive ? "white" : "var(--color-border)" }} />
          {beamActive ? "End beam ]" : "Beam ["}
        </button>
      </div>
      </>
      )}

      {/* SVG notation */}
      <div
        className="rounded-xl p-4 overflow-x-auto mb-2"
        style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
      >
        {tokens.length > 0 ? (
          <JianpuRenderer
            content={jianpuText}
            title={title}
            keySignature={keySignature}
            timeSignature={timeSignature}
            tempo={tempo}
            interactive={editMode}
            selectedTokenIdx={editMode ? selectedIdx : null}
            onTokenClick={editMode ? handleTokenClick : undefined}
          />
        ) : (
          <p className="text-sm text-center py-10" style={{ color: "var(--color-text-secondary)" }}>
            Tap the note buttons above to start writing
          </p>
        )}
      </div>

      {/* Bottom sheet popover for editing selected note */}
      {editMode && selectedIdx !== null && parsedSelected && (
        <NoteBottomSheet
          token={parsedSelected}
          onUpdate={(t) => updateToken(selectedIdx, t)}
          onDelete={() => deleteToken(selectedIdx)}
          onClose={closePopover}
        />
      )}

      {/* Raw text editor (collapsible) */}
      {editMode && (
        <details className="mt-2">
          <summary className="text-xs cursor-pointer select-none py-1" style={{ color: "var(--color-text-secondary)" }}>
            Edit raw notation
          </summary>
          <textarea
            value={jianpuText}
            onChange={(e) => {
              setTokens(parseToTokenArray(e.target.value));
              setSelectedIdx(null);
            }}
            className="w-full font-mono text-sm rounded-lg p-3 mt-1 resize-y"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
              minHeight: "80px",
            }}
            spellCheck={false}
          />
        </details>
      )}
    </div>
  );
}

// ─── Bottom Sheet for editing a note ───

interface NoteBottomSheetProps {
  token: ReturnType<typeof parseToken>;
  onUpdate: (newToken: string) => void;
  onDelete: () => void;
  onClose: () => void;
}

function NoteBottomSheet({ token, onUpdate, onDelete, onClose }: NoteBottomSheetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const btn = "flex items-center justify-center rounded-lg font-medium active:scale-95 transition-transform";

  if (token.type === "note") {
    const digit = token.value.replace(/[^1-7]/g, "").charAt(0) || "1";
    const oct = token.octave;
    const dur = token.duration === "eighth" ? "_" : token.duration === "sixteenth" ? "__" : "";
    const acc = token.accidental || "";
    const tng = token.tonguing || false;

    const rebuild = (
      d = digit, o = oct,
      du: "" | "_" | "__" = dur as "" | "_" | "__",
      a: "" | "#" | "b" = acc as "" | "#" | "b",
      t = tng,
    ) => onUpdate(buildNoteToken(d, o, du, a, t));

    return (
      <div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 z-[60] rounded-t-2xl px-4 pt-3 pb-20 space-y-3 sm:absolute sm:bottom-auto sm:left-auto sm:right-auto sm:rounded-xl sm:max-w-xs sm:p-3 sm:pb-3 sm:space-y-2"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderTop: "1px solid var(--color-border)",
          boxShadow: "0 -4px 20px var(--color-shadow)",
        }}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center sm:hidden">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
        </div>

        {/* Note digits */}
        <div className="flex gap-2 justify-center">
          {["1", "2", "3", "4", "5", "6", "7"].map((d) => (
            <button key={d} className={`${btn} h-11 w-11 text-base`} style={activeStyle(d === digit)} onClick={() => rebuild(d)}>
              {d}
            </button>
          ))}
        </div>

        {/* Octave + Duration */}
        <div className="flex gap-2 justify-center items-center">
          <button className={`${btn} h-10 w-10 text-sm`} style={btnStyle} onClick={() => rebuild(digit, oct - 1)}>▼</button>
          <span className="text-xs w-8 text-center tabular-nums" style={{ color: "var(--color-text-secondary)" }}>
            Oct {oct > 0 ? `+${oct}` : oct}
          </span>
          <button className={`${btn} h-10 w-10 text-sm`} style={btnStyle} onClick={() => rebuild(digit, oct + 1)}>▲</button>

          <div className="w-px h-8 mx-1" style={{ backgroundColor: "var(--color-border)" }} />

          <button className={`${btn} h-10 px-3 text-sm`} style={activeStyle(dur === "")}>♩</button>
          <button className={`${btn} h-10 px-3 text-sm`} style={activeStyle(dur === "_")} onClick={() => rebuild(digit, oct, dur === "_" ? "" : "_")}>♪</button>
          <button className={`${btn} h-10 px-3 text-sm`} style={activeStyle(dur === "__")} onClick={() => rebuild(digit, oct, dur === "__" ? "" : "__")}>♬</button>
        </div>

        {/* Modifiers + Actions */}
        <div className="flex gap-2 justify-center items-center">
          <button className={`${btn} h-10 px-3 text-sm`} style={activeStyle(acc === "#")} onClick={() => rebuild(digit, oct, dur as "" | "_" | "__", acc === "#" ? "" : "#")}>♯</button>
          <button className={`${btn} h-10 px-3 text-sm`} style={activeStyle(acc === "b")} onClick={() => rebuild(digit, oct, dur as "" | "_" | "__", acc === "b" ? "" : "b")}>♭</button>
          <button className={`${btn} h-10 px-3 text-sm`} style={activeStyle(tng)} onClick={() => rebuild(digit, oct, dur as "" | "_" | "__", acc as "" | "#" | "b", !tng)}>T</button>

          <div className="w-px h-8 mx-1" style={{ backgroundColor: "var(--color-border)" }} />

          <button className={`${btn} h-10 px-3 text-sm`} style={btnStyle} onClick={() => onUpdate("-")}>→ −</button>
          <button className={`${btn} h-10 px-3 text-sm`} style={btnStyle} onClick={() => onUpdate("0")}>→ 0</button>
          <button className={`${btn} h-10 px-3 text-sm text-red-500`} style={btnStyle} onClick={onDelete}>✕</button>
        </div>
      </div>
    );
  }

  // Rest/Hold bottom sheet
  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-[60] rounded-t-2xl px-4 pt-3 pb-20 sm:absolute sm:bottom-auto sm:left-auto sm:right-auto sm:rounded-xl sm:max-w-xs sm:p-3 sm:pb-3"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        boxShadow: "0 -4px 20px var(--color-shadow)",
      }}
    >
      <div className="flex justify-center sm:hidden mb-3">
        <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        <span className="text-sm flex items-center" style={{ color: "var(--color-text-secondary)" }}>Change to:</span>
        {["1", "2", "3", "4", "5", "6", "7"].map((d) => (
          <button key={d} className={`${btn} h-11 w-11 text-base`} style={btnStyle} onClick={() => onUpdate(d)}>
            {d}
          </button>
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-2">
        <button className={`${btn} h-10 px-4 text-sm`} style={btnStyle} onClick={() => onUpdate("0")}>0 rest</button>
        <button className={`${btn} h-10 px-4 text-sm`} style={btnStyle} onClick={() => onUpdate("-")}>− hold</button>
        <button className={`${btn} h-10 px-4 text-sm text-red-500`} style={btnStyle} onClick={onDelete}>✕ Delete</button>
      </div>
    </div>
  );
}
