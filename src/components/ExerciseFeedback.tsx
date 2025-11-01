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
      className={`fixed bottom-0 left-0 right-0 p-6 ${
        isCorrect ? 'bg-green-100 border-t-4 border-green-500' : 'bg-red-100 border-t-4 border-red-500'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? '¡Correcto! 🎉' : '¡Incorrecto! ❌'}
            </h3>

            {!isCorrect && (
              <div className="space-y-1">
                <p className="text-gray-700">
                  <span className="font-semibold">Tu respuesta:</span> {userAnswer}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Respuesta correcta:</span> {exercise.correctAnswer}
                </p>
              </div>
            )}

            {exercise.explanation && (
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">📚 Explicación:</span> {exercise.explanation}
              </p>
            )}
          </div>

          <Button
            onClick={onContinue}
            variant={isCorrect ? 'success' : 'danger'}
            className="ml-4"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
