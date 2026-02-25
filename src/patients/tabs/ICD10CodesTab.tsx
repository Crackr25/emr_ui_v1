import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Plus, ChevronDown, Trash2, FileDown, Edit2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ICD10Code {
  id: string;
  code: string;
  description: string;
  count: number;
  ratio: string;
  isPrimary?: boolean;
}

const MOCK_ICD10_CODES: ICD10Code[] = [
  { id: '1', code: 'D63.1', description: 'Anemia in chronic kidney disease', count: 0, ratio: '', isPrimary: false },
  { id: '2', code: 'I13.0', description: 'Hypertensive heart and chronic kidney disease', count: 0, ratio: '', isPrimary: false },
  { id: '3', code: 'F03.92', description: 'Unspecified dementia, unspecified seve...', count: 0, ratio: '', isPrimary: false },
  { id: '4', code: 'F03.93', description: 'Unspecified dementia, unspecified seve...', count: 0, ratio: '', isPrimary: false },
  { id: '5', code: 'I145.30', description: 'Unspecified macular degeneration', count: 0, ratio: '0/3', isPrimary: false },
  { id: '6', code: 'J44.9', description: 'Chronic obstructive pulmonar...', count: 0, ratio: '0/2', isPrimary: false },
  { id: '7', code: 'I48.0', description: 'Paroxysmal atrial fibrillation', count: 0, ratio: '0/1', isPrimary: false },
  { id: '8', code: 'Z86.73', description: 'Personal history of transient ischemi...', count: 0, ratio: '0/1', isPrimary: false },
  { id: '9', code: 'K21.0', description: 'Gastro-esophageal reflux disease ...', count: 0, ratio: '0/1', isPrimary: false },
  { id: '10', code: 'E78.2', description: 'Mixed hyperlipidemia', count: 0, ratio: '0/1', isPrimary: false },
];

export const ICD10CodesTab: React.FC = () => {
  const { theme } = useTheme();
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
  };

  return (
    <div className={`w-1/2 flex flex-col ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'} overflow-auto`}>
      {/* Header */}
      <div className={`px-6 py-3 border-b border-${theme === 'dark' ? 'zinc-800' : 'gray-200'} flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ICD 10 CM Codes</h3>
          <div className={`flex items-center gap-3 text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
            <span>Comorbidity: No</span>
            <span>Clinical Group: Unknown</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className={`h-7 text-xs ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white' : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`}>
            <FileDown className="w-3.5 h-3.5 mr-1.5" />
            CSV
          </Button>
          <Button variant="outline" size="sm" className={`h-7 text-xs ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white' : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`}>
            <FileDown className="w-3.5 h-3.5 mr-1.5" />
            JSON
          </Button>
        </div>
      </div>

      {/* Add Code Button */}
      <div className={`px-6 py-2 border-b border-${theme === 'dark' ? 'zinc-800' : 'gray-200'}`}>
        <Button variant="ghost" size="sm" className={`text-${theme === 'dark' ? 'zinc-300' : 'gray-500'} hover:text-${theme === 'dark' ? 'white' : 'gray-700'} hover:bg-${theme === 'dark' ? 'zinc-800' : 'gray-100'} text-xs`}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Code
        </Button>
      </div>

      {/* Codes List */}
      <div className={`flex-1 overflow-auto p-6 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
        <div>
          {codes.map((code) => (
            <div
              key={code.id}
              draggable
              onDragStart={(e) => handleDragStart(e, code.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, code.id)}
              className={`px-3 py-2 border-b transition-colors group cursor-move ${theme === 'dark' ? 'border-zinc-800/50 hover:bg-zinc-800/30' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-2">
                <div className={`transition-colors ${theme === 'dark' ? 'text-zinc-600 group-hover:text-zinc-400' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  <GripVertical className="w-3.5 h-3.5" />
                </div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex items-center gap-2 min-w-[70px]">
                  <span className={`text-xs font-mono ${theme === 'dark' ? 'text-zinc-300' : 'text-blue-600'}`}>{code.code}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs truncate ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'}`}>{code.description}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="secondary" className={`w-5 h-5 p-0 flex items-center justify-center border-0 rounded text-xs ${theme === 'dark' ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-700 text-white'}`}>
                    {code.count}
                  </Badge>
                  <Badge variant="secondary" className={`w-5 h-5 p-0 flex items-center justify-center border-0 rounded text-xs ${theme === 'dark' ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-700 text-white'}`}>
                    {code.count}
                  </Badge>
                </div>
                {code.ratio && (
                  <div className="flex items-center gap-1">
                    <ChevronDown className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`} />
                    <span className={`text-xs min-w-[30px] ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>{code.ratio}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Button size="icon" onClick={() => handleEdit(code.id)} className="w-7 h-7 bg-blue-600 hover:bg-blue-700 rounded-full" aria-label="Edit code">
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(code.id)} className="w-7 h-7 bg-red-600 hover:bg-red-700 rounded-full" aria-label="Delete code">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
