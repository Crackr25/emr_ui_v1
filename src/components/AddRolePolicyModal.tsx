import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RolePolicyFormData } from '../types/policy.types';

interface AddRolePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RolePolicyFormData) => void;
  roles: Array<{ role_id: string; role_name: string }>;
  policyGroups: Array<{ policy_id: string; policy_name: string }>;
  preselectedRoleId?: string;
}

export const AddRolePolicyModal: React.FC<AddRolePolicyModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  roles,
  policyGroups,
  preselectedRoleId
}) => {
  const { theme } = useTheme();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RolePolicyFormData>({
    defaultValues: {
      role_id: preselectedRoleId || '',
      policy_id: '',
      status: 'active',
    },
  });

  const handleFormSubmit = (data: RolePolicyFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className={`relative w-full max-w-md mx-4 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className={`flex items-center justify-between px-6 py-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Assign Policy to Role
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 py-4 space-y-4">          <div>
            <Label htmlFor="role_id" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Role *
            </Label>
            <select
              id="role_id"
              {...register('role_id', { required: 'Role is required' })}
              disabled={!!preselectedRoleId}
              className={`mt-1.5 w-full px-3 py-2 rounded-md border text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${preselectedRoleId ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <option value="">Select a role</option>
              {roles.map(role => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="text-xs text-red-500 mt-1">{errors.role_id.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="policy_id" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Policy Group *
            </Label>
            <select
              id="policy_id"
              {...register('policy_id', { required: 'Policy group is required' })}
              className={`mt-1.5 w-full px-3 py-2 rounded-md border text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="">Select a policy group</option>
              {policyGroups.map(pg => (
                <option key={pg.policy_id} value={pg.policy_id}>
                  {pg.policy_name}
                </option>
              ))}
            </select>
            {errors.policy_id && (
              <p className="text-xs text-red-500 mt-1">{errors.policy_id.message}</p>
            )}
          </div>

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
              Assign Policy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
