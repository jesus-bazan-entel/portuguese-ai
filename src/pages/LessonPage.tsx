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
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Button variant="secondary" onClick={handleQuit} className="px-4 py-2">
              ✕ Salir
            </Button>
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">❤️</span>
              <span className="font-bold text-red-500">{userProgress.hearts}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="text-6xl mb-6">
            {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '💪'}
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {accuracy >= 80 ? '¡Excelente trabajo!' : accuracy >= 60 ? '¡Buen trabajo!' : '¡Sigue intentando!'}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Has completado: {appState.currentLesson.title}
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-green-600">{appState.sessionCorrect}</div>
              <div className="text-sm text-gray-600">Correctas</div>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <div className="text-3xl mb-2">❌</div>
              <div className="text-2xl font-bold text-red-600">{appState.sessionIncorrect}</div>
              <div className="text-sm text-gray-600">Incorrectas</div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-yellow-600">+{appState.currentLesson.xpReward}</div>
              <div className="text-sm text-gray-600">XP</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="text-lg font-semibold text-gray-700 mb-2">Precisión</div>
            <div className="text-5xl font-bold text-purple-600">{accuracy}%</div>
          </div>

          <Button onClick={handleComplete} fullWidth variant="success" className="text-xl py-4">
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
