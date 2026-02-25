import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PolicyGroup, PolicyGroupFormData } from '../types/policy.types';

interface AddPolicyGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PolicyGroupFormData) => void;
  editingPolicyGroup?: PolicyGroup | null;
}

export const AddPolicyGroupModal: React.FC<AddPolicyGroupModalProps> = ({ isOpen, onClose, onSubmit, editingPolicyGroup }) => {
  const { theme } = useTheme();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<PolicyGroupFormData>({
    defaultValues: {
      policy_name: '',
      pg_short_code: '',
      action: '',
      action_short_code: '',
      scope: '',
      section: '',
      field_exception: '',
      description: '',
      status: 'active',
    },
  });

  const pgShortCode = watch('pg_short_code');
  const actionShortCode = watch('action_short_code');

  useEffect(() => {
    if (editingPolicyGroup) {
      reset({
        policy_name: editingPolicyGroup.policy_name,
        pg_short_code: editingPolicyGroup.pg_short_code,
        action: editingPolicyGroup.action,
        action_short_code: editingPolicyGroup.action_short_code,
        scope: editingPolicyGroup.scope || '',
        section: editingPolicyGroup.section || '',
        field_exception: editingPolicyGroup.field_exception || '',
        description: editingPolicyGroup.description,
        status: editingPolicyGroup.status,
      });
    } else {
      reset({
        policy_name: '',
        pg_short_code: '',
        action: '',
        action_short_code: '',
        scope: '',
        section: '',
        field_exception: '',
        description: '',
        status: 'active',
      });
    }
  }, [editingPolicyGroup, reset]);

  const handleFormSubmit = (data: PolicyGroupFormData) => {
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
            {editingPolicyGroup ? 'Edit Policy Group' : 'Add New Policy Group'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label htmlFor="policy_name" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Policy Group Name *
              </Label>
              <Input
                id="policy_name"
                {...register('policy_name', { required: 'Policy name is required' })}
                placeholder="e.g., User management, Patient Management"
                className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
              />
              {errors.policy_name && (
                <p className="text-xs text-red-500 mt-1">{errors.policy_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="pg_short_code" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                PG Short Code *
              </Label>
              <Input
                id="pg_short_code"
                {...register('pg_short_code', { required: 'PG code is required' })}
                placeholder="e.g., um, pt, ra"
                className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
              />
              {errors.pg_short_code && (
                <p className="text-xs text-red-500 mt-1">{errors.pg_short_code.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="action" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Action *
              </Label>
              <select
                id="action"
                {...register('action', { required: 'Action is required' })}
                className={`mt-1.5 w-full px-3 py-2 rounded-md border text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="">Select action</option>
                <option value="View">View</option>
                <option value="Read">Read</option>
                <option value="Edit">Edit</option>
                <option value="Create">Create</option>
                <option value="deactivate">Deactivate</option>
                <option value="void">Void</option>
                <option value="export">Export</option>
              </select>
              {errors.action && (
                <p className="text-xs text-red-500 mt-1">{errors.action.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="action_short_code" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Action Short Code *
              </Label>
              <Input
                id="action_short_code"
                {...register('action_short_code', { required: 'Action code is required' })}
                placeholder="e.g., vw, rd, ed, cr"
                className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
              />
              {errors.action_short_code && (
                <p className="text-xs text-red-500 mt-1">{errors.action_short_code.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="scope" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Scope
              </Label>
              <Input
                id="scope"
                {...register('scope')}
                placeholder="e.g., Assigned"
                className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>

            <div>
              <Label htmlFor="section" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Section
              </Label>
              <Input
                id="section"
                {...register('section')}
                placeholder="e.g., Contact, paynotes"
                className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="field_exception" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Field Exception
              </Label>
              <Input
                id="field_exception"
                {...register('field_exception')}
                placeholder="Fields to exclude"
                className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>

            <div className="col-span-2">
              <Label className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Generated Key: <span className={`font-mono ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  {pgShortCode && actionShortCode ? `${pgShortCode}-${actionShortCode}` : '-'}
                </span>
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Description
            </Label>
            <textarea
              id="description"
              {...register('description')}
              placeholder="Brief description of the policy group"
              rows={3}
              className={`mt-1.5 w-full px-3 py-2 rounded-md border text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-white border-gray-300 placeholder-gray-400'}`}
            />
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
              {editingPolicyGroup ? 'Update Policy Group' : 'Add Policy Group'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
