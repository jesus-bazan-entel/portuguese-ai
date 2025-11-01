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
      {/* Top progress bar */}
      <div className="bg-white border-b-2 border-gray-200 p-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={handleQuit}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-bold text-xl transition-colors"
            >
              ✕
            </button>
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">❤️</span>
              <span className="font-bold text-red-500 text-lg">{userProgress.hearts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise card */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white">
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
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-200">
          {/* Trophy */}
          <div className="text-7xl mb-6">
            {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '⭐' : '💪'}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {accuracy >= 80 ? '¡Excelente trabajo!' : accuracy >= 60 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
          </h1>

          {/* Lesson title */}
          <p className="text-lg text-gray-600 mb-8">
            {appState.currentLesson.title}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <div className="text-3xl mb-1">✅</div>
              <div className="text-2xl font-bold text-green-600">{appState.sessionCorrect}</div>
              <div className="text-xs text-gray-600 font-medium">Correctas</div>
            </div>

            <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
              <div className="text-3xl mb-1">❌</div>
              <div className="text-2xl font-bold text-red-600">{appState.sessionIncorrect}</div>
              <div className="text-xs text-gray-600 font-medium">Incorrectas</div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-300">
              <div className="text-3xl mb-1">⭐</div>
              <div className="text-2xl font-bold text-yellow-600">+{appState.currentLesson.xpReward}</div>
              <div className="text-xs text-gray-600 font-medium">XP</div>
            </div>
          </div>

          {/* Accuracy */}
          <div className="mb-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="text-sm font-bold text-blue-700 mb-1">Precisión</div>
            <div className="text-5xl font-bold text-blue-600">{accuracy}%</div>
          </div>

          {/* Continue button */}
          <Button
            onClick={handleComplete}
            fullWidth
            variant="success"
            className="text-lg py-4 font-bold"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
