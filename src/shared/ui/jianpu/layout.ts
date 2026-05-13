import type { Token, LayoutItem } from "./types";
import {
  CELL_NOTE, CELL_BAR, CELL_TIE, CELL_BREATH,
  CELL_BEAM_NOTE, CELL_ANNOTATION, CELL_TEXT,
} from "./constants";
import { isBeat } from "./parser";

function beamNoteWidth(token: Token): number {
  if (!isBeat(token)) return cellWidth(token);
  return CELL_BEAM_NOTE * 0.55;
}

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
    case "tempo":
    case "nav":
      return CELL_ANNOTATION;
    case "volta":
    case "tie-start":
    case "tie-end":
    case "tie-continue":
    case "cue-start":
    case "cue-end":
      return 0;
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

    if (token.type === "cue-start") {
      const openSynthetic = token.synthetic === true;
      i++;
      const cueX = x;
      const cueStartIdx = i;
      let depth = 1;
      while (i < tokens.length && depth > 0) {
        const t = tokens[i]!;
        if (t.type === "cue-start") depth++;
        else if (t.type === "cue-end") { depth--; if (depth === 0) break; }
        i++;
      }
      const closeToken = tokens[i];
      const closeSynthetic =
        closeToken !== undefined &&
        closeToken.type === "cue-end" &&
        closeToken.synthetic === true;
      const innerTokens = tokens.slice(cueStartIdx, i);
      const innerBeatCounter = { value: 0 };
      const inner = layoutLine(innerTokens, innerBeatCounter, tokenIdxOffset + cueStartIdx);
      function shiftAndStripBeats(list: LayoutItem[], dx: number) {
        for (const it of list) {
          it.x += dx;
          it.beatIndex = null;
          if (it.children) shiftAndStripBeats(it.children, dx);
        }
      }
      // Less side padding when the bracket is suppressed (continuation segments).
      const PAD_FULL = 16;
      const PAD_OPEN = 4;
      const padLeft = openSynthetic ? PAD_OPEN : PAD_FULL;
      const padRight = closeSynthetic ? PAD_OPEN : PAD_FULL;
      shiftAndStripBeats(inner.items, x + padLeft);
      x += inner.totalWidth + padLeft + padRight;
      i++; // skip cue-end
      items.push({
        token: { type: "cue-start" }, x: cueX + (x - cueX) / 2,
        width: x - cueX, beatIndex: null, tokenIdx: ti, children: inner.items, groupType: "cue",
        cueOpenLeft: openSynthetic,
        cueOpenRight: closeSynthetic,
      });
    } else if (token.type === "slur-start") {
      const children: LayoutItem[] = [];
      i++;
      const slurX = x;
      while (i < tokens.length && tokens[i]!.type !== "slur-end") {
        const t = tokens[i]!;
        if (t.type === "beam-start") {
          const beamChildren: LayoutItem[] = [];
          i++;
          const beamX = x;
          let beamDepth = 1;
          while (i < tokens.length && beamDepth > 0) {
            const bt = tokens[i]!;
            if (bt.type === "beam-start") { beamDepth++; i++; continue; }
            if (bt.type === "beam-end") { beamDepth--; if (beamDepth === 0) break; i++; continue; }
            const w = beamNoteWidth(bt);
            beamChildren.push({
              token: bt, x: x + w / 2, width: w, tokenIdx: tokenIdxOffset + i,
              beatIndex: isBeat(bt) ? beatCounter.value++ : null,
            });
            x += w;
            i++;
          }
          i++; // skip outer beam-end
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
      let beamDepth = 1;
      while (i < tokens.length && beamDepth > 0) {
        const bt = tokens[i]!;
        if (bt.type === "beam-start") { beamDepth++; i++; continue; }
        if (bt.type === "beam-end") { beamDepth--; if (beamDepth === 0) break; i++; continue; }
        const w = beamNoteWidth(bt);
        children.push({
          token: bt, x: x + w / 2, width: w, tokenIdx: tokenIdxOffset + i,
          beatIndex: isBeat(bt) ? beatCounter.value++ : null,
        });
        x += w;
        i++;
      }
      i++; // skip outer beam-end
      items.push({
        token: { type: "beam-start" }, x: beamX + (x - beamX) / 2,
        width: x - beamX, beatIndex: null, tokenIdx: ti, children, groupType: "beam",
      });
    } else if (token.type === "slur-end" || token.type === "beam-end" || token.type === "cue-end") {
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
