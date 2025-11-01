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
      className={`fixed bottom-0 left-0 right-0 p-6 border-t-4 ${
        isCorrect
          ? 'bg-green-50 border-green-500'
          : 'bg-red-50 border-red-500'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">
                {isCorrect ? '✅' : '❌'}
              </span>
              <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '¡Excelente!' : 'Respuesta incorrecta'}
              </h3>
            </div>

            {!isCorrect && (
              <div className="space-y-2 mb-3 bg-white rounded-lg p-4 border-2 border-gray-200">
                <p className="text-gray-700">
                  <span className="font-bold">Tu respuesta:</span> <span className="text-red-600">{userAnswer}</span>
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Respuesta correcta:</span> <span className="text-green-600">{exercise.correctAnswer}</span>
                </p>
              </div>
            )}

            {exercise.explanation && (
              <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                <p className="text-gray-700">
                  <span className="font-bold text-blue-600">💡 </span>
                  {exercise.explanation}
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={onContinue}
            variant={isCorrect ? 'success' : 'primary'}
            className="w-full md:w-auto px-8 py-3 text-lg font-bold"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
