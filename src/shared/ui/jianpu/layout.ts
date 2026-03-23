import type { Token, LayoutItem } from "./types";
import {
  CELL_NOTE, CELL_BAR, CELL_TIE, CELL_BREATH,
  CELL_BEAM_NOTE, CELL_ANNOTATION, CELL_TEXT,
} from "./constants";
import { isBeat } from "./parser";

export function cellWidth(token: Token): number {
  switch (token.type) {
    case "bar":
      return CELL_BAR;
    case "tie":
      return CELL_TIE;
    case "breath":
      return CELL_BREATH;
    case "tonguing":
    case "ornament":
      return CELL_ANNOTATION;
    case "text":
      return CELL_TEXT;
    default:
      return CELL_NOTE;
  }
}

export function layoutLine(
  tokens: Token[],
  beatCounter: { value: number },
  tokenIdxOffset: number = 0,
): { items: LayoutItem[]; totalWidth: number } {
  const items: LayoutItem[] = [];
  let x = 0;
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i]!;
    const ti = tokenIdxOffset + i;

    if (token.type === "slur-start") {
      const children: LayoutItem[] = [];
      i++;
      const slurX = x;
      while (i < tokens.length && tokens[i]!.type !== "slur-end") {
        const t = tokens[i]!;
        if (t.type === "beam-start") {
          const beamChildren: LayoutItem[] = [];
          i++;
          const beamX = x;
          while (i < tokens.length && tokens[i]!.type !== "beam-end") {
            const bt = tokens[i]!;
            const w = CELL_BEAM_NOTE;
            beamChildren.push({
              token: bt, x: x + w / 2, width: w, tokenIdx: tokenIdxOffset + i,
              beatIndex: isBeat(bt) ? beatCounter.value++ : null,
            });
            x += w;
            i++;
          }
          i++; // skip beam-end
          children.push({
            token: { type: "beam-start" }, x: beamX + (x - beamX) / 2,
            width: x - beamX, beatIndex: null, tokenIdx: ti, children: beamChildren, groupType: "beam",
          });
        } else {
          const w = cellWidth(t);
          children.push({
            token: t, x: x + w / 2, width: w, tokenIdx: tokenIdxOffset + i,
            beatIndex: isBeat(t) ? beatCounter.value++ : null,
          });
          x += w;
          i++;
        }
      }
      i++; // skip slur-end
      items.push({
        token: { type: "slur-start" }, x: slurX + (x - slurX) / 2,
        width: x - slurX, beatIndex: null, tokenIdx: ti, children, groupType: "slur",
      });
    } else if (token.type === "beam-start") {
      const children: LayoutItem[] = [];
      i++;
      const beamX = x;
      while (i < tokens.length && tokens[i]!.type !== "beam-end") {
        const bt = tokens[i]!;
        const w = CELL_BEAM_NOTE;
        children.push({
          token: bt, x: x + w / 2, width: w, tokenIdx: tokenIdxOffset + i,
          beatIndex: isBeat(bt) ? beatCounter.value++ : null,
        });
        x += w;
        i++;
      }
      i++; // skip beam-end
      items.push({
        token: { type: "beam-start" }, x: beamX + (x - beamX) / 2,
        width: x - beamX, beatIndex: null, tokenIdx: ti, children, groupType: "beam",
      });
    } else if (token.type === "slur-end" || token.type === "beam-end") {
      i++;
    } else {
      const w = cellWidth(token);
      items.push({
        token, x: x + w / 2, width: w, tokenIdx: ti,
        beatIndex: isBeat(token) ? beatCounter.value++ : null,
      });
      x += w;
      i++;
    }
  }

  return { items, totalWidth: x };
}

/** Get the first leaf LayoutItem (for arc endpoints) */
export function flatFirst(items: LayoutItem[]): LayoutItem | undefined {
  for (const item of items) {
    if (item.children) {
      const f = flatFirst(item.children);
      if (f) return f;
    } else if (isBeat(item.token)) {
      return item;
    }
  }
  return undefined;
}

export function flatLast(items: LayoutItem[]): LayoutItem | undefined {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i]!;
    if (item.children) {
      const l = flatLast(item.children);
      if (l) return l;
    } else if (isBeat(item.token)) {
      return item;
    }
  }
  return undefined;
}

export function findActiveBeat(items: LayoutItem[], beatIdx: number | undefined): LayoutItem | undefined {
  if (beatIdx === undefined) return undefined;
  for (const item of items) {
    if (item.beatIndex === beatIdx) return item;
    if (item.children) {
      const found = findActiveBeat(item.children, beatIdx);
      if (found) return found;
    }
  }
  return undefined;
}
