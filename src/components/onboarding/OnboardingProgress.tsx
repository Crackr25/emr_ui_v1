import React from 'react';

interface OnboardingProgressProps {
  currentStage: number;
  totalStages: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStage,
  totalStages,
}) => {
  const percentage = Math.round((currentStage / totalStages) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStage} of {totalStages}
        </span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-black h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
