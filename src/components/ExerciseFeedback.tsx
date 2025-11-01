import type { Exercise } from '../types';
import { Button } from './Button';

interface ExerciseFeedbackProps {
  isCorrect: boolean;
  exercise: Exercise;
  userAnswer: string;
  onContinue: () => void;
}

export function ExerciseFeedback({
  isCorrect,
  exercise,
  userAnswer,
  onContinue,
}: ExerciseFeedbackProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-6 shadow-2xl animate-slide-up ${
        isCorrect
          ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-t-8 border-green-600'
          : 'bg-gradient-to-r from-red-400 to-rose-500 border-t-8 border-red-600'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">
                {isCorrect ? '🎉' : '😢'}
              </span>
              <h3 className="text-3xl md:text-4xl font-black drop-shadow-lg">
                {isCorrect ? '¡Excelente!' : '¡Casi!'}
              </h3>
            </div>

            {!isCorrect && (
              <div className="space-y-2 bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-3">
                <p className="text-white font-semibold">
                  <span className="font-black">Tu respuesta:</span> {userAnswer}
                </p>
                <p className="text-white font-semibold">
                  <span className="font-black">Respuesta correcta:</span> {exercise.correctAnswer}
                </p>
              </div>
            )}

            {exercise.explanation && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-white font-semibold">
                  <span className="font-black">💡 Explicación:</span> {exercise.explanation}
                </p>
              </div>
            )}

            {isCorrect && (
              <p className="text-white/90 text-lg font-semibold">
                ¡Sigue así! Estás haciendo un gran progreso 🌟
              </p>
            )}
          </div>

          <Button
            onClick={onContinue}
            variant={isCorrect ? 'success' : 'danger'}
            className="ml-0 md:ml-4 px-8 py-4 text-xl font-black shadow-xl hover:scale-105 transition-transform"
          >
            Continuar →
          </Button>
        </div>
      </div>
    </div>
  );
}
