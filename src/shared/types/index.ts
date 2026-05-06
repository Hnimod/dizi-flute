export interface Course {
  title: string;
  philosophy: string[];
  dailyPractice: PracticeSlot[];
  milestones: Milestone[];
}

export interface PracticeSlot {
  duration: string;
  activity: string;
  notes: string;
}

export interface Milestone {
  timeframe: string;
  description: string;
}

export interface Level {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  timeline: string;
  ccomGrade: string;
  sections: LevelSection[];
}

export interface LevelSection {
  id: string;
  title: string;
  content: string;
  items: (Song | Exercise)[];
}

export interface Song {
  id: string;
  type: "song";
  difficulty: number;
  difficultyNote?: string;
  titleChinese?: string;
  titlePinyin?: string;
  titleVietnamese?: string;
  titleEnglish: string;
  key: string;
  timeSignature: string;
  tempo?: number;
  jianpu: string;
  description?: string;
  videoUrl?: string;
  videoUrls?: string[];
  origin?: string;
  techniques?: string[];
  sheetImage?: string;
  abc?: string;
  /** Solfège name of the all-holes-covered note in the source jianpu (筒音作 X). Defaults to "Sol". */
  sourceTongyin?: Tongyin;
  /** Octave that digit 1 (Do) sits in on the staff. Default 4 (= middle C for C major).
   *  Songs notated for higher dizi register may use 5 to anchor the staff one octave higher. */
  staffBaseOctave?: number;
}

/** Solfège name for a tongyin (筒音作) — which scale degree the all-holes-covered note represents. */
export type Tongyin = "Do" | "Re" | "Mi" | "Sol" | "La";

/** Map from solfège name to scale degree (1-7). */
export const TONGYIN_TO_DIGIT: Record<Tongyin, number> = {
  Do: 1,
  Re: 2,
  Mi: 3,
  Sol: 5,
  La: 6,
};

export interface Technique {
  id: string;
  name: string;
  category: "fundamentals" | "articulation" | "ornaments" | "breathing" | "fingering" | "advanced";
  level: number;
  description: string;
  content: string;
  notationExample?: string;
  referenceSlug?: string;
}

export interface Exercise {
  id: string;
  type: "exercise";
  levelId: number;
  title: string;
  key: string;
  timeSignature: string;
  tempo?: number;
  jianpu: string;
  description?: string;
  videoUrl?: string;
}

export interface ReferenceDoc {
  slug: string;
  title: string;
  description: string;
  content: string;
  icon: string;
}

export interface UserProgress {
  completedItems: Record<string, boolean>;
  currentLevel: number;
  lastVisited: string;
}
