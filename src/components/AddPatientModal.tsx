import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
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

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patientData: PatientFormData) => void;
}

export interface PatientFormData {
  first_name: string;
  last_name: string;
  patient_name: string;
  assign_to?: string;
  medical_record?: string;
  date_of_birth: string;
  set?: string;
  referral_stage: 'Pending' | 'Processed' | 'Hold';
  referral_files?: File[];
  task_title?: string;
  task_description?: string;
  task_assign_to?: string;
  task_name?: string;
  task_type?: string;
  task_status?: string;
  start_date?: string;
  duration_days?: number;
  end_date?: string;
  oasis_date?: string;
  completed_date?: string;
  oasis_file?: File;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onAddPatient,
}) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PatientFormData>({
    first_name: '',
    last_name: '',
    patient_name: '',
    assign_to: 'Unassigned',
    medical_record: '',
    date_of_birth: '',
    set: '',
    referral_stage: 'Pending',
    task_title: '',
    task_description: '',
    task_assign_to: 'Unassigned',
    task_name: '',
    task_type: '',
    task_status: 'Assigned',
    start_date: new Date().toISOString().split('T')[0],
    duration_days: 1,
    end_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    oasis_date: '',
    completed_date: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormData, string>>>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [oasisFile, setOasisFile] = useState<File | null>(null);

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PatientFormData, string>> = {};

    if (!formData.patient_name.trim()) {
      newErrors.patient_name = 'Patient name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
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

  const handleClose = () => {
    setFormData({
      first_name: '',
      last_name: '',
      patient_name: '',
      assign_to: 'Unassigned',
      medical_record: '',
      date_of_birth: '',
      set: '',
      referral_stage: 'Pending',
      task_title: '',
      task_description: '',
      task_assign_to: 'Unassigned',
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
    setCurrentStep(1);
    setSelectedFiles([]);
    setOasisFile(null);
    onClose();
  };

  const handleContinueToTask = () => {
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  const handleCreatePatientOnly = () => {
    if (validateForm()) {
      onAddPatient(formData);
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddPatient(formData);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-lg shadow-xl ${
          theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
        }`}
      >
        {/* Header */}
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
            New Patient
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

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-8 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === 1
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-zinc-800 text-zinc-400'
                : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div>
              <div className={`text-sm font-medium ${
                currentStep === 1
                  ? 'text-blue-600'
                  : theme === 'dark'
                  ? 'text-zinc-400'
                  : 'text-gray-600'
              }`}>
                Patient Information
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Enter patient details
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === 2
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-zinc-800 text-zinc-400'
                : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div>
              <div className={`text-sm font-medium ${
                currentStep === 2
                  ? 'text-blue-600'
                  : theme === 'dark'
                  ? 'text-zinc-400'
                  : 'text-gray-600'
              }`}>
                Create Task
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Optionally create a task
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-6 py-4 overflow-y-auto flex-1">
          {currentStep === 1 ? (
            <div className="space-y-4">
              {/* Patient Name */}
              <div>
                <Label htmlFor="patient_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Patient Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="patient_name"
                  value={formData.patient_name}
                  onChange={(e) => handleInputChange('patient_name', e.target.value)}
                  className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : ''} ${errors.patient_name ? 'border-red-500' : ''}`}
                  placeholder="Enter patient name"
                />
                {errors.patient_name && (
                  <p className="text-xs text-red-500 mt-1">{errors.patient_name}</p>
                )}
              </div>

              {/* Assign to */}
              <div>
                <Label htmlFor="assign_to" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Assign to
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

              {/* Medical Record & Date of Birth */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medical_record" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    Medical Record
                  </Label>
                  <Input
                    id="medical_record"
                    value={formData.medical_record}
                    onChange={(e) => handleInputChange('medical_record', e.target.value)}
                    className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : ''}`}
                    placeholder="Enter MRN (optional)"
                  />
                </div>
                <div>
                  <Label htmlFor="date_of_birth" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    Date of Birth
                  </Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                    className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                    placeholder="MM-DD-YYYY"
                  />
                </div>
              </div>

              {/* Set */}
              <div>
                <Label htmlFor="set" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Set
                </Label>
                <Select
                  value={formData.set}
                  onValueChange={(value) => handleInputChange('set', value)}
                >
                  <SelectTrigger
                    className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                  >
                    <SelectValue placeholder="Select a set" />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''}>
                    <SelectItem value="Set A">Set A</SelectItem>
                    <SelectItem value="Set B">Set B</SelectItem>
                    <SelectItem value="Set C">Set C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Referral Stage */}
              <div>
                <Label htmlFor="referral_stage" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Referral Stage
                </Label>
                <Select
                  value={formData.referral_stage}
                  onValueChange={(value) => handleInputChange('referral_stage', value as 'Pending' | 'Processed' | 'Hold')}
                >
                  <SelectTrigger
                    className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        formData.referral_stage === 'Pending' ? 'bg-yellow-500' :
                        formData.referral_stage === 'Processed' ? 'bg-green-500' :
                        'bg-red-500'
                      }`} />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''}>
                    <SelectItem value="Pending">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="Processed">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Processed
                      </div>
                    </SelectItem>
                    <SelectItem value="Hold">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        Hold
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Referrals (Optional) */}
              <div>
                <Label htmlFor="referral_files" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Referrals (Optional)
                </Label>
                <div className="mt-1.5">
                  <label
                    htmlFor="referral_files"
                    className={`flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      theme === 'dark'
                        ? 'border-zinc-700 hover:border-zinc-600 bg-zinc-800 hover:bg-zinc-750'
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <Upload className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'Choose Files'}
                    </span>
                  </label>
                  <input
                    id="referral_files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Assign to */}
              <div>
                <Label htmlFor="task_assign_to" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Assign to <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.task_assign_to}
                  onValueChange={(value) => handleInputChange('task_assign_to', value)}
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

              {/* Task */}
              <div>
                <Label htmlFor="task_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Task <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.task_name}
                  onValueChange={(value) => handleInputChange('task_name', value)}
                >
                  <SelectTrigger
                    className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
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
              </div>

              {/* Task Type & Status */}
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
                      className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
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

              {/* Start Date, Duration, End Date */}
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

              {/* OASIS Date & Completed Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="oasis_date" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    OASIS Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="oasis_date"
                    type="date"
                    value={formData.oasis_date}
                    onChange={(e) => handleInputChange('oasis_date', e.target.value)}
                    placeholder="Select OASIS date"
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

              {/* OASIS File */}
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
          )}
        </form>

        {/* Footer Buttons */}
        <div className={`flex items-center justify-between px-6 py-4 border-t ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}>
          {currentStep === 1 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className={theme === 'dark' ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : ''}
              >
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCreatePatientOnly}
                  className={theme === 'dark' ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : ''}
                >
                  Create Patient Only
                </Button>
                <Button
                  type="button"
                  onClick={handleContinueToTask}
                  className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  Continue to Task →
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className={theme === 'dark' ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : ''}
              >
                ← Previous
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                Create Patient & Task
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
