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
  const messages = isCorrect
    ? ['¡Increíble!', '¡Perfecto!', '¡Excelente!', '¡Genial!', '¡Muy bien!']
    : ['Oops!', 'No te preocupes', 'Sigue intentando'];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 md:p-6 border-t-4 shadow-2xl animate-slide-up ${
        isCorrect
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500'
          : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-500'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {/* Title and Icon with celebration */}
          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <span className={`text-5xl md:text-6xl ${isCorrect ? 'animate-bounce' : ''}`}>
                {isCorrect ? '🎉' : '❌'}
              </span>
              {isCorrect && (
                <>
                  <span className="absolute top-0 left-0 text-3xl animate-ping">✨</span>
                  <span className="absolute -top-2 -right-2 text-2xl animate-pulse">⭐</span>
                </>
              )}
            </div>
            <div>
              <h3 className={`text-2xl md:text-3xl font-black ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {randomMessage}
              </h3>
              {isCorrect && (
                <p className="text-sm md:text-base text-green-600 font-bold">¡Sigue así! 🚀</p>
              )}
            </div>
          </div>

          {/* Answer details */}
          {!isCorrect && (
            <div className="bg-white rounded-2xl p-4 md:p-5 border-2 border-red-200 shadow-lg">
              <p className="text-sm md:text-base text-gray-700 mb-3">
                <span className="font-black text-gray-800">Tu respuesta:</span>
                <span className="ml-2 text-red-600 font-bold bg-red-100 px-3 py-1 rounded-lg inline-block mt-1">{userAnswer}</span>
              </p>
              <p className="text-sm md:text-base text-gray-700">
                <span className="font-black text-gray-800">Respuesta correcta:</span>
                <span className="ml-2 text-green-600 font-bold bg-green-100 px-3 py-1 rounded-lg inline-block mt-1">{exercise.correctAnswer}</span>
              </p>
            </div>
          )}

          {/* Explanation */}
          {exercise.explanation && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-5 border-2 border-blue-200 shadow-lg">
              <p className="text-sm md:text-base text-gray-800">
                <span className="font-bold text-blue-700 text-lg">💡 </span>
                <span className="font-semibold">{exercise.explanation}</span>
              </p>
            </div>
          )}

          {/* Continue button - Full width on mobile */}
          <Button
            onClick={onContinue}
            variant={isCorrect ? 'success' : 'primary'}
            fullWidth
            className="font-black text-lg shadow-2xl hover:scale-105 transition-transform"
          >
            {isCorrect ? 'Continuar 🎯' : 'Continuar 💪'}
          </Button>
        </div>
      </div>
    </div>
  );
}
