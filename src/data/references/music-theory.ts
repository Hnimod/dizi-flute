import type { ReferenceDoc } from "@/shared/types";

export const reference: ReferenceDoc = {
    slug: "music-theory",
    title: "Music Theory Reference",
    description: "Cumulative theory reference by topic",
    icon: "\uD83D\uDCD6",
    content: `# Music Theory Reference

A cumulative reference of all music theory concepts covered in this course, organized by topic. Use this as a quick lookup \u2014 detailed explanations and exercises are in the individual level files.

---

## Pitch and Notes

### Jianpu Number System
| Number | Solfege | Scale Degree | Western Name (in D) | Western Name (in G) |
|--------|---------|-------------|---------------------|---------------------|
| 1 | Do | Tonic (1st) | D | G |
| 2 | Re | Supertonic (2nd) | E | A |
| 3 | Mi | Mediant (3rd) | F# | B |
| 4 | Fa | Subdominant (4th) | G | C |
| 5 | Sol | Dominant (5th) | A | D |
| 6 | La | Submediant (6th) | B | E |
| 7 | Ti | Leading tone (7th) | C# | F# |

### Octave Designations
| Notation | Name | Chinese | Register |
|----------|------|---------|----------|
| 5, (dot below) | Low octave | \u4F4E\u97F3 | Low |
| 5 (plain) | Middle octave | \u4E2D\u97F3 | Middle |
| 5' (dot above) | High octave | \u9AD8\u97F3 | High |

### Sharps and Flats
- \`#5\` = sharp 5 (raised by a half step)
- \`b7\` = flat 7 (lowered by a half step)

---

## Intervals

An interval is the distance between two notes.

| Interval | Example | Sound Character |
|----------|---------|-----------------|
| Unison | 1\u21921 | Same note |
| 2nd (step) | 1\u21922 | Smooth, adjacent |
| 3rd (skip) | 1\u21923 | Sweet, consonant |
| 4th | 1\u21924 | Open, hollow |
| 5th | 1\u21925 | Strong, stable |
| 6th | 1\u21926 | Wide, warm |
| 7th | 1\u21927 | Tense, wants to resolve |
| Octave | 1\u21921' | Same note, higher |

---

## Scales

### Major Scale (\u5927\u8C03\u97F3\u9636)
All 7 notes: \`1 2 3 4 5 6 7\`
Pattern of intervals: whole-whole-half-whole-whole-whole-half

### Chinese Pentatonic Scale \u2014 Wu Sheng (\u4E94\u58F0\u97F3\u9636)
5 notes: \`1 2 3 5 6\`

| Jianpu | Solfege | Chinese Name | Character |
|--------|---------|-------------|-----------|
| 1 | Do | \u5BAB (Gong) | Stable, home |
| 2 | Re | \u5546 (Shang) | Open |
| 3 | Mi | \u89D2 (Jue) | Gentle |
| 5 | Sol | \u5FB5 (Zhi) | Strong |
| 6 | La | \u7FBD (Yu) | Melancholic |

Notes 4 (Fa) and 7 (Ti) are omitted. This is the foundation of Chinese music for 2,500+ years.

### Chinese Heptatonic Scales \u2014 Qi Sheng (\u4E03\u58F0\u97F3\u9636)

| Type | Chinese | Scale | Character |
|------|---------|-------|-----------|
| Qingyue (\u6E05\u4E50) | \u6E05\u4E50\u97F3\u9636 | 1 2 3 4 5 6 7 | Standard, bright |
| Yayue (\u96C5\u4E50) | \u96C5\u4E50\u97F3\u9636 | 1 2 3 #4 5 6 7 | Ancient court music |
| Yanyue (\u71D5\u4E50) | \u71D5\u4E50\u97F3\u9636 | 1 2 3 4 5 6 b7 | Festive, banquet |

---

## Modes (\u8C03\u5F0F)

### The Five Pentatonic Modes

Any of the 5 pentatonic notes can be the tonic (home note), creating distinct modes:

| Mode | Tonic | Scale (from tonic) | Character | Common In |
|------|-------|--------------------|-----------|-----------|
| Gong (\u5BAB\u8C03\u5F0F) | 1 | 1 2 3 5 6 | Bright, major | Most folk songs |
| Shang (\u5546\u8C03\u5F0F) | 2 | 2 3 5 6 1' | Open, spacious | Northwest (Shaanxi) |
| Jue (\u89D2\u8C03\u5F0F) | 3 | 3 5 6 1' 2' | Gentle, tender | Jiangnan |
| Zhi (\u5FB5\u8C03\u5F0F) | 5 | 5 6 1' 2' 3' | Strong, warm | Northern folk |
| Yu (\u7FBD\u8C03\u5F0F) | 6 | 6 1' 2' 3' 5' | Sad, minor feel | Sorrow songs |

### Identifying a Mode
1. Find the last note of the piece \u2014 usually the tonic
2. Check which notes are used (pentatonic? heptatonic?)
3. Listen for the "resting" note \u2014 the note that sounds like home

### Regional Scales
| Region | Scale Characteristics |
|--------|---------------------|
| Xinjiang | Augmented 2nds (Middle Eastern influence): 1 2 b3 #4 5 6 b7 |
| Mongolia | Extended pentatonic with wide intervals |
| Cantonese | Special raised 4th interval |
| Shaanxi | Shang mode dominant, distinctive "\u82E6\u97F3" (bitter tone) |

---

## Rhythm and Meter

### Note Durations

| Duration | Beats (in 4/4) | Jianpu Notation |
|----------|----------------|-----------------|
| Whole note | 4 | \`5 - - -\` |
| Dotted half | 3 | \`5 - .\` |
| Half note | 2 | \`5 -\` |
| Dotted quarter | 1.5 | \`5.\` |
| Quarter note | 1 | \`5\` |
| Eighth note | 0.5 | Underline (printed) |
| Sixteenth note | 0.25 | Double underline (printed) |

### Rests
Same system with 0: \`0\` = quarter rest, \`0 -\` = half rest, \`0 - - -\` = whole rest

### Time Signatures

| Signature | Beats/Bar | Feel | Common In |
|-----------|-----------|------|-----------|
| 2/4 | 2 | March/folk | Chinese folk music (most common) |
| 3/4 | 3 | Waltz | Western-influenced pieces |
| 4/4 | 4 | Standard | Universal |
| 6/8 | 2 groups of 3 | Compound | Pastoral pieces |
| 5/4 | 5 | Irregular | Ethnic minority music |
| 7/8 | 7 eighth notes | Irregular | Xinjiang, modern pieces |

### Special Time Concepts
- **\u6563\u677F (Sanban)**: Free time \u2014 no fixed tempo, performer plays freely. The most important Chinese rhythmic concept.
- **Rubato**: Flexible tempo within a phrase (speed up, slow down)
- **Syncopation**: Emphasis on weak beats, creating tension

### Triplets (\u4E09\u8FDE\u97F3)
Three notes in the space of two. Marked with a bracket and "3."

---

## Musical Form and Structure

### Simple Forms
| Form | Structure | Description |
|------|-----------|-------------|
| Through-composed | A B C D... | Each section is new (e.g., many folk songs) |
| Binary (AB) | A B | Two contrasting sections |
| Ternary (ABA) | A B A | Statement, contrast, return |
| Rondo | A B A C A | Main theme returns between episodes |
| Theme & Variations | A A' A'' A'''... | Same melody, progressively transformed |

### Traditional Chinese Piece Structure
The classic **\u6563-\u6162-\u4E2D-\u5FEB-\u6563** form:

| Section | Chinese | Tempo | Character |
|---------|---------|-------|-----------|
| \u6563 (san) | \u6563\u677F | Free | Introduction, sets mood |
| \u6162 (man) | \u6162\u677F | Slow | Main melody, lyrical |
| \u4E2D (zhong) | \u4E2D\u677F | Medium | Development |
| \u5FEB (kuai) | \u5FEB\u677F | Fast | Climax, excitement |
| \u6563 (san) | \u6563\u677F | Free | Conclusion, return to calm |

Famous examples: \u59D1\u82CF\u884C, \u7267\u6C11\u65B0\u6B4C, \u6625\u5230\u6E58\u6C5F

---

## Dynamics and Expression

### Dynamic Markings
| Symbol | Italian | Chinese | Level |
|--------|---------|---------|-------|
| pp | pianissimo | \u6700\u5F31 | Very soft |
| p | piano | \u5F31 | Soft |
| mp | mezzo piano | \u4E2D\u5F31 | Moderately soft |
| mf | mezzo forte | \u4E2D\u5F3A | Moderately loud |
| f | forte | \u5F3A | Loud |
| ff | fortissimo | \u6700\u5F3A | Very loud |
| < | crescendo | \u6E10\u5F3A | Gradually louder |
| > | diminuendo/decrescendo | \u6E10\u5F31 | Gradually softer |

### Tempo Markings
| Marking | BPM | Chinese |
|---------|-----|---------|
| Largo | 40-60 | \u5E7F\u677F |
| Adagio | 60-76 | \u6162\u677F |
| Andante | 76-108 | \u884C\u677F |
| Moderato | 108-120 | \u4E2D\u677F |
| Allegro | 120-156 | \u5FEB\u677F |
| Vivace | 156-176 | \u6D3B\u677F |
| Presto | 176-200 | \u6025\u677F |
| \u6563\u677F | Free | Free time |

### Tempo Changes
| Marking | Meaning | Chinese |
|---------|---------|---------|
| rit. (ritardando) | Slow down gradually | \u6E10\u6162 |
| accel. (accelerando) | Speed up gradually | \u6E10\u5FEB |
| a tempo | Return to original speed | \u539F\u901F |
| fermata (\uD834\uDD10) | Hold note longer | \u5EF6\u957F |

---

## Articulation

| Symbol | Name | Chinese | Effect |
|--------|------|---------|--------|
| \u2022 above note | Staccato | \u65AD\u97F3/\u987F\u97F3 | Short, detached |
| \u2014 above note | Tenuto | \u4FDD\u6301\u97F3 | Full value, connected |
| > above note | Accent | \u91CD\u97F3 | Emphasized |
| \u2312 over notes | Slur/Legato | \u8FDE\u97F3 | Smooth, connected |
| T / \u5410 | Single tongue | \u5355\u5410 | "tu" attack |
| TK / \u53CC\u5410 | Double tongue | \u53CC\u5410 | "tu-ku" alternating |
| TTK / \u4E09\u5410 | Triple tongue | \u4E09\u5410 | "tu-tu-ku" pattern |

---

## Ornamentation (\u88C5\u9970\u97F3)

### Dizi-Specific Ornaments

| Chinese | Pinyin | English | Description | Execution |
|---------|--------|---------|-------------|-----------|
| \u53E0\u97F3 | di\u00E9y\u012Bn | Stacked grace | Upper neighbor grace note | Quick finger tap on hole above |
| \u6253\u97F3 | d\u01CEy\u012Bn | Percussive grace | Tonguing replacement | Quick finger tap without tonguing |
| \u8D60\u97F3 | z\u00E8ngy\u012Bn | Trailing note | Ornament at note end | Brief note added before next note |
| \u6CE2\u97F3 | b\u014Dy\u012Bn | Mordent/wave | Quick oscillation | Main\u2192upper\u2192main rapidly |
| \u98A4\u97F3 | ch\u00E0ny\u012Bn | Trill | Rapid alternation | Rapid finger movement on one hole |
| \u6ED1\u97F3 | hu\u00E1y\u012Bn | Slide/portamento | Gradual pitch change | Slide finger on/off hole |
| \u4E0A\u6ED1\u97F3 | sh\u00E0ng hu\u00E1y\u012Bn | Upward slide | Pitch rises | Gradually uncover hole |
| \u4E0B\u6ED1\u97F3 | xi\u00E0 hu\u00E1y\u012Bn | Downward slide | Pitch falls | Gradually cover hole |
| \u5386\u97F3 | l\u00ECy\u012Bn | Glissando | Rapid scale run | Fingers cascade off holes |
| \u82B1\u820C | hu\u0101sh\u00E9 | Flutter tongue | Tremolo | Rolled R while blowing |
| \u6C14\u9707\u97F3 | q\u00EC zh\u00E8ny\u012Bn | Breath vibrato | Pitch wavering | Diaphragm pulsing |
| \u6307\u98A4\u97F3 | zh\u01D0 ch\u00E0ny\u012Bn | Finger vibrato | Pitch wavering | Rapid finger near hole |

---

## Key Signatures and Transposition

### How Keys Work on Dizi
- A dizi is a **transposing instrument** \u2014 same fingering produces different pitches on different key instruments
- \`1=D\` on a D-key dizi: standard, natural fingering
- \`1=G\` on a G-key dizi: same fingering, all pitches a 4th higher
- Transposition = switching to a different key dizi

### Common Dizi Keys
| Dizi Key | Type | Character | Best For |
|----------|------|-----------|----------|
| D | Qudi | Warm, versatile | Most pieces, beginner standard |
| E | Qudi | Mellow, medium | Lyrical pieces |
| C | Qudi | Deep, rich | Southern slow pieces |
| G | Bangdi | Bright, high | Northern lively pieces |
| A | Bangdi | Very bright | Northern folk |
| F | Qudi/Bangdi | Medium | Versatile |

### Alternative Fingering Systems
| System | All-Holes-Closed = | Use Case |
|--------|-------------------|----------|
| \u7B52\u97F3\u4F5C5 | Sol (5) | Standard, most common |
| \u7B52\u97F3\u4F5C2 | Re (2) | Playing in a key a 4th above |
| \u7B52\u97F3\u4F5C1 | Do (1) | Playing in a key a 5th above |
| \u7B52\u97F3\u4F5C6 | La (6) | Minor key pieces |

---

## Northern vs Southern Styles

| Aspect | Northern (\u5317\u6D3E) | Southern (\u5357\u6D3E) |
|--------|-----------------|--------------------|
| Instrument | Bangdi (\u6886\u7B1B) \u2014 G, A key | Qudi (\u66F2\u7B1B) \u2014 C, D, E key |
| Character | Bright, energetic, percussive | Mellow, lyrical, flowing |
| Key techniques | Double/triple tonguing, \u82B1\u820C, staccato | Vibrato, slides, legato, breath control |
| Ornament style | Tonguing-dominant | Breath vibrato-dominant |
| Representative pieces | \u559C\u76F8\u9022, \u4E94\u6886\u5B50, \u626C\u97AD\u50AC\u9A6C\u8FD0\u7CAE\u5FD9 | \u59D1\u82CF\u884C, \u9E67\u9E44\u98DE, \u7267\u7B1B |
| Regions | Northeast, North China, Northwest | Jiangnan, South China |
| Emotion | Joy, celebration, vigor | Elegance, longing, introspection |

---

## Ensemble Concepts

### Heterophony (\u652F\u58F0)
The primary texture in Chinese ensemble music. Multiple instruments play the same melody simultaneously, each adding their own ornamental variations. This is different from Western harmony where instruments play different notes.

### Common Ensemble Types
| Ensemble | Chinese | Instruments |
|----------|---------|-------------|
| Silk and Bamboo | \u4E1D\u7AF9 | Dizi, erhu, pipa, zhongruan, yangqin |
| Chinese Orchestra | \u6C11\u65CF\u7BA1\u5F26\u4E50\u56E2 | Full orchestra with Chinese instruments |
| Wind Ensemble | \u5439\u6253 | Dizi, sheng, suona + percussion |

---

## Chinese Music Aesthetics

### Core Concepts (Advanced)
| Concept | Chinese | Meaning |
|---------|---------|---------|
| Yi Jing | \u610F\u5883 | Artistic conception \u2014 the world a piece creates |
| Qi Yun | \u6C14\u97F5 | Spirit resonance \u2014 life energy in the music |
| Xu Shi | \u865A\u5B9E | Empty and full \u2014 interplay of silence and sound |
| Liu Bai | \u7559\u767D | Leaving white \u2014 what you don't play matters |

These concepts connect dizi playing to broader Chinese artistic philosophy shared with calligraphy, painting, and poetry.

---

## Historical Context

### Notation Systems
| System | Era | Type |
|--------|-----|------|
| Gong-chi (\u5DE5\u5C3A\u8C31) | Song Dynasty onward | Character-based, still seen in traditional texts |
| Jianpu (\u7B80\u8C31) | 20th century | Number-based, standard today |
| Staff notation (\u4E94\u7EBF\u8C31) | Western import | Used in orchestral scores |

### The Dizi in Chinese Music History
- Ancient bone flutes found dating back 9,000 years (Jiahu, Henan)
- Bamboo dizi standardized during Han Dynasty (~200 BCE)
- Dimo (membrane) added during Tang Dynasty (~600 CE)
- Northern/southern style split formalized in 20th century
- Modern virtuoso era: 1950s-present, with conservatory training

---

## Quick Reference: Which Level Covers What

| Topic | Level |
|-------|-------|
| Jianpu basics, 4/4 time | Level 0 |
| Beats, tempo, BPM, repeat signs | Level 1 |
| 2/4 time, eighth notes, pentatonic (wu sheng) | Level 2 |
| 3/4 time, dotted notes, ties/slurs, dynamics, heptatonic (qi sheng), AB form | Level 3 |
| Sixteenth notes, triplets, syncopation, 6/8, ornament theory, ABA form, transposition | Level 4 |
| Mixed meter, \u6563\u677F, \u6563\u6162\u4E2D\u5FEB\u6563 structure, N/S styles, modulation, heterophony | Level 5 |
| Irregular meters, 5 pentatonic modes, regional scales, rondo, score analysis | Level 6 |
| Contemporary techniques, aesthetics (\u610F\u5883/\u6C14\u97F5), masterwork analysis | Level 7 |`,
  };
