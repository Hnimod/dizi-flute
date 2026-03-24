import type { Level, Song, Exercise } from "@/shared/types";
import { exercises as staticExercises } from "./exercises";
import { songs as staticSongs } from "./songs";

export function buildLevels(
  songs: Song[] = staticSongs,
  exercises: Exercise[] = staticExercises,
): Level[] {
  const exercisesForLevel = (levelId: number) =>
    exercises.filter((e) => e.levelId === levelId);
  const songsForLevel = (levelId: number) =>
    songs.filter((s) => s.levelId === levelId);

  return [
  {
    id: 0,
    slug: "setup",
    title: "Setup and Foundations",
    subtitle: "Equipment, jianpu notation, breathing",
    timeline: "Week 0",
    ccomGrade: "\u2014",
    sections: [
      {
        id: "level-0-buying",
        title: "Buy Your First Dizi",
        content:
          "**Recommended:** D-key, bitter bamboo (\u82E6\u7AF9), two-piece construction \u2014 ~$30-60 USD\n\nYour dizi should come with: spare dimo membranes, erjiao glue (\u963F\u80F6), carrying case.\n\n**Avoid:** C-key (too long for beginner hand span), cheap instruments under $15 (intonation problems), one-piece construction (more prone to cracking).",
        items: [],
      },
      {
        id: "level-0-dimo",
        title: "Learn to Apply the Dimo (Membrane)",
        content:
          "The dimo (\u7B1B\u819C) is a thin bamboo membrane that gives the dizi its distinctive buzzing resonance. It's what makes a dizi sound like a dizi.\n\n**Beginner shortcut:** Tape over the membrane hole with clear tape initially. This removes the dimo variable while you focus on basic tone production. Switch to real dimo after 2-3 weeks.",
        items: [],
      },
      {
        id: "level-0-posture",
        title: "Posture and Hand Position",
        content:
          "1. Standing or sitting upright \u2014 shoulders relaxed, spine straight\n2. Hold dizi to the right \u2014 blow hole to the left\n3. Left hand closer to blow hole (holes 6, 5, 4), right hand farther (holes 3, 2, 1)\n4. Use finger pads, not tips \u2014 fleshy part gives a better seal\n5. Fingers curved naturally \u2014 not flat, not tense\n6. Elbows relaxed",
        items: [],
      },
      {
        id: "level-0-breathing",
        title: "Diaphragmatic Breathing (\u8179\u5F0F\u547C\u5438)",
        content:
          "This is the foundation of all wind instrument playing. You must breathe from your belly, not your chest.\n\n1. Lie on your back or stand with one hand on your stomach\n2. **Inhale through your mouth**: Your stomach should expand outward. Chest stays relatively still.\n3. **Exhale slowly**: Your stomach contracts inward. Maintain steady, controlled airflow.\n4. Practice: Inhale for 4 counts, exhale for 8 counts. Gradually increase exhale to 12, then 16 counts.",
        items: [],
      },
      {
        id: "level-0-jianpu",
        title: "Introduction to Jianpu (\u7B80\u8C31)",
        content:
          'Jianpu (literally "simple notation") is the standard way Chinese music is written. It\'s a numbered musical notation system \u2014 simpler than Western staff notation and perfectly suited for dizi.\n\nEach number represents a note in the scale: 1 (Do), 2 (Re), 3 (Mi), 4 (Fa), 5 (Sol), 6 (La), 7 (Ti), 0 (Rest).\n\nSee the [Jianpu Guide](/reference/jianpu-guide) for the complete reference.',
        items: [],
      },
      {
        id: "level-0-exercises",
        title: "Rhythm Clapping Exercises",
        content:
          "Before picking up the dizi, practice reading jianpu rhythm by clapping. Clap on each note, hold through dashes.",
        items: exercisesForLevel(0),
      },
    ],
  },
  {
    id: 1,
    slug: "first-sounds",
    title: "First Sounds",
    subtitle: "Tone production, notes 1-5, basic rhythm",
    timeline: "Weeks 1-4",
    ccomGrade: "Pre-Grade",
    sections: [
      {
        id: "level-1-theory",
        title: "Music Theory for This Level",
        content:
          "Music is organized into beats \u2014 steady pulses like a heartbeat. In 4/4 time, you count: **1 - 2 - 3 - 4**.\n\n**Tempo** is how fast the beats go, measured in BPM (beats per minute). Start at 60 BPM for everything at this level.\n\nUse a metronome app (Soundbrenner, free) to keep steady time.",
        items: [],
      },
      {
        id: "level-1-making-tone",
        title: "Making a Tone",
        content:
          "### The Bottle Exercise (5 min daily)\nBlow across an empty glass bottle. When you hear a tone, you've found the concept \u2014 this is exactly how dizi works.\n\n### Embouchure (\u53E3\u5F62)\n1. Say \"pu\" \u2014 that lip shape is your starting point\n2. Think \"cooling hot soup\" \u2014 gentle, focused air stream\n3. Lower lip covers about 1/4 of the blow hole\n4. Air stream hits the far edge of the blow hole\n5. Small aperture (opening between lips) \u2014 not wide open",
        items: [],
      },
      {
        id: "level-1-fingerings",
        title: "D-Key Dizi Fingering \u2014 Notes 1 to 5",
        content:
          "The standard fingering system is called **\u7B52\u97F3\u4F5C5** (all-holes-closed = Sol).\n\n| Note | Jianpu | Holes: 6 5 4 3 2 1 |\n|------|--------|---------------------|\n| Do | 1 | \u25CF \u25CF \u25CF \u25CB \u25CB \u25CB |\n| Re | 2 | \u25CF \u25CF \u25CB \u25CB \u25CB \u25CB |\n| Mi | 3 | \u25CF \u25CB \u25CB \u25CB \u25CB \u25CB |\n| Fa | 4 | \u25CB \u25CF \u25CF \u25CB \u25CB \u25CB |\n| Sol | 5 | \u25CF \u25CF \u25CF \u25CF \u25CF \u25CF (overblow) |",
        items: [],
      },
      {
        id: "level-1-exercises",
        title: "Exercises in Jianpu",
        content: "",
        items: exercisesForLevel(1),
      },
      {
        id: "level-1-songs",
        title: "Songs in Jianpu",
        content: "",
        items: songsForLevel(1),
      },
    ],
  },
  {
    id: 2,
    slug: "first-songs",
    title: "First Songs",
    subtitle: "Full scale, pentatonic theory, simple songs",
    timeline: "Weeks 5-8",
    ccomGrade: "Grade 1",
    sections: [
      {
        id: "level-2-theory",
        title: "Music Theory for This Level",
        content:
          "### 2/4 Time Signature\nMost Chinese folk music is written in **2/4 time** \u2014 two beats per measure.\n\n### The Pentatonic Scale \u2014 Wu Sheng (\u4E94\u58F0)\nThe most important concept in Chinese music. Uses only 5 notes: **1 2 3 5 6** (Do Re Mi Sol La). Notes 4 (Fa) and 7 (Ti) are not used. This 5-note system is over 2,500 years old.",
        items: [],
      },
      {
        id: "level-2-fingerings",
        title: "New Fingerings: Complete First Octave and Beyond",
        content:
          "You now learn the full range from low 5, through high 1'. **Overblowing:** Notes 5, 6, 7, and high 1' use the same fingerings as 5,, 6,, 7,, and 1 but with increased air speed.",
        items: [],
      },
      {
        id: "level-2-exercises",
        title: "Exercises in Jianpu",
        content: "",
        items: exercisesForLevel(2),
      },
      {
        id: "level-2-songs",
        title: "Songs in Jianpu",
        content: "",
        items: songsForLevel(2),
      },
    ],
  },
  {
    id: 3,
    slug: "folk-repertoire",
    title: "Folk Repertoire",
    subtitle: "Chinese folk songs, dynamics, two octaves",
    timeline: "Months 3-4",
    ccomGrade: "Grade 1-2",
    sections: [
      {
        id: "level-3-theory",
        title: "Music Theory for This Level",
        content:
          "### 3/4 Time Signature\nThree beats per measure, with emphasis on beat 1: **ONE** two three.\n\n### Dotted Notes (\u9644\u70B9\u97F3\u7B26)\nA dot after a note extends it by half its original value.\n\n### Dynamics (\u529B\u5EA6\u8BB0\u53F7)\nDynamics tell you how loud or soft to play: pp (very soft) through ff (very loud).\n\n### Grace Notes (\u88C5\u9970\u97F3)\nQuick, ornamental notes played just before the main note. They add the characteristic \"Chinese\" flavor to dizi playing.",
        items: [],
      },
      {
        id: "level-3-exercises",
        title: "Exercises in Jianpu",
        content: "",
        items: exercisesForLevel(3),
      },
      {
        id: "level-3-songs",
        title: "Songs in Jianpu",
        content: "",
        items: songsForLevel(3),
      },
    ],
  },
  {
    id: 4,
    slug: "expression",
    title: "Expression and Technique",
    subtitle: "Vibrato, double tonguing, ornaments",
    timeline: "Months 5-7",
    ccomGrade: "Grade 2-3",
    sections: [
      {
        id: "level-4-theory",
        title: "Music Theory for This Level",
        content:
          "### Sixteenth Notes (\u5341\u516D\u5206\u97F3\u7B26)\nFour sixteenth notes = one beat.\n\n### Triplets (\u4E09\u8FDE\u97F3)\nThree notes played in the space of two. Creates a \"rolling\" feel.\n\n### Ornamentation Theory\nOrnaments are what make dizi sound authentically Chinese. Core ornaments: \u6253\u97F3 (percussive grace), \u53E0\u97F3 (stacked grace), \u8D60\u97F3 (trailing note), \u6CE2\u97F3 (mordent), \u5386\u97F3 (glissando).",
        items: [],
      },
      {
        id: "level-4-techniques",
        title: "New Techniques",
        content:
          "### Breath Vibrato (\u6C14\u9707\u97F3)\nTHE signature expressive technique of dizi. Gently pulse your diaphragm to make notes shimmer.\n\n### Double Tonguing (\u53CC\u5410)\nAlternate \"tu-ku-tu-ku\" for faster passages.\n\n### Trills (\u98A4\u97F3)\nRapid alternation between two adjacent notes.\n\n### Beginning Slides (\u6ED1\u97F3)\nGradually slide finger on/off a hole for smooth pitch changes.\n\n### Flutter Tongue (\u82B1\u820C)\nRolled \"R\" while blowing creates a tremolo/buzzing effect.",
        items: [],
      },
      {
        id: "level-4-exercises",
        title: "Exercises in Jianpu",
        content: "",
        items: exercisesForLevel(4),
      },
      {
        id: "level-4-songs",
        title: "Songs in Jianpu",
        content: "",
        items: songsForLevel(4),
      },
    ],
  },
  {
    id: 5,
    slug: "intermediate-repertoire",
    title: "Intermediate Repertoire",
    subtitle: "Graded pieces, northern/southern styles",
    timeline: "Months 8-12",
    ccomGrade: "Grade 3-5",
    sections: [
      {
        id: "level-5-theory",
        title: "Music Theory for This Level",
        content:
          "### \u6563\u677F (Sanban \u2014 Free Time)\nNo fixed tempo, performer plays freely. Very common in Chinese music.\n\n### Traditional Chinese Piece Structure\n\u6563-\u6162-\u4E2D-\u5FEB-\u6563: Free introduction \u2192 Slow melody \u2192 Medium development \u2192 Fast climax \u2192 Free conclusion.\n\n### Northern vs Southern Dizi Styles\nNorthern (\u5317\u6D3E): Bright, energetic, bangdi, double tonguing. Southern (\u5357\u6D3E): Mellow, lyrical, qudi, vibrato and slides.",
        items: [],
      },
      {
        id: "level-5-exercises",
        title: "Exercises in Jianpu",
        content: "",
        items: exercisesForLevel(5),
      },
      {
        id: "level-5-songs",
        title: "Songs in Jianpu",
        content: "",
        items: songsForLevel(5),
      },
    ],
  },
  {
    id: 6,
    slug: "advancing",
    title: "Advancing",
    subtitle: "Multi-key playing, modal theory, concert pieces",
    timeline: "Year 2",
    ccomGrade: "Grade 5-7",
    sections: [
      {
        id: "level-6-theory",
        title: "Music Theory for This Level",
        content:
          "### The Five Pentatonic Modes\nEach pentatonic note can serve as the tonic: Gong (\u5BAB, 1=bright), Shang (\u5546, 2=open), Jue (\u89D2, 3=gentle), Zhi (\u5FB5, 5=strong), Yu (\u7FBD, 6=melancholic).\n\n### Regional Scales\nXinjiang scales use augmented 2nds (Middle Eastern influence). Mongolian long song uses wide intervals. Cantonese scale has a special raised 4th.",
        items: [],
      },
      {
        id: "level-6-techniques",
        title: "New Techniques",
        content:
          "### Circular Breathing Refinement\nWorking toward musical application.\n\n### Multi-Key Playing\nOwn 2-3 dizis (D, G, and possibly C or E). Same fingerings, different pitches.\n\n### Half-Holing for Chromatic Notes\nPartially revealing a hole for notes between standard scale degrees.\n\n### Harmonics (\u6CDB\u97F3)\nSpecial fingerings + embouchure to produce overtone pitches.",
        items: [],
      },
      {
        id: "level-6-songs",
        title: "Songs in Jianpu",
        content: "",
        items: songsForLevel(6),
      },
    ],
  },
  {
    id: 7,
    slug: "advanced",
    title: "Advanced",
    subtitle: "Concert repertoire, artistry, mastery",
    timeline: "Year 2-3+",
    ccomGrade: "Grade 7-9",
    sections: [
      {
        id: "level-7-theory",
        title: "Music Theory for This Level",
        content:
          "### Contemporary Chinese Composition Techniques\nExtended techniques: multiphonics, key clicks, air sounds, singing while playing.\n\n### Aesthetics of Chinese Music\n- **\u610F\u5883 (Yi Jing)**: The intangible \"world\" a piece creates\n- **\u6C14\u97F5 (Qi Yun)**: Vitality and life-energy flowing through the music\n- **\u865A\u5B9E (Xu Shi)**: Interplay of silence and sound\n- **\u7559\u767D (Liu Bai)**: What you don't play is as important as what you do",
        items: [],
      },
      {
        id: "level-7-techniques",
        title: "Advanced Techniques",
        content:
          "### Multiphonics\nPlaying two notes simultaneously.\n\n### Throat Vibrato (\u5589\u632F\u97F3)\nVibrato produced by pulsing the throat/glottis.\n\n### Extended Range\nPushing beyond the standard range through harmonic fingerings.",
        items: [],
      },
      {
        id: "level-7-songs",
        title: "Repertoire in Jianpu",
        content: "",
        items: songsForLevel(7),
      },
    ],
  },
  ];
}

// Static export for backward compatibility (uses hardcoded data)
export const levels: Level[] = buildLevels();
