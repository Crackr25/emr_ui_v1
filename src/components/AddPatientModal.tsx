import React, { useState } from 'react';
import { X } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patientData: PatientFormData) => void;
}

export interface PatientFormData {
  first_name: string;
  middle_name: string;
  last_name: string;
  preferred_name: string;
  date_of_birth: string;
  ssn: string;
  sex_at_birth: 'male' | 'female' | 'other';
  marital_status: 'single' | 'married' | 'divorced' | 'widowed' | 'separated' | 'domestic_partnership';
  primary_lang: string;
  is_interpreter: boolean;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onAddPatient,
}) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<PatientFormData>({
    first_name: '',
    middle_name: '',
    last_name: '',
    preferred_name: '',
    date_of_birth: '',
    ssn: '',
    sex_at_birth: 'other',
    marital_status: 'single',
    primary_lang: 'English',
    is_interpreter: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormData, string>>>({});

  const handleInputChange = (field: keyof PatientFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PatientFormData, string>> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required';
    }
    if (!formData.ssn.trim()) {
      newErrors.ssn = 'SSN is required';
    } else if (!/^\d{3}-?\d{2}-?\d{4}$/.test(formData.ssn)) {
      newErrors.ssn = 'Invalid SSN format (XXX-XX-XXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddPatient(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      first_name: '',
      middle_name: '',
      last_name: '',
      preferred_name: '',
      date_of_birth: '',
      ssn: '',
      sex_at_birth: 'other',
      marital_status: 'single',
      primary_lang: 'English',
      is_interpreter: false,
    });
    setErrors({});
    onClose();
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
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl ${
          theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Add New Patient
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-4">
            {/* Legal Name Section */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Legal Name <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="first_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${errors.first_name ? 'border-red-500' : ''}`}
                    placeholder="John"
                  />
                  {errors.first_name && (
                    <p className="text-xs text-red-500 mt-1">{errors.first_name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="middle_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    Middle Name
                  </Label>
                  <Input
                    id="middle_name"
                    value={formData.middle_name}
                    onChange={(e) => handleInputChange('middle_name', e.target.value)}
                    className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                    placeholder="Michael"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${errors.last_name ? 'border-red-500' : ''}`}
                    placeholder="Doe"
                  />
                  {errors.last_name && (
                    <p className="text-xs text-red-500 mt-1">{errors.last_name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Preferred Name */}
            <div>
              <Label htmlFor="preferred_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Preferred Name
              </Label>
              <Input
                id="preferred_name"
                value={formData.preferred_name}
                onChange={(e) => handleInputChange('preferred_name', e.target.value)}
                className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="Patient's chosen name"
              />
            </div>

            {/* Date of Birth & SSN */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date_of_birth" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                  className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${errors.date_of_birth ? 'border-red-500' : ''}`}
                />
                {errors.date_of_birth && (
                  <p className="text-xs text-red-500 mt-1">{errors.date_of_birth}</p>
                )}
              </div>
              <div>
                <Label htmlFor="ssn" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Social Security Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ssn"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange('ssn', e.target.value)}
                  className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${errors.ssn ? 'border-red-500' : ''}`}
                  placeholder="XXX-XX-XXXX"
                  maxLength={11}
                />
                {errors.ssn && (
                  <p className="text-xs text-red-500 mt-1">{errors.ssn}</p>
                )}
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Encrypted for HIPAA compliance
                </p>
              </div>
            </div>

            {/* Biological Sex */}
            <div>
              <Label htmlFor="sex_at_birth" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Biological Sex
              </Label>
              <Select
                value={formData.sex_at_birth}
                onValueChange={(value) => handleInputChange('sex_at_birth', value)}
              >
                <SelectTrigger
                  className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Marital Status */}
            <div>
              <Label htmlFor="marital_status" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Marital Status
              </Label>
              <Select
                value={formData.marital_status}
                onValueChange={(value) => handleInputChange('marital_status', value)}
              >
                <SelectTrigger
                  className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                  <SelectItem value="separated">Separated</SelectItem>
                  <SelectItem value="domestic_partnership">Domestic Partnership</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Primary Language */}
            <div>
              <Label htmlFor="primary_lang" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Primary Language
              </Label>
              <Input
                id="primary_lang"
                value={formData.primary_lang}
                onChange={(e) => handleInputChange('primary_lang', e.target.value)}
                className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="English"
              />
            </div>

            {/* Interpreter Required */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_interpreter"
                checked={formData.is_interpreter}
                onCheckedChange={(checked) => handleInputChange('is_interpreter', checked as boolean)}
                className={theme === 'dark' ? 'border-zinc-700' : 'border-gray-300'}
              />
              <Label
                htmlFor="is_interpreter"
                className={`text-sm cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
              >
                Interpreter Required
              </Label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className={`${
                theme === 'dark'
                  ? 'border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700'
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${
                theme === 'dark'
                  ? 'bg-white hover:bg-zinc-200 text-black'
                  : 'bg-black hover:bg-gray-800 text-white'
              }`}
            >
              Add Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
