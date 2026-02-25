import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const VisitsTab: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={`w-1/2 flex flex-col overflow-auto p-6 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Visits content coming soon...</div>
    </div>
  );
};
