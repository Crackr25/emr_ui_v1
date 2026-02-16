import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoFormProps {
  formData: {
    firstname: string;
    lastname: string;
    date_of_birth: string;
  };
  errors: {
    firstname?: string;
    lastname?: string;
    date_of_birth?: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  errors,
  onFieldChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstname" className="text-sm font-medium text-gray-700">
            First Name
          </Label>
          <Input
            id="firstname"
            type="text"
            value={formData.firstname}
            onChange={(e) => onFieldChange('firstname', e.target.value)}
            placeholder="John"
            className={`mt-1.5 ${errors.firstname ? 'border-red-500' : ''}`}
          />
          {errors.firstname && (
            <p className="mt-1 text-xs text-red-600">{errors.firstname}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastname" className="text-sm font-medium text-gray-700">
            Last Name
          </Label>
          <Input
            id="lastname"
            type="text"
            value={formData.lastname}
            onChange={(e) => onFieldChange('lastname', e.target.value)}
            placeholder="Doe"
            className={`mt-1.5 ${errors.lastname ? 'border-red-500' : ''}`}
          />
          {errors.lastname && (
            <p className="mt-1 text-xs text-red-600">{errors.lastname}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="date_of_birth" className="text-sm font-medium text-gray-700">
          Date of Birth
        </Label>
        <Input
          id="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={(e) => onFieldChange('date_of_birth', e.target.value)}
          className={`mt-1.5 ${errors.date_of_birth ? 'border-red-500' : ''}`}
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.date_of_birth && (
          <p className="mt-1 text-xs text-red-600">{errors.date_of_birth}</p>
        )}
        <p className="mt-1 text-xs text-zinc-500">
          Used for background checks & identity verification
        </p>
      </div>
    </div>
  );
};
