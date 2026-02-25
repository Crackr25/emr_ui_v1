import React from 'react';
import { Plus, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface License {
  license_type: string;
  license_number: string;
  issuing_state: string;
  issue_date: string;
  expiry_date: string;
  image_file?: File | null;
  image_preview?: string;
}

interface LicenseFormProps {
  currentLicense: License;
  errors: Partial<License>;
  onFieldChange: (field: keyof License, value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  onAddLicense: () => void;
}

export const LicenseForm: React.FC<LicenseFormProps> = ({
  currentLicense,
  errors,
  onFieldChange,
  onImageUpload,
  onImageRemove,
  onAddLicense,
}) => {
  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <h3 className="font-medium text-gray-900">Add License</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="license_type" className="text-sm font-medium text-gray-700">
            License Type
          </Label>
          <select
            id="license_type"
            value={currentLicense.license_type}
            onChange={(e) => onFieldChange('license_type', e.target.value)}
            className={`mt-1.5 w-full px-3 py-2 border rounded-md text-sm ${
              errors.license_type ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Type</option>
            <option value="STATE">State License</option>
            <option value="DEA">DEA</option>
            <option value="CDS">CDS</option>
            <option value="BOARD_CERT">Board Certification</option>
          </select>
          {errors.license_type && (
            <p className="mt-1 text-xs text-red-600">{errors.license_type}</p>
          )}
        </div>

        <div>
          <Label htmlFor="license_number" className="text-sm font-medium text-gray-700">
            License Number
          </Label>
          <Input
            id="license_number"
            type="text"
            value={currentLicense.license_number}
            onChange={(e) => onFieldChange('license_number', e.target.value)}
            placeholder="ABC123456"
            className={`mt-1.5 ${errors.license_number ? 'border-red-500' : ''}`}
          />
          {errors.license_number && (
            <p className="mt-1 text-xs text-red-600">{errors.license_number}</p>
          )}
        </div>

        <div>
          <Label htmlFor="issuing_state" className="text-sm font-medium text-gray-700">
            Issuing State
          </Label>
          <Input
            id="issuing_state"
            type="text"
            maxLength={2}
            value={currentLicense.issuing_state}
            onChange={(e) => onFieldChange('issuing_state', e.target.value.toUpperCase())}
            placeholder="CA"
            className={`mt-1.5 ${errors.issuing_state ? 'border-red-500' : ''}`}
          />
          {errors.issuing_state && (
            <p className="mt-1 text-xs text-red-600">{errors.issuing_state}</p>
          )}
        </div>

        <div>
          <Label htmlFor="issue_date" className="text-sm font-medium text-gray-700">
            Issue Date
          </Label>
          <Input
            id="issue_date"
            type="date"
            value={currentLicense.issue_date}
            onChange={(e) => onFieldChange('issue_date', e.target.value)}
            className={`mt-1.5 ${errors.issue_date ? 'border-red-500' : ''}`}
          />
          {errors.issue_date && (
            <p className="mt-1 text-xs text-red-600">{errors.issue_date}</p>
          )}
        </div>

        <div className="col-span-2">
          <Label htmlFor="expiry_date" className="text-sm font-medium text-gray-700">
            Expiry Date
          </Label>
          <Input
            id="expiry_date"
            type="date"
            value={currentLicense.expiry_date}
            onChange={(e) => onFieldChange('expiry_date', e.target.value)}
            className={`mt-1.5 ${errors.expiry_date ? 'border-red-500' : ''}`}
          />
          {errors.expiry_date && (
            <p className="mt-1 text-xs text-red-600">{errors.expiry_date}</p>
          )}
        </div>

        {/* License Image Upload */}
        <div className="col-span-2">
          <Label htmlFor="license_image" className="text-sm font-medium text-gray-700">
            License Image (Optional)
          </Label>
          {!currentLicense.image_preview ? (
            <div className="mt-1.5">
              <label
                htmlFor="license_image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG, GIF (MAX. 10MB)</p>
                </div>
                <input
                  id="license_image"
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="mt-1.5 relative">
              <div className="relative w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={currentLicense.image_preview}
                  alt="License preview"
                  className="w-full h-full object-contain bg-gray-50"
                />
                <button
                  type="button"
                  onClick={onImageRemove}
                  aria-label="Remove license image"
                  className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">{currentLicense.image_file?.name}</p>
            </div>
          )}
        </div>
      </div>

      <Button
        type="button"
        onClick={onAddLicense}
        variant="outline"
        className="w-full"
        size="sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add License
      </Button>
    </div>
  );
};
