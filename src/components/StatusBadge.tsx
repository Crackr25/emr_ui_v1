import React from 'react';
import { CheckCircle, FileText, Clock } from 'lucide-react';
import { FileStatus, StageStatus } from '../types/patient.types';

interface StatusBadgeProps {
  status: FileStatus | StageStatus;
  filesCount?: number;
  type?: 'files' | 'stage';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  filesCount,
  type = 'stage' 
}) => {
  // Handle Files column specific logic
  if (type === 'files') {
    if (status === 'no_files') {
      return (
        <div className="flex items-center gap-2 text-slate-500">
          <FileText className="w-4 h-4" />
          <span className="text-sm">No Files</span>
        </div>
      );
    }

    if (status === 'processed') {
      return (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">
            Processed {filesCount ? `(${filesCount} files)` : ''}
          </span>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className="flex items-center gap-2 text-yellow-500">
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <span className="text-sm font-medium">
            Pending {filesCount ? `(${filesCount} files)` : ''}
          </span>
        </div>
      );
    }

    if (status === 'hold') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-sm font-medium text-red-400">
            Hold {filesCount ? `(${filesCount} files)` : ''}
          </span>
        </div>
      );
    }
  }

  // Handle Stage column
  if (type === 'stage') {
    if (status === 'processed') {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-500">
          <CheckCircle className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Processed</span>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Pending</span>
        </div>
      );
    }

    if (status === 'hold') {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-xs font-medium">Hold</span>
        </div>
      );
    }
  }

  return null;
};
