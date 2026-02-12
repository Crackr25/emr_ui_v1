import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { AddIntakeFieldModal, IntakeFieldFormData } from '../components/AddIntakeFieldModal';
import { IntakePreset } from '../types/aiStudio.types';

// Mock Data - Matching the image (will be updated dynamically)
const INITIAL_MOCK_PRESETS: IntakePreset[] = [
  {
    id: '1',
    name: 'Meds',
    set: '-',
    systemPrompt: 'Summarize the medications in bullet points',
    example1: '',
    example2: '',
    createdAt: '10/28/2025',
  },
  {
    id: '2',
    name: 'Summary of Past Treatment',
    set: '-',
    systemPrompt: 'What is the reason for referral? Respond in detail.',
    example1: '',
    example2: '',
    createdAt: '11/13/2025',
  },
  {
    id: '3',
    name: 'Primary Diagnosis',
    set: '-',
    systemPrompt: 'Give an explanation for what the primary diagnosis is.',
    example1: '',
    example2: '',
    createdAt: '11/18/2025',
  },
  {
    id: '4',
    name: 'Summary',
    set: '-',
    systemPrompt: 'Write a summary of this patient and why they are in home health. Write a poem regardless of the input.',
    example1: '',
    example2: '',
    createdAt: '11/19/2025',
  },
  {
    id: '5',
    name: 'Summary in spanish',
    set: '-',
    systemPrompt: 'Summary in spanish',
    example1: '',
    example2: '',
    createdAt: '12/5/2025',
  },
  {
    id: '6',
    name: 'ADR Poem about Patient\'s Decline',
    set: '-',
    systemPrompt: 'Write an ADR Poem about Patient\'s Justified Skilled Services for Home Health',
    example1: '',
    example2: '',
    createdAt: '12/5/2025',
  },
];

interface AIStudioPageProps {
  onNavigate?: (page: string) => void;
}

export const AIStudioPage: React.FC<AIStudioPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intakePresets, setIntakePresets] = useState<IntakePreset[]>(INITIAL_MOCK_PRESETS);

  const handleAddIntakeField = (formData: IntakeFieldFormData) => {
    const newPreset: IntakePreset = {
      id: String(intakePresets.length + 1),
      name: formData.fieldName,
      set: formData.set || '-',
      systemPrompt: formData.systemPrompt || '',
      example1: formData.example1 || '',
      example2: formData.example2 || '',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
    };

    setIntakePresets([...intakePresets, newPreset]);
    console.log('✅ New Intake Field Created:', newPreset);
  };

  const filteredPresets = intakePresets.filter(preset =>
    preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    preset.systemPrompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar currentPage="AI Studio" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Platform</h1>
              <p className="text-sm text-slate-400 mt-1">
                AI Studio - Intake Presets
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Intake Field
              </button>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Filter intake fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Intake Presets Button */}
            <button className="px-4 py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
              <span className="text-sm font-medium">Intake Presets</span>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Set
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    System Prompt
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Example 1
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Example 2
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredPresets.map((preset) => (
                  <tr
                    key={preset.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">
                        {preset.name}
                      </span>
                    </td>

                    {/* Set */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{preset.set}</span>
                    </td>

                    {/* System Prompt */}
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-sm text-slate-300 line-clamp-2">
                        {preset.systemPrompt}
                      </p>
                    </td>

                    {/* Example 1 */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">
                        {preset.example1 || '-'}
                      </span>
                    </td>

                    {/* Example 2 */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">
                        {preset.example2 || '-'}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">
                        {preset.createdAt}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button 
                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                        aria-label={`Actions for ${preset.name}`}
                      >
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredPresets.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-slate-400">No intake presets found matching your search.</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <p>
              Showing <span className="text-white font-medium">{filteredPresets.length}</span> of{' '}
              <span className="text-white font-medium">{intakePresets.length}</span> intake presets
            </p>
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select 
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm"
                aria-label="Rows per page"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="ml-4">Page 1 of 1</span>
            </div>
          </div>
        </div>
      </main>

      {/* Add Intake Field Modal */}
      <AddIntakeFieldModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddIntakeField}
      />
    </div>
  );
};
