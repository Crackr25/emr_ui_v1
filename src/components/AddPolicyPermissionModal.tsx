import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PolicyPermission, PolicyPermissionFormData } from '../types/policy.types';

interface AddPolicyPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PolicyPermissionFormData) => void;
  editingPermission?: PolicyPermission | null;
  policyGroups: Array<{ policy_id: string; policy_name: string }>;
}

export const AddPolicyPermissionModal: React.FC<AddPolicyPermissionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingPermission,
  policyGroups 
}) => {
  const { theme } = useTheme();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PolicyPermissionFormData>({
    defaultValues: {
      policy_id: '',
      perm_domain: '',
      perm_target: '',
      perm_action: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (editingPermission) {
      reset({
        policy_id: editingPermission.policy_id,
        perm_domain: editingPermission.perm_domain,
        perm_target: editingPermission.perm_target,
        perm_action: editingPermission.perm_action,
        status: editingPermission.status,
      });
    } else {
      reset({
        policy_id: '',
        perm_domain: '',
        perm_target: '',
        perm_action: '',
        status: 'active',
      });
    }
  }, [editingPermission, reset]);

  const handleFormSubmit = (data: PolicyPermissionFormData) => {
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
            {editingPermission ? 'Edit Permission' : 'Add New Permission'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 py-4 space-y-4">
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
            <Label htmlFor="perm_domain" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Domain *
            </Label>
            <Input
              id="perm_domain"
              {...register('perm_domain', { required: 'Domain is required' })}
              placeholder="e.g., Patient, Billing"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
            />
            {errors.perm_domain && (
              <p className="text-xs text-red-500 mt-1">{errors.perm_domain.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="perm_target" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Target Resource *
            </Label>
            <Input
              id="perm_target"
              {...register('perm_target', { required: 'Target is required' })}
              placeholder="e.g., Records, Files"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
            />
            {errors.perm_target && (
              <p className="text-xs text-red-500 mt-1">{errors.perm_target.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="perm_action" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Action *
            </Label>
            <select
              id="perm_action"
              {...register('perm_action', { required: 'Action is required' })}
              className={`mt-1.5 w-full px-3 py-2 rounded-md border text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="">Select an action</option>
              <option value="View">View</option>
              <option value="Create">Create</option>
              <option value="Update">Update</option>
              <option value="Delete">Delete</option>
              <option value="Archive">Archive</option>
              <option value="Export">Export</option>
            </select>
            {errors.perm_action && (
              <p className="text-xs text-red-500 mt-1">{errors.perm_action.message}</p>
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
              {editingPermission ? 'Update Permission' : 'Add Permission'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
