import React, { useState, useEffect } from 'react';
import { X, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Organization, OrganizationFormData } from '../types/organization.types';

interface AddOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrganizationFormData) => void;
  editingOrganization?: Organization | null;
}

export const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingOrganization,
}) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    type: '',
  });

  useEffect(() => {
    if (editingOrganization) {
      setFormData({
        name: editingOrganization.name,
        address: editingOrganization.address || '',
        phone: editingOrganization.phone || '',
        email: editingOrganization.email || '',
        website: editingOrganization.website || '',
        type: editingOrganization.type || '',
      });
    } else {
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        type: '',
      });
    }
  }, [editingOrganization, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto`}>
        <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <Building2 className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {editingOrganization ? 'Edit Organization' : 'Add New Organization'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Organization Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., ORACLE"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : ''}`}
              required
            />
          </div>

          <div>
            <Label htmlFor="type" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Type
            </Label>
            <Input
              id="type"
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="e.g., Hospice, Hospital, Clinic"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : ''}`}
            />
          </div>

          <div>
            <Label htmlFor="address" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Address
            </Label>
            <Input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Street address, City, State ZIP"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : ''}`}
            />
          </div>

          <div>
            <Label htmlFor="phone" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(555) 123-4567"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : ''}`}
            />
          </div>

          <div>
            <Label htmlFor="email" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@organization.com"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : ''}`}
            />
          </div>

          <div>
            <Label htmlFor="website" className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              Website
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://organization.com"
              className={`mt-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : ''}`}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={`flex-1 ${theme === 'dark' ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : ''}`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`flex-1 ${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              {editingOrganization ? 'Update' : 'Add'} Organization
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
