import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

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
        <div className="bg-slate-900 rounded-lg shadow-2xl w-full max-w-md border border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">New Intake Field</h2>
            <button
              onClick={handleCancel}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            {/* Field Name */}
            <div>
              <label htmlFor="fieldName" className="block text-sm font-medium text-slate-300 mb-2">
                Field Name
              </label>
              <input
                id="fieldName"
                type="text"
                value={formData.fieldName}
                onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
                placeholder='Enter intake field name (e.g., "Patient Age")'
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Set */}
            <div>
              <label htmlFor="set" className="block text-sm font-medium text-slate-300 mb-2">
                Set
              </label>
              <div className="flex gap-2">
                <select
                  id="set"
                  value={formData.set}
                  onChange={(e) => setFormData({ ...formData, set: e.target.value })}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                  className="px-3 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                  aria-label="Add new set"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* System Prompt */}
            <div>
              <label htmlFor="systemPrompt" className="block text-sm font-medium text-slate-300 mb-2">
                System Prompt (Optional)
              </label>
              <textarea
                id="systemPrompt"
                value={formData.systemPrompt}
                onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                placeholder="Enter instructions for extracting this field..."
                rows={4}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              />
              <p className="mt-1 text-xs text-slate-500">
                Provide instructions for how this field should be extracted from documents.
              </p>
            </div>

            {/* Example 1 */}
            <div>
              <label htmlFor="example1" className="block text-sm font-medium text-slate-300 mb-2">
                Example 1 (Optional)
              </label>
              <textarea
                id="example1"
                value={formData.example1}
                onChange={(e) => setFormData({ ...formData, example1: e.target.value })}
                placeholder="Enter example value..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Example 2 */}
            <div>
              <label htmlFor="example2" className="block text-sm font-medium text-slate-300 mb-2">
                Example 2 (Optional)
              </label>
              <textarea
                id="example2"
                value={formData.example2}
                onChange={(e) => setFormData({ ...formData, example2: e.target.value })}
                placeholder="Enter another example value..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Multiline Field Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="multilineField"
                type="checkbox"
                checked={formData.multilineField}
                onChange={(e) => setFormData({ ...formData, multilineField: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-0"
              />
              <label htmlFor="multilineField" className="text-sm text-slate-300">
                Multiline field
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
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
