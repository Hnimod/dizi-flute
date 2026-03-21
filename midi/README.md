# MIDI Practice Files

Reference audio for all songs and exercises in the Dizi Flute Learning Course. Each file plays the melody using a pan flute sound so you can hear the correct notes and rhythm.

## How to Play MIDI Files

### macOS (Recommended): TiMidity++

Install via Homebrew:
```bash
brew install timidity
```

Play a file:
```bash
timidity midi/level-2/05-xiao-xing-xing.mid
```

Adjust tempo with `-T` (percentage — 100 = normal):
```bash
timidity -T 50 midi/level-2/05-xiao-xing-xing.mid   # Half speed (practice)
timidity -T 150 midi/level-3/06-jasmine-flower.mid    # 1.5x speed
```

Play all files in a level:
```bash
timidity midi/level-1/*.mid
```

### Other Platforms

| Platform | Player |
|----------|--------|
| macOS | GarageBand (built-in), QuickTime, or VLC |
| Windows | Windows Media Player, VLC, or any DAW |
| iOS | GarageBand |
| Android | MIDI Player by Xequte |
| Web | [Signal (free)](https://signal.vercel.app/) or [Online MIDI Player](https://onlinesequencer.net/import) |

## File Organization

```
midi/
├── level-1/    12 files — Long tones, scales, Mary Had a Little Lamb, etc.
├── level-2/    10 files — 小星星, 小白菜, Ode to Joy, etc.
├── level-3/    12 files — 茉莉花, 康定情歌, Scarborough Fair, etc.
├── level-4/    11 files — 龙的传人, 女儿情, 彩云追月, etc.
├── level-5/     6 files — 姑苏行, 小放牛, 喜相逢, etc.
├── level-6/     5 files — 牧民新歌, 春到湘江, 鹧鸪飞, etc.
└── level-7/     4 files — 幽兰逢春, 三五七, 秦川抒怀, etc.
```

## Notes

- All files use MIDI pan flute (program 75) — close to dizi timbre
- Multi-section pieces (e.g., 姑苏行, 牧民新歌) include all sections with tempo changes
- 散板 (free time) sections use a slow fixed tempo as approximation
- Ornaments (vibrato, grace notes, slides) are simplified — listen to real dizi recordings for authentic ornamentation
- Files are generated from `scripts/generate_midi.py`

## Regenerating

```bash
python3 scripts/generate_midi.py
```
