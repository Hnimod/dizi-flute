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
  levelId: number;
  titleChinese?: string;
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
}

export interface Technique {
  id: string;
  name: string;
  category: "fundamentals" | "articulation" | "ornaments" | "breathing" | "fingering" | "advanced";
  level: number;
  description: string;
  exerciseIds: string[];
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
