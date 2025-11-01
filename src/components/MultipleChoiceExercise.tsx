import { useState } from 'react';
import type { Exercise } from '../types';
import { Button } from './Button';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
}

export function MultipleChoiceExercise({ exercise, onSubmit }: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
      setSelectedOption('');
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Question with mascot */}
      <div className="text-center px-2">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="text-6xl md:text-7xl animate-bounce">🎯</div>
            <div className="absolute -right-2 -top-2 w-6 h-6 bg-purple-400 rounded-full animate-ping" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border-b-4 border-purple-400 mb-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">{exercise.question}</h2>
          {exercise.prompt && (
            <p className="text-base md:text-lg text-gray-600 font-semibold">{exercise.prompt}</p>
          )}
        </div>
      </div>

      {/* Options - Touch friendly with emojis */}
      <div className="space-y-3 md:space-y-4">
        {exercise.options?.map((option, index) => {
          const emojis = ['🔵', '🟣', '🟢', '🟡'];
          const emoji = emojis[index % emojis.length];

          return (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`w-full px-5 md:px-6 py-5 md:py-4 text-left rounded-2xl border-4 transition-all hover:scale-102 active:scale-98 min-h-[60px] md:min-h-[56px] flex items-center gap-3 ${
                selectedOption === option
                  ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl ring-4 ring-green-200'
                  : 'border-gray-300 hover:border-gray-400 bg-white shadow-md hover:shadow-lg'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{emoji}</span>
              <span className="font-bold text-base md:text-lg">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Submit button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
          fullWidth
          className="shadow-xl"
        >
          Verificar ✓
        </Button>
      </div>
    </div>
  );
}
