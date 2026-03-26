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
      tonguing?: boolean;
    }
  | { type: "rest"; duration?: "eighth" | "sixteenth" }
  | { type: "hold" }
  | { type: "bar"; value: string }
  | { type: "text"; value: string }
  | { type: "tie" }
  | { type: "breath" }
  | { type: "slur-start" }
  | { type: "slur-end" }
  | { type: "beam-start" }
  | { type: "beam-end" }
  | { type: "tonguing"; technique: string }
  | { type: "ornament"; name: string }
  | { type: "volta"; ending: number }
  | { type: "tie-start" }
  | { type: "tie-end" };

export interface LayoutItem {
  token: Token;
  x: number;
  width: number;
  beatIndex: number | null;
  tokenIdx: number;
  children?: LayoutItem[];
  groupType?: "beam" | "slur";
}

export interface InteractiveOpts {
  interactive?: boolean;
  selectedTokenIdx?: number | null;
  onTokenClick?: (tokenIdx: number, x: number, y: number) => void;
  onGapClick?: (insertIdx: number, x: number, y: number) => void;
  onBeatClick?: (beatIndex: number) => void;
  lineYOffset?: number;
  onNoteHover?: (token: Token, event: React.MouseEvent, annotations: string[]) => void;
  onNoteLeave?: () => void;
}

export interface JianpuRendererProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
  activeBeatIndex?: number;
  beatDurationMs?: number;
  startBeatIndex?: number;
  onBeatClick?: (beatIndex: number) => void;
  title?: string;
  keySignature?: string;
  timeSignature?: string;
  tempo?: number;
  origin?: string;
  // Interactive editor props
  interactive?: boolean;
  selectedTokenIdx?: number | null;
  onTokenClick?: (tokenIdx: number, x: number, y: number) => void;
  onGapClick?: (insertIdx: number, x: number, y: number) => void;
}
