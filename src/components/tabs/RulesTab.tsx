import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '../../context/ThemeContext';

interface Rule {
  id: string;
  status: 'pass' | 'fail' | 'follow-up';
  title: string;
  description: string;
}

const MOCK_RULES: Rule[] = [
  {
    id: '1',
    status: 'pass',
    title: 'Apoyo disponible en el hogar',
    description: 'El paciente vive con un esposa, quien es su cuidadora principal, y se menciona que su hija también lo ayuda con varias actividades.'
  },
  {
    id: '2',
    status: 'fail',
    title: 'Cannot having a tremor',
    description: "The patient's record includes a diagnosis of essential tremor (G25.0) as noted in the dementia care plan update dated April 15, 2025."
  },
  {
    id: '3',
    status: 'pass',
    title: 'IV Antibiotics.',
    description: 'The provided medical records do not indicate the patient is currently receiving IV antibiotics.'
  },
  {
    id: '4',
    status: 'fail',
    title: 'Smoker Y/N',
    description: "The patient's records explicitly state that he denies tobacco use, indicating he is not a smoker."
  }
];

export const RulesTab: React.FC = () => {
  const { theme } = useTheme();
  const passedCount = MOCK_RULES.filter(r => r.status === 'pass').length;
  const failedCount = MOCK_RULES.filter(r => r.status === 'fail').length;
  const followUpCount = MOCK_RULES.filter(r => r.status === 'follow-up').length;

  return (
    <div className={`w-1/2 flex flex-col overflow-auto ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`px-6 py-3 border-b flex items-center justify-between ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div>
          <h3 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Rules</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-green-500">Passed: {passedCount}</span>
            <span className="text-red-500">Failed: {failedCount}</span>
            <span className="text-yellow-500">Follow Up: {followUpCount}</span>
          </div>
        </div>
        <Button size="sm" className={`text-xs ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
          Recalculate
        </Button>
      </div>

      {/* Rules List */}
      <div className="flex-1 overflow-auto px-6 py-4 space-y-3">
        {MOCK_RULES.map((rule) => (
          <Card
            key={rule.id}
            className={`p-4 border ${
              theme === 'dark'
                ? rule.status === 'pass'
                  ? 'bg-green-950/30 border-green-800/50'
                  : rule.status === 'fail'
                  ? 'bg-red-950/30 border-red-800/50'
                  : 'bg-yellow-950/30 border-yellow-800/50'
                : rule.status === 'pass'
                ? 'bg-green-50 border-green-300'
                : rule.status === 'fail'
                ? 'bg-red-50 border-red-300'
                : 'bg-yellow-50 border-yellow-300'
            }`}
          >
            {/* Rule Header */}
            <div className="flex items-start gap-2 mb-2">
              {rule.status === 'pass' ? (
                <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-green-500' : 'text-green-600'}`} />
              ) : rule.status === 'fail' ? (
                <XCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`} />
              ) : (
                <AlertCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-600'}`} />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      theme === 'dark'
                        ? rule.status === 'pass'
                          ? 'bg-green-500/20 text-green-400'
                          : rule.status === 'fail'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                        : rule.status === 'pass'
                        ? 'bg-green-100 text-green-700'
                        : rule.status === 'fail'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {rule.status === 'pass' ? 'Pass' : rule.status === 'fail' ? 'Fail' : 'Follow Up'}
                  </span>
                </div>
                <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{rule.title}</h4>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>{rule.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
