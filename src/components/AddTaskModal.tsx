import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskData: TaskFormData) => void;
}

export interface TaskFormData {
  patient: string;
  assign_to: string;
  task_name: string;
  task_type: string;
  task_status: string;
  start_date: string;
  duration_days: number;
  end_date: string;
  oasis_date: string;
  completed_date: string;
  oasis_file?: File;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
}) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<TaskFormData>({
    patient: '',
    assign_to: 'Unassigned',
    task_name: '',
    task_type: '',
    task_status: 'Assigned',
    start_date: new Date().toISOString().split('T')[0],
    duration_days: 1,
    end_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    oasis_date: '',
    completed_date: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});
  const [oasisFile, setOasisFile] = useState<File | null>(null);

  const handleInputChange = (field: keyof TaskFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleOasisFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOasisFile(e.target.files[0]);
      setFormData((prev) => ({ ...prev, oasis_file: e.target.files![0] }));
    }
  };

  const handleDurationChange = (value: string) => {
    const duration = parseInt(value) || 1;
    const startDate = new Date(formData.start_date || Date.now());
    const endDate = new Date(startDate.getTime() + duration * 86400000);
    setFormData((prev) => ({
      ...prev,
      duration_days: duration,
      end_date: endDate.toISOString().split('T')[0],
    }));
  };

  const handleStartDateChange = (value: string) => {
    const startDate = new Date(value);
    const duration = formData.duration_days || 1;
    const endDate = new Date(startDate.getTime() + duration * 86400000);
    setFormData((prev) => ({
      ...prev,
      start_date: value,
      end_date: endDate.toISOString().split('T')[0],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.patient.trim()) {
      newErrors.patient = 'Patient is required';
    }
    if (!formData.task_name.trim()) {
      newErrors.task_name = 'Task is required';
    }
    if (!formData.task_type.trim()) {
      newErrors.task_type = 'Task type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setFormData({
      patient: '',
      assign_to: 'Unassigned',
      task_name: '',
      task_type: '',
      task_status: 'Assigned',
      start_date: new Date().toISOString().split('T')[0],
      duration_days: 1,
      end_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      oasis_date: '',
      completed_date: '',
    });
    setErrors({});
    setOasisFile(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddTask(formData);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-lg shadow-xl ${
          theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            New Healthcare Task
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className={`p-1 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-400 hover:text-gray-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <Label htmlFor="patient" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Patient <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.patient}
                onValueChange={(value) => handleInputChange('patient', value)}
              >
                <SelectTrigger
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''} ${errors.patient ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''}>
                  <SelectItem value="One Up">One Up</SelectItem>
                  <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                  <SelectItem value="David Smith">David Smith</SelectItem>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
              {errors.patient && (
                <p className="text-xs text-red-500 mt-1">{errors.patient}</p>
              )}
            </div>

            <div>
              <Label htmlFor="assign_to" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Assign to <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.assign_to}
                onValueChange={(value) => handleInputChange('assign_to', value)}
              >
                <SelectTrigger
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''}>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                  <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="Nurse Davis">Nurse Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="task_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Task <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.task_name}
                onValueChange={(value) => handleInputChange('task_name', value)}
              >
                <SelectTrigger
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''} ${errors.task_name ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''}>
                  <SelectItem value="Initial Assessment">Initial Assessment</SelectItem>
                  <SelectItem value="Follow-up Visit">Follow-up Visit</SelectItem>
                  <SelectItem value="OASIS Completion">OASIS Completion</SelectItem>
                  <SelectItem value="Care Plan Review">Care Plan Review</SelectItem>
                </SelectContent>
              </Select>
              {errors.task_name && (
                <p className="text-xs text-red-500 mt-1">{errors.task_name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task_type" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Task Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.task_type}
                  onValueChange={(value) => handleInputChange('task_type', value)}
                >
                  <SelectTrigger
                    className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''} ${errors.task_type ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''}>
                    <SelectItem value="Assessment">Assessment</SelectItem>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                    <SelectItem value="Visit">Visit</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                  </SelectContent>
                </Select>
                {errors.task_type && (
                  <p className="text-xs text-red-500 mt-1">{errors.task_type}</p>
                )}
              </div>
              <div>
                <Label htmlFor="task_status" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.task_status}
                  onValueChange={(value) => handleInputChange('task_status', value)}
                >
                  <SelectTrigger
                    className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''}>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start_date" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="duration_days" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Duration (Days) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="duration_days"
                  type="number"
                  min="1"
                  value={formData.duration_days}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="end_date" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  End Date
                </Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  readOnly
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="oasis_date" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  OASIS Date
                </Label>
                <Input
                  id="oasis_date"
                  type="date"
                  value={formData.oasis_date}
                  onChange={(e) => handleInputChange('oasis_date', e.target.value)}
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="completed_date" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Completed Date
                </Label>
                <Input
                  id="completed_date"
                  type="date"
                  value={formData.completed_date}
                  onChange={(e) => handleInputChange('completed_date', e.target.value)}
                  placeholder="Select completed date"
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="oasis_file" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                OASIS File
              </Label>
              <div className="mt-1.5">
                <label
                  htmlFor="oasis_file"
                  className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'border-zinc-700 hover:border-zinc-600 bg-zinc-800 hover:bg-zinc-750'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Upload className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    {oasisFile ? oasisFile.name : 'Upload OASIS file'}
                  </span>
                </label>
                <input
                  id="oasis_file"
                  type="file"
                  onChange={handleOasisFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
          </div>
        </form>

        <div className={`flex items-center justify-end gap-2 px-6 py-4 border-t ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className={theme === 'dark' ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : ''}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
};
