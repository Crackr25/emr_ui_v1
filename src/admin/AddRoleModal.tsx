import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Role, RoleFormData } from '../types/role.types';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RoleFormData) => void;
  editingRole?: Role | null;
}

export const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen, onClose, onSubmit, editingRole }) => {
  const { theme } = useTheme();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RoleFormData>({
    defaultValues: {
      role_name: '',
      role_description: '',
      requires_npi: false,
      requires_license: false,
      status: 'active',
    },
  });

  useEffect(() => {
    if (editingRole) {
      reset({
        role_name: editingRole.role_name,
        role_description: editingRole.role_description,
        requires_npi: editingRole.requires_npi,
        requires_license: editingRole.requires_license,
        status: editingRole.status,
      });
    } else {
      reset({
        role_name: '',
        role_description: '',
        requires_npi: false,
        requires_license: false,
        status: 'active',
      });
    }
  }, [editingRole, reset]);

  const handleFormSubmit = (data: RoleFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md mx-4 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {editingRole ? 'Edit Role' : 'Add New Role'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 py-4 space-y-4">
          {/* Role Name */}
          <div>
            <Label htmlFor="role_name" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Role Name *
            </Label>
            <Input
              id="role_name"
              {...register('role_name', { required: 'Role name is required' })}
              placeholder="e.g., Physician, Nurse, Staff"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
            />
            {errors.role_name && (
              <p className="text-xs text-red-500 mt-1">{errors.role_name.message}</p>
            )}
          </div>

          {/* Role Description */}
          <div>
            <Label htmlFor="role_description" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Description
            </Label>
            <textarea
              id="role_description"
              {...register('role_description')}
              placeholder="Brief description of the role"
              rows={3}
              className={`mt-1.5 w-full px-3 py-2 rounded-md border text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-white border-gray-300 placeholder-gray-400'}`}
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="requires_npi"
                {...register('requires_npi')}
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <Label htmlFor="requires_npi" className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Requires NPI (National Provider Identifier)
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="requires_license"
                {...register('requires_license')}
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <Label htmlFor="requires_license" className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Requires Active License
              </Label>
            </div>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Status *
            </Label>
            <select
              id="status"
              {...register('status', { required: true })}
              className={`mt-1.5 w-full px-3 py-2 rounded-md border text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="voided">Voided</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={theme === 'dark' ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : ''}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-gray-800'}
            >
              {editingRole ? 'Update Role' : 'Add Role'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
