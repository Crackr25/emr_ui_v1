import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NPIFormProps {
  npiNumber: string;
  error?: string;
  onNPIChange: (value: string) => void;
}

export const NPIForm: React.FC<NPIFormProps> = ({ npiNumber, error, onNPIChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="npi_number" className="text-sm font-medium text-gray-700">
          NPI Number
        </Label>
        <Input
          id="npi_number"
          type="text"
          inputMode="numeric"
          maxLength={10}
          value={npiNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Only allow digits
            onNPIChange(value);
          }}
          placeholder="1234567890"
          className={`mt-1.5 ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        <p className="mt-1 text-xs text-zinc-500">
          National Provider Identifier - Must be exactly 10 digits
        </p>
      </div>

      <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
        <p className="text-xs text-gray-700">
          ℹ️ Your NPI number is used to verify your professional credentials
        </p>
      </div>
    </div>
  );
};
