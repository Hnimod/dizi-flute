---
name: create-song
description: Scaffold a new song entry in this dizi-flute library — creates the per-song folder, an `index.ts` with the right `Song` shape (image import wired up), and registers it in `src/data/songs/index.ts`. Use when the user says "create new song", "add new song", or gives a song title (often Chinese / pinyin) and wants a stub they can later fill in. The user typically does not read Chinese — always populate `searchKeywords` with English-searchable terms (OST/drama name, romanizations, composer, English meaning) so they can find the song again.
---

# Create New Song

Scaffold a song stub that drops into the library, with the sheet image import already wired up so the user only needs to copy the JPG into the song folder.

## What the user provides

Usually some subset of:
- Chinese title (e.g. 《不染》, "Bu Ran")
- Pinyin / English meaning ("The Sorrow of Parting")
- A YouTube link (for `videoUrls`)
- A drama / movie / artist association ("from Ashes of Love")

The user does **not** read Chinese. Treat the Chinese title as opaque — your job is to derive English-searchable metadata from it.

## Steps

1. **Pick the slug.** Use kebab-case pinyin (no tone marks, no apostrophes).
   - `不染` → `bu-ran`
   - `双面燕洵` → `shuang-mian-yan-xun`
   - `最美的情缘` → `zui-mei-de-qing-yuan`

2. **Create `src/data/songs/<slug>/index.ts`** with this template — including the image import. The user will copy `<slug>.jpg` into the folder later; if they don't have one yet, leave the import as-is so it'll fail loudly until they drop the image in (or comment it out and tell them).

   ```ts
   import type { Song } from "@/shared/types";
   import sheetImg from "./<slug>.jpg";

   export const song: Song = {
     id: "<slug>",
     type: "song",
     difficulty: 5,
     titleChinese: "<汉字>",
     titlePinyin: "<Pīn Yīn with tone marks>",
     titleEnglish: "<English title or transliteration>",
     key: "D",
     timeSignature: "4/4",
     jianpu: ``,
     description:
       "<one-sentence context — drama/artist/style. End with: Notation here is a stub — replace with a verified dizi score.>",
     origin: "<Chinese name + English name of source, composer, year>",
     videoUrls: ["<youtube url if provided>"],
     searchKeywords: [<English-searchable terms — see below>],
     sheetImage: sheetImg,
   };
   ```

   **Multi-page sheets:** `sheetImage` accepts `string | string[]`. For scores spanning multiple pages, import each page and pass an array — they'll render stacked in the accordion with page-number badges and a fullscreen viewer with prev/next nav.

   ```ts
   import sheetPage1 from "./<slug>-1.png";
   import sheetPage2 from "./<slug>-2.png";
   // ...
   sheetImage: [sheetPage1, sheetPage2],
   ```

3. **Fill `searchKeywords` with copy-ready Chinese search phrases.** The user does NOT read Chinese — these strings live in the data file so they can open the song's `index.ts`, copy a phrase, and paste it into Baidu / Bilibili / Douyin / YouTube / Google to hunt down a dizi recording (then paste the URL back into `videoUrls`).

   Lead with full Chinese phrases that combine the song title with dizi search terms — these are what the user actually pastes externally:
   - `<汉字 title> 笛子`     ← most common, broad
   - `<汉字 title> 笛子 简谱` ← when they also want sheet music
   - `<汉字 title> 竹笛`     ← alternate term for bamboo flute
   - `<drama or composer 汉字> 笛子` ← when the title alone is too generic

   Then add a short tail of English / romanized terms so the in-app search box also finds the song from English typing:
   - Drama / movie / album English name, character or composer romanized
   - English meaning of the title
   - Genre tags (`xianxia`, `wuxia`, `guzhuang`, `古风`, `OST`)

   Mark the array with a one-line comment so the user knows it's also a copy-paste source:
   `// Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.`

   Example (`不染`):
   ```ts
   // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
   searchKeywords: [
     "不染 笛子",
     "不染 笛子 简谱",
     "不染 竹笛",
     "香蜜沉沉烬如霜 笛子",
     "Ashes of Love dizi",
     "Mao Buyi", "毛不易", "Unsullied", "xianxia",
   ],
   ```

4. **Register in `src/data/songs/index.ts`** — songs are kept alphabetically sorted by slug. Insert both the `import` line and the entry in the `songs` array at the correct alphabetical position.

5. **Type-check** before reporting done:
   ```bash
   npx tsc --noEmit
   ```

6. **Tell the user what to do with the image.** Something like: "Drop `<slug>.jpg` into `src/data/songs/<slug>/` and the import will pick it up." If they don't have a sheet, suggest they remove the `sheetImage` field and the import for now.

## Defaults

When the user doesn't specify, default to:
- `key: "D"` (most common dizi key in this library)
- `timeSignature: "4/4"`
- `difficulty: 5` (mid-range placeholder — adjust if the user hints at level)
- `jianpu: ``` `` ``` ` (empty — they'll fill it in)

## Anti-patterns

- Don't invent jianpu content. An empty string is honest; a hallucinated melody is worse than nothing.
- Don't skip `searchKeywords`. The whole point of this skill is making non-Chinese-readable songs findable.
- Don't put the song in a category subfolder — the library is flat (`songs/<slug>/`), not grouped by difficulty.
