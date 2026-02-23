import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AddIntakeFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IntakeFieldFormData) => void;
}

export interface IntakeFieldFormData {
  fieldName: string;
  set: string;
  systemPrompt: string;
  example1: string;
  example2: string;
  multilineField: boolean;
}

export const AddIntakeFieldModal: React.FC<AddIntakeFieldModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<IntakeFieldFormData>({
    fieldName: '',
    set: '',
    systemPrompt: '',
    example1: '',
    example2: '',
    multilineField: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      fieldName: '',
      set: '',
      systemPrompt: '',
      example1: '',
      example2: '',
      multilineField: false,
    });
    onClose();
  };

  const handleCancel = () => {
    // Reset form on cancel
    setFormData({
      fieldName: '',
      set: '',
      systemPrompt: '',
      example1: '',
      example2: '',
      multilineField: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`rounded-lg shadow-2xl w-full max-w-lg border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          {/* Header */}
          <div className={`flex items-center justify-between px-6 py-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
            <h2 className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>New Intake Field</h2>
            <button
              onClick={handleCancel}
              className={`transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Field Name */}
            <div>
              <label htmlFor="fieldName" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Field Name
              </label>
              <input
                id="fieldName"
                type="text"
                value={formData.fieldName}
                onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
                placeholder='Enter intake field name (e.g., "Patient Age")'
                required
                className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500'}`}
              />
            </div>

            {/* Set */}
            <div>
              <label htmlFor="set" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Set
              </label>
              <div className="flex gap-2">
                <select
                  id="set"
                  value={formData.set}
                  onChange={(e) => setFormData({ ...formData, set: e.target.value })}
                  className={`flex-1 px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white focus:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
                  aria-label="Select a set"
                >
                  <option value="">Select a set</option>
                  <option value="General">General</option>
                  <option value="Medical">Medical</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Custom">Custom</option>
                </select>
                <button
                  type="button"
                  className={`px-3 py-2.5 border rounded-md transition-colors ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300 hover:text-white' : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700 hover:text-gray-900'}`}
                  aria-label="Add new set"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* System Prompt */}
            <div>
              <label htmlFor="systemPrompt" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                System Prompt (Optional)
              </label>
              <textarea
                id="systemPrompt"
                value={formData.systemPrompt}
                onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                placeholder="Enter instructions for extracting this field..."
                rows={3}
                className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500'}`}
              />
              <p className={`mt-1.5 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Provide instructions for how this field should be extracted from documents.
              </p>
            </div>

            {/* Example 1 */}
            <div>
              <label htmlFor="example1" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Example 1 (Optional)
              </label>
              <textarea
                id="example1"
                value={formData.example1}
                onChange={(e) => setFormData({ ...formData, example1: e.target.value })}
                placeholder="Enter example value..."
                rows={2}
                className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500'}`}
              />
            </div>

            {/* Example 2 */}
            <div>
              <label htmlFor="example2" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Example 2 (Optional)
              </label>
              <textarea
                id="example2"
                value={formData.example2}
                onChange={(e) => setFormData({ ...formData, example2: e.target.value })}
                placeholder="Enter another example value..."
                rows={2}
                className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500'}`}
              />
            </div>

            {/* Multiline Field Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="multilineField"
                type="checkbox"
                checked={formData.multilineField}
                onChange={(e) => setFormData({ ...formData, multilineField: e.target.checked })}
                className={`w-3.5 h-3.5 rounded focus:ring-2 focus:ring-offset-0 ${theme === 'dark' ? 'border-zinc-700 bg-zinc-800 text-white focus:ring-zinc-600' : 'border-gray-300 bg-white text-blue-600 focus:ring-blue-500'}`}
              />
              <label htmlFor="multilineField" className={`text-xs ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                Multiline field
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:text-white hover:bg-zinc-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${theme === 'dark' ? 'bg-black hover:bg-zinc-800 text-white' : 'bg-black hover:bg-gray-800 text-white'}`}
              >
                <Plus className="w-4 h-4" />
                Create Intake Field
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
