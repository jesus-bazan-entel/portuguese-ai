import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { TranslationExercise } from '../components/TranslationExercise';
import { MultipleChoiceExercise } from '../components/MultipleChoiceExercise';
import { FillInBlankExercise } from '../components/FillInBlankExercise';
import { ExerciseFeedback } from '../components/ExerciseFeedback';
import { Button } from '../components/Button';

export function LessonPage() {
  const { appState, nextExercise, submitAnswer, resetLesson, loseHeart, userProgress } = useApp();
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  if (!appState.currentLesson) {
    return null;
  }

  if (appState.showResults) {
    return <LessonResults />;
  }

  const currentExercise = appState.currentLesson.exercises[appState.currentExerciseIndex];
  const progress = ((appState.currentExerciseIndex + 1) / appState.currentLesson.exercises.length) * 100;

  const handleSubmit = (answer: string) => {
    const correct = submitAnswer(answer);
    setIsCorrect(correct);
    setUserAnswer(answer);
    setShowFeedback(true);

    if (!correct && userProgress.hearts > 0) {
      loseHeart();
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    nextExercise();
  };

  const handleQuit = () => {
    if (confirm('¿Estás seguro de que quieres salir? Perderás tu progreso.')) {
      resetLesson();
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Top progress bar - Mobile optimized */}
      <div className="bg-white border-b-2 border-gray-200 px-3 py-3 md:p-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Exit button - Touch friendly */}
            <button
              onClick={handleQuit}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl hover:bg-gray-100 active:bg-gray-200 text-gray-600 font-bold text-xl transition-colors flex-shrink-0"
              aria-label="Salir"
            >
              ✕
            </button>

            {/* Progress bar */}
            <div className="flex-1">
              <div className="mb-1 text-xs md:text-sm text-gray-500 font-semibold">
                Pregunta {appState.currentExerciseIndex + 1}/{appState.currentLesson.exercises.length}
              </div>
              <ProgressBar progress={progress} />
            </div>

            {/* Hearts - Larger on mobile */}
            <div className="flex items-center gap-1.5 md:gap-2 bg-red-50 px-3 md:px-4 py-2 md:py-2.5 rounded-xl border-2 border-red-200 flex-shrink-0">
              <span className="text-2xl md:text-3xl">❤️</span>
              <span className="font-black text-red-500 text-lg md:text-xl">{userProgress.hearts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise content - Mobile optimized spacing */}
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <div className="min-h-[60vh] flex flex-col">
          {currentExercise.type === 'translation' && (
            <TranslationExercise exercise={currentExercise} onSubmit={handleSubmit} />
          )}
          {currentExercise.type === 'multipleChoice' && (
            <MultipleChoiceExercise exercise={currentExercise} onSubmit={handleSubmit} />
          )}
          {currentExercise.type === 'fillInBlank' && (
            <FillInBlankExercise exercise={currentExercise} onSubmit={handleSubmit} />
          )}
        </div>
      </div>

      {showFeedback && (
        <ExerciseFeedback
          isCorrect={isCorrect}
          exercise={currentExercise}
          userAnswer={userAnswer}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}

function LessonResults() {
  const { appState, completeLesson, resetLesson } = useApp();

  if (!appState.currentLesson) return null;

  const totalExercises = appState.currentLesson.exercises.length;
  const accuracy = Math.round((appState.sessionCorrect / totalExercises) * 100);

  const handleComplete = () => {
    completeLesson();
    resetLesson();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main results card - Mobile optimized */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center border-2 border-gray-100">
          {/* Trophy - Responsive size */}
          <div className="text-6xl md:text-7xl mb-4 md:mb-6 animate-bounce">
            {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '⭐' : '💪'}
          </div>

          {/* Title - Responsive text */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
            {accuracy >= 80 ? '¡Excelente trabajo!' : accuracy >= 60 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
          </h1>

          {/* Lesson title */}
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            {appState.currentLesson.title}
          </p>

          {/* Stats grid - Touch friendly spacing */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-green-50 rounded-2xl p-3 md:p-4 border-2 border-green-200">
              <div className="text-2xl md:text-3xl mb-1">✅</div>
              <div className="text-xl md:text-2xl font-bold text-green-600">{appState.sessionCorrect}</div>
              <div className="text-xs text-gray-600 font-medium">Correctas</div>
            </div>

            <div className="bg-red-50 rounded-2xl p-3 md:p-4 border-2 border-red-200">
              <div className="text-2xl md:text-3xl mb-1">❌</div>
              <div className="text-xl md:text-2xl font-bold text-red-600">{appState.sessionIncorrect}</div>
              <div className="text-xs text-gray-600 font-medium">Incorrectas</div>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-3 md:p-4 border-2 border-yellow-300">
              <div className="text-2xl md:text-3xl mb-1">⭐</div>
              <div className="text-xl md:text-2xl font-bold text-yellow-600">+{appState.currentLesson.xpReward}</div>
              <div className="text-xs text-gray-600 font-medium">XP</div>
            </div>
          </div>

          {/* Accuracy - Large and prominent */}
          <div className="mb-6 md:mb-8 bg-blue-50 rounded-2xl p-5 md:p-6 border-2 border-blue-200">
            <div className="text-xs md:text-sm font-bold text-blue-700 mb-1 md:mb-2">PRECISIÓN</div>
            <div className="text-4xl md:text-5xl font-bold text-blue-600">{accuracy}%</div>
          </div>

          {/* Continue button - Touch friendly */}
          <Button
            onClick={handleComplete}
            fullWidth
            variant="success"
            className="text-base md:text-lg py-4 md:py-5 font-bold"
          >
            Continuar →
          </Button>
        </div>
      </div>
    </div>
  );
}
