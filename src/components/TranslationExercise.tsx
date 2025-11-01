import { useState } from 'react';
import type { Exercise } from '../types';
import { Button } from './Button';

interface TranslationExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
}

export function TranslationExercise({ exercise, onSubmit }: TranslationExerciseProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Mascot and Question */}
      <div className="text-center px-2">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="text-6xl md:text-7xl animate-bounce">🦜</div>
            <div className="absolute -right-2 -top-2 w-6 h-6 bg-green-400 rounded-full animate-ping" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border-b-4 border-blue-400 mb-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800">{exercise.question}</h2>
        </div>

        {exercise.hint && (
          <div className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-2xl px-5 py-3 shadow-md hover:scale-105 transition-transform">
            <p className="text-sm md:text-base text-blue-800 font-bold">💡 Pista: {exercise.hint}</p>
          </div>
        )}
      </div>

      {/* Input - Touch friendly */}
      <div className="space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full px-5 md:px-6 py-5 md:py-4 text-base md:text-lg border-4 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-200 shadow-lg hover:border-gray-400 transition-all min-h-[60px] md:min-h-[56px] font-semibold"
          placeholder="Escribe tu respuesta..."
          autoFocus
        />

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          fullWidth
          className="shadow-xl"
        >
          Verificar ✓
        </Button>
      </div>
    </div>
  );
}
