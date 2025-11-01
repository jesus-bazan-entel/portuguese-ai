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
      className={`fixed bottom-0 left-0 right-0 p-4 md:p-6 border-t-4 shadow-2xl ${
        isCorrect
          ? 'bg-green-50 border-green-500'
          : 'bg-red-50 border-red-500'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {/* Title and Icon */}
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl">
              {isCorrect ? '✅' : '❌'}
            </span>
            <h3 className={`text-xl md:text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? '¡Excelente!' : 'Respuesta incorrecta'}
            </h3>
          </div>

          {/* Answer details */}
          {!isCorrect && (
            <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
              <p className="text-sm md:text-base text-gray-700 mb-2">
                <span className="font-bold">Tu respuesta:</span> <span className="text-red-600">{userAnswer}</span>
              </p>
              <p className="text-sm md:text-base text-gray-700">
                <span className="font-bold">Respuesta correcta:</span> <span className="text-green-600">{exercise.correctAnswer}</span>
              </p>
            </div>
          )}

          {/* Explanation */}
          {exercise.explanation && (
            <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
              <p className="text-sm md:text-base text-gray-700">
                <span className="font-bold text-blue-600">💡 </span>
                {exercise.explanation}
              </p>
            </div>
          )}

          {/* Continue button - Full width on mobile */}
          <Button
            onClick={onContinue}
            variant={isCorrect ? 'success' : 'primary'}
            fullWidth
            className="font-bold"
          >
            Continuar →
          </Button>
        </div>
      </div>
    </div>
  );
}
