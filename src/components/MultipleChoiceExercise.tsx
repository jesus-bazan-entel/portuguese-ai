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
      {/* Question */}
      <div className="text-center px-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{exercise.question}</h2>
        {exercise.prompt && (
          <p className="text-base md:text-lg text-gray-600">{exercise.prompt}</p>
        )}
      </div>

      {/* Options - Touch friendly */}
      <div className="space-y-3 md:space-y-4">
        {exercise.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`w-full px-5 md:px-6 py-5 md:py-4 text-left rounded-2xl border-4 transition-all active:scale-98 min-h-[60px] md:min-h-[56px] ${
              selectedOption === option
                ? 'border-green-500 bg-green-50 shadow-lg'
                : 'border-gray-300 hover:border-gray-400 bg-white shadow-md'
            }`}
          >
            <span className="font-bold text-base md:text-lg">{option}</span>
          </button>
        ))}
      </div>

      {/* Submit button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
          fullWidth
        >
          Verificar
        </Button>
      </div>
    </div>
  );
}
