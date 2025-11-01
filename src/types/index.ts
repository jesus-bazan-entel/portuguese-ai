export type ExerciseType = 'translation' | 'multipleChoice' | 'fillInBlank' | 'matching' | 'listening';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  prompt?: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  audioUrl?: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  xpReward: number;
  level: number;
  unlocked: boolean;
  completed: boolean;
}

export interface UserProgress {
  completedLessons: string[];
  totalXP: number;
  hearts: number;
  currentStreak: number;
  level: number;
}

export interface AppState {
  currentLesson: Lesson | null;
  currentExerciseIndex: number;
  userProgress: UserProgress;
  showResults: boolean;
  sessionCorrect: number;
  sessionIncorrect: number;
}
