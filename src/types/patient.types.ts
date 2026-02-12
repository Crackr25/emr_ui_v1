export type FileStatus = 'processed' | 'pending' | 'hold' | 'no_files';
export type StageStatus = 'processed' | 'pending' | 'hold';

export interface Patient {
  id: string;
  name: string;
  mrn: string;
  filesStatus: FileStatus;
  filesCount?: number;
  stage: StageStatus;
  organization: string;
  tasks: number;
  createdAt: string;
}
