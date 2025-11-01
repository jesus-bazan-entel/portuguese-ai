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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 pb-32">
      {/* Top progress bar - Mobile optimized */}
      <div className="bg-white border-b-2 border-gray-200 px-3 py-3 md:p-4 sticky top-0 z-40 shadow-md">
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating celebration elements */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">🎊</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse">⭐</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-bounce">✨</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-pulse">🎯</div>

      <div className="max-w-lg w-full relative z-10">
        {/* Main results card - Mobile optimized */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center border-b-8 border-yellow-400">
          {/* Trophy - Responsive size with glow */}
          <div className="relative inline-block mb-4 md:mb-6">
            <div className="text-7xl md:text-8xl mb-2 animate-bounce">
              {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '⭐' : '💪'}
            </div>
            {accuracy >= 80 && (
              <>
                <div className="absolute top-0 left-0 text-4xl animate-ping">✨</div>
                <div className="absolute top-0 right-0 text-4xl animate-pulse">🎉</div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-400 opacity-30 blur-2xl rounded-full" />
              </>
            )}
          </div>

          {/* Title - Responsive text */}
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-2 md:mb-3">
            {accuracy >= 80 ? '¡Excelente trabajo!' : accuracy >= 60 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
          </h1>

          {/* Lesson title */}
          <p className="text-base md:text-lg text-gray-600 font-bold mb-6 md:mb-8">
            {appState.currentLesson.title}
          </p>

          {/* Stats grid - Touch friendly spacing */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-3 md:p-4 border-b-4 border-green-400 shadow-lg hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl mb-1">✅</div>
              <div className="text-2xl md:text-3xl font-black text-green-600">{appState.sessionCorrect}</div>
              <div className="text-xs font-bold text-gray-600">Correctas</div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-3 md:p-4 border-b-4 border-red-400 shadow-lg hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl mb-1">❌</div>
              <div className="text-2xl md:text-3xl font-black text-red-600">{appState.sessionIncorrect}</div>
              <div className="text-xs font-bold text-gray-600">Incorrectas</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-3 md:p-4 border-b-4 border-yellow-400 shadow-lg hover:scale-105 transition-transform animate-pulse">
              <div className="text-3xl md:text-4xl mb-1">⭐</div>
              <div className="text-2xl md:text-3xl font-black text-yellow-600">+{appState.currentLesson.xpReward}</div>
              <div className="text-xs font-bold text-gray-600">XP</div>
            </div>
          </div>

          {/* Accuracy - Large and prominent */}
          <div className="mb-6 md:mb-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-5 md:p-6 border-b-4 border-blue-400 shadow-xl">
            <div className="text-xs md:text-sm font-black text-blue-800 mb-1 md:mb-2 tracking-wider">PRECISIÓN</div>
            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">{accuracy}%</div>
          </div>

          {/* Continue button - Touch friendly */}
          <Button
            onClick={handleComplete}
            fullWidth
            variant="success"
            className="text-base md:text-xl py-5 md:py-6 font-black shadow-2xl hover:scale-105 transition-transform"
          >
            ¡Continuar aprendiendo! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}
