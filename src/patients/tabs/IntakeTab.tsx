import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '../../context/ThemeContext';

export const IntakeTab: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-1/2 flex flex-col ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <div className={`px-6 py-3 border-b flex items-center justify-between ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
        <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Patient Intake</h3>
        <Button size="sm" className={`text-xs ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
          Recalculate
        </Button>
      </div>

      <div className="flex-1 overflow-auto px-6 py-4 space-y-4">
        {/* Meds Card */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Meds</CardTitle>
            <Button variant="ghost" size="icon" className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}>
              <Copy className="w-3.5 h-3.5" />
            </Button>
          </CardHeader>
          <CardContent className={`text-xs space-y-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
            <ul className="space-y-1.5">
              <li>• Atorvastatin 80 mg daily for cholesterol</li>
              <li>• Spironolactone 25 mg daily for blood pressure and heart failure</li>
              <li>• Famotidine 40 mg every morning for prevention of heartburn</li>
              <li>• Ferrous sulfate 325 mg daily for anemia</li>
              <li>• Albuterol inhaler 90 mcg, 2 puffs every 6 hours as needed for wheezing or shortness of breath</li>
              <li>• Levothyroxine 137 mcg every morning</li>
              <li>• Metoprolol tartrate 25 mg twice daily</li>
              <li>• Furosemide 20 mg (0.5 tablet) daily</li>
              <li>• Ibuprofen XL 150 mg daily</li>
              <li>• Memantine starting 5 mg daily, titrating to 10 mg twice daily</li>
              <li>• Sertraline 25 mg daily for mood (added in dementia care plan)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Summary of Past Treatment
              </CardTitle>
              <Button variant="ghost" size="icon" className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}>
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              The patient was referred for routine dementia management and care-plan reassessment. Additionally, there is a follow-up for multiple chronic conditions including diabetes with insulin dependence, congestive heart failure, and others. The referral also involves management of cognitive decline evidenced by cognitive testing results, behavioral symptoms such as increased nighttime wandering and occasional verbal agitation, and assistance needs with activities of daily living. The care plan includes medication management for dementia, heart failure, management of diabetes with oral hypoglycemics plus insulin, and various medications for cardiovascular and other conditions. The patient has also been receiving home health care support, caregiver training, and monitoring of complex medical issues.
            </p>
          </CardContent>
        </Card>

        {/* Primary Diagnosis Card */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Primary Diagnosis
              </CardTitle>
              <Button variant="ghost" size="icon" className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}>
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              The primary diagnosis is congestive heart failure, as the patient was recently hospitalized for this condition and requires ongoing monitoring and management.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
