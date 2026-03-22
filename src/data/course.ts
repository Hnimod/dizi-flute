import type { Course } from "@/shared/types";

export const course: Course = {
  title: "Dizi Flute Learning Course",
  philosophy: [
    "Consistency > Duration \u2014 30 min daily beats 3 hours on weekends",
    "Slow practice is fast learning \u2014 Always learn passages slowly first, speed up with metronome",
    "Record yourself weekly \u2014 You can\u2019t hear yourself accurately while playing",
    "Long tones are non-negotiable \u2014 Do them every session, forever",
    "Relax \u2014 Tension in shoulders, jaw, fingers, stomach = poor tone and fatigue",
    "Blow across, not into \u2014 Air stream splits across the far edge of the blowing hole",
  ],
  dailyPractice: [
    {
      duration: "5 min",
      activity: "Breathing",
      notes: "Diaphragmatic breathing, 4-count in, long exhale",
    },
    {
      duration: "8 min",
      activity: "Long tones",
      notes:
        "Every note you know, steady tone. Add vibrato from Level 4",
    },
    {
      duration: "7 min",
      activity: "Scales & tonguing",
      notes: "Major, pentatonic, various articulations",
    },
    {
      duration: "5 min",
      activity: "Technique drill",
      notes: "Current focus: ornaments, double tongue, etc.",
    },
    {
      duration: "10 min",
      activity: "Repertoire",
      notes:
        "Current piece(s) \u2014 slow practice first, then tempo",
    },
  ],
  milestones: [
    {
      timeframe: "Week 4",
      description: "Produce tone on demand, play notes 1-5",
    },
    {
      timeframe: "Week 8",
      description:
        "Play 2 simple songs from memory, read basic jianpu",
    },
    {
      timeframe: "Month 4",
      description:
        "Play 5+ songs with both octaves, beginning ornaments",
    },
    {
      timeframe: "Month 7",
      description:
        "Playing sounds authentically Chinese with vibrato and ornaments, 8-10 pieces",
    },
    {
      timeframe: "Month 12",
      description:
        "15+ pieces, CCOM Grade 3-5 comfortable, solid fundamentals",
    },
    {
      timeframe: "Year 2",
      description:
        "20+ pieces, CCOM Grade 5-7, multiple dizi keys, developing personal style",
    },
    {
      timeframe: "Year 3+",
      description:
        "Concert-level playing, CCOM Grade 7-9, artistic voice",
    },
  ],
};
