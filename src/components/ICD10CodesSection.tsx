import React, { useState } from 'react';
import { Plus, ChevronDown, Trash2, FileDown, Edit2, GripVertical } from 'lucide-react';

interface ICD10Code {
  id: string;
  code: string;
  description: string;
  count: number;
  ratio: string;
  isPrimary?: boolean;
}

const MOCK_ICD10_CODES: ICD10Code[] = [
  {
    id: '1',
    code: 'D63.1',
    description: 'Anemia in chronic kidney disease',
    count: 0,
    ratio: '',
    isPrimary: false,
  },
  {
    id: '2',
    code: 'I13.0',
    description: 'Hypertensive heart and chronic kidney disease',
    count: 0,
    ratio: '',
    isPrimary: false,
  },
  {
    id: '3',
    code: 'F03.92',
    description: 'Unspecified dementia, unspecified seve...',
    count: 0,
    ratio: '',
    isPrimary: false,
  },
  {
    id: '4',
    code: 'F03.93',
    description: 'Unspecified dementia, unspecified seve...',
    count: 0,
    ratio: '',
    isPrimary: false,
  },
  {
    id: '5',
    code: 'I145.30',
    description: 'Unspecified macular degeneration',
    count: 0,
    ratio: '0/3',
    isPrimary: false,
  },
  {
    id: '6',
    code: 'J44.9',
    description: 'Chronic obstructive pulmonar...',
    count: 0,
    ratio: '0/2',
    isPrimary: false,
  },
  {
    id: '7',
    code: 'I48.0',
    description: 'Paroxysmal atrial fibrillation',
    count: 0,
    ratio: '0/1',
    isPrimary: false,
  },
  {
    id: '8',
    code: 'Z86.73',
    description: 'Personal history of transient ischemi...',
    count: 0,
    ratio: '0/1',
    isPrimary: false,
  },
  {
    id: '9',
    code: 'K21.0',
    description: 'Gastro-esophageal reflux disease ...',
    count: 0,
    ratio: '0/1',
    isPrimary: false,
  },
  {
    id: '10',
    code: 'E78.2',
    description: 'Mixed hyperlipidemia',
    count: 0,
    ratio: '0/1',
    isPrimary: false,
  },
];

export const ICD10CodesSection: React.FC = () => {
  const [codes, setCodes] = useState<ICD10Code[]>(MOCK_ICD10_CODES);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, codeId: string) => {
    setDraggedItem(codeId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = codes.findIndex(c => c.id === draggedItem);
    const targetIndex = codes.findIndex(c => c.id === targetId);

    const newCodes = [...codes];
    const [removed] = newCodes.splice(draggedIndex, 1);
    newCodes.splice(targetIndex, 0, removed);

    setCodes(newCodes);
    setDraggedItem(null);
  };

  const handleDelete = (codeId: string) => {
    setCodes(codes.filter(code => code.id !== codeId));
  };

  const handleEdit = (codeId: string) => {
    console.log('Edit code:', codeId);
    // Edit functionality would go here
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-white">ICD 10 CM Codes</h3>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Comorbidity: No</span>
            <span>Clinical Group: Unknown</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1.5">
            <FileDown className="w-3.5 h-3.5" />
            CSV
          </button>
          <button className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1.5">
            <FileDown className="w-3.5 h-3.5" />
            JSON
          </button>
        </div>
      </div>

      {/* Add Code Button */}
      <div className="px-6 py-3 border-b border-slate-800">
        <button className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Code
        </button>
      </div>

      {/* Codes List */}
      <div className="flex-1 overflow-auto">
        <div>
          {codes.map((code) => (
            <div
              key={code.id}
              draggable
              onDragStart={(e) => handleDragStart(e, code.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, code.id)}
              className="px-4 py-3 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group cursor-move"
            >
              <div className="flex items-center gap-3">
                {/* Drag Handle */}
                <div className="text-slate-600 group-hover:text-slate-400 transition-colors">
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* Primary Indicator (Blue Circle) */}
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>

                {/* Code */}
                <div className="flex items-center gap-2 min-w-[80px]">
                  <span className="text-sm font-mono text-slate-300">{code.code}</span>
                </div>

                {/* Description */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">{code.description}</p>
                </div>

                {/* Count Badges */}
                <div className="flex items-center gap-2">
                  {/* First Badge */}
                  <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-300">{code.count}</span>
                  </div>
                  {/* Second Badge */}
                  <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-300">{code.count}</span>
                  </div>
                </div>

                {/* Ratio with Chevron */}
                {code.ratio && (
                  <div className="flex items-center gap-1">
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-400 min-w-[35px]">{code.ratio}</span>
                  </div>
                )}

                {/* Action Buttons - Circular */}
                <div className="flex items-center gap-2">
                  {/* Edit Button - Blue Circle */}
                  <button
                    onClick={() => handleEdit(code.id)}
                    className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Edit code"
                  >
                    <Edit2 className="w-4 h-4 text-white" />
                  </button>
                  {/* Delete Button - Red Circle */}
                  <button
                    onClick={() => handleDelete(code.id)}
                    className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Delete code"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {codes.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-slate-400 mb-4">No ICD-10 codes added yet</p>
              <button className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Add Your First Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
