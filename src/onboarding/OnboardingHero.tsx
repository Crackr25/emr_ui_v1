import React from 'react';
import { Activity } from 'lucide-react';

interface OnboardingHeroProps {
  currentStage: number;
  totalStages: number;
  stageIcon: React.ReactNode;
  stageTitle: string;
}

export const OnboardingHero: React.FC<OnboardingHeroProps> = ({
  currentStage,
  totalStages,
  stageIcon,
  stageTitle,
}) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-black" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-bold">OneUp</h1>
          </div>
        </div>

        <div className="w-full max-w-md aspect-square bg-zinc-900 rounded-2xl shadow-2xl p-4">
          <div className="w-full h-full bg-zinc-800 rounded-xl flex items-center justify-center">
            <div className="text-center">
              {stageIcon}
              <p className="text-lg font-medium text-white mt-4">
                Step {currentStage} of {totalStages}
              </p>
              <p className="text-sm text-zinc-400 mt-2">{stageTitle}</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-zinc-400 max-w-md">
          Complete your profile to get started
        </p>
      </div>
    </div>
  );
};
