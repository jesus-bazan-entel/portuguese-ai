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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 pb-32">
      {/* Top progress bar */}
      <div className="bg-white/90 backdrop-blur-sm shadow-xl p-4 border-b-4 border-blue-500">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={handleQuit}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xl transition-all hover:scale-110"
            >
              ✕
            </button>
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full border-2 border-red-300">
              <span className="text-2xl">❤️</span>
              <span className="font-black text-red-600 text-lg">{userProgress.hearts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise card */}
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-white">
          {/* Exercise counter */}
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-black text-sm shadow-lg">
              Pregunta {appState.currentExerciseIndex + 1} de {appState.currentLesson.exercises.length}
            </div>
          </div>

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Confetti effect */}
        {accuracy >= 80 && (
          <div className="fixed inset-0 pointer-events-none">
            <div className="text-6xl absolute top-10 left-10 animate-bounce">🎊</div>
            <div className="text-6xl absolute top-20 right-20 animate-pulse">✨</div>
            <div className="text-6xl absolute bottom-32 left-32 animate-spin-slow">🌟</div>
            <div className="text-6xl absolute bottom-20 right-16 animate-bounce">🎉</div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-8 border-yellow-300">
          {/* Trophy */}
          <div className="text-8xl mb-6 animate-bounce">
            {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '🌟' : '💪'}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            {accuracy >= 80 ? '¡INCREÍBLE!' : accuracy >= 60 ? '¡BUEN TRABAJO!' : '¡SIGUE ASÍ!'}
          </h1>

          {/* Lesson title */}
          <p className="text-xl text-gray-700 mb-8 font-bold">
            {appState.currentLesson.title}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 border-4 border-green-600 shadow-xl transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-3xl font-black text-white">{appState.sessionCorrect}</div>
              <div className="text-sm font-bold text-white/90">Correctas</div>
            </div>

            <div className="bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl p-6 border-4 border-red-600 shadow-xl transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">❌</div>
              <div className="text-3xl font-black text-white">{appState.sessionIncorrect}</div>
              <div className="text-sm font-bold text-white/90">Incorrectas</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 border-4 border-yellow-600 shadow-xl transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-black text-white">+{appState.currentLesson.xpReward}</div>
              <div className="text-sm font-bold text-white/90">XP</div>
            </div>
          </div>

          {/* Accuracy */}
          <div className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-4 border-purple-300">
            <div className="text-lg font-black text-purple-700 mb-2">PRECISIÓN</div>
            <div className="text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              {accuracy}%
            </div>
          </div>

          {/* Continue button */}
          <Button
            onClick={handleComplete}
            fullWidth
            variant="success"
            className="text-2xl py-6 font-black shadow-2xl hover:scale-105 transition-transform"
          >
            ¡CONTINUAR! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}
