import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Lesson, UserProgress } from '../types';
import { lessons } from '../data/lessons';

interface AppContextType {
  appState: AppState;
  startLesson: (lesson: Lesson) => void;
  nextExercise: () => void;
  submitAnswer: (answer: string) => boolean;
  completeLesson: () => void;
  resetLesson: () => void;
  loseHeart: () => void;
  userProgress: UserProgress;
  lessons: Lesson[];
}

const initialProgress: UserProgress = {
  completedLessons: [],
  totalXP: 0,
  hearts: 5,
  currentStreak: 0,
  level: 1,
};

const initialState: AppState = {
  currentLesson: null,
  currentExerciseIndex: 0,
  userProgress: initialProgress,
  showResults: false,
  sessionCorrect: 0,
  sessionIncorrect: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState<AppState>(initialState);
  const [userProgress, setUserProgress] = useState<UserProgress>(initialProgress);
  const [lessonsState, setLessonsState] = useState(lessons);

  const startLesson = (lesson: Lesson) => {
    setAppState({
      currentLesson: lesson,
      currentExerciseIndex: 0,
      userProgress,
      showResults: false,
      sessionCorrect: 0,
      sessionIncorrect: 0,
    });
  };

  const nextExercise = () => {
    if (!appState.currentLesson) return;

    if (appState.currentExerciseIndex < appState.currentLesson.exercises.length - 1) {
      setAppState(prev => ({
        ...prev,
        currentExerciseIndex: prev.currentExerciseIndex + 1,
      }));
    } else {
      setAppState(prev => ({ ...prev, showResults: true }));
    }
  };

  const submitAnswer = (answer: string): boolean => {
    if (!appState.currentLesson) return false;

    const currentExercise = appState.currentLesson.exercises[appState.currentExerciseIndex];
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedCorrect = currentExercise.correctAnswer.trim().toLowerCase();

    const isCorrect = normalizedAnswer === normalizedCorrect;

    setAppState(prev => ({
      ...prev,
      sessionCorrect: isCorrect ? prev.sessionCorrect + 1 : prev.sessionCorrect,
      sessionIncorrect: !isCorrect ? prev.sessionIncorrect + 1 : prev.sessionIncorrect,
    }));

    return isCorrect;
  };

  const completeLesson = () => {
    if (!appState.currentLesson) return;

    const lessonId = appState.currentLesson.id;
    const xpGained = appState.currentLesson.xpReward;

    setUserProgress(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      totalXP: prev.totalXP + xpGained,
      level: Math.floor((prev.totalXP + xpGained) / 50) + 1,
    }));

    // Unlock next lesson
    setLessonsState(prev => prev.map((lesson, index) => {
      if (lesson.id === lessonId) {
        return { ...lesson, completed: true };
      }
      // Unlock next lesson if current is completed
      const currentIndex = prev.findIndex(l => l.id === lessonId);
      if (index === currentIndex + 1) {
        return { ...lesson, unlocked: true };
      }
      return lesson;
    }));
  };

  const resetLesson = () => {
    setAppState(prev => ({
      ...prev,
      currentLesson: null,
      currentExerciseIndex: 0,
      showResults: false,
      sessionCorrect: 0,
      sessionIncorrect: 0,
    }));
  };

  const loseHeart = () => {
    setUserProgress(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        startLesson,
        nextExercise,
        submitAnswer,
        completeLesson,
        resetLesson,
        loseHeart,
        userProgress,
        lessons: lessonsState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
