import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  Copy,
  FileText
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { ICD10CodesSection } from '../components/ICD10CodesSection';

interface PatientDetailPageProps {
  onNavigate?: (page: string) => void;
  patientName?: string;
  patientMRN?: string;
}

export const PatientDetailPage: React.FC<PatientDetailPageProps> = ({ 
  onNavigate,
  patientName = 'LIME, HEALTH',
  patientMRN = 'MRN: 123456789'
}) => {
  const [activeTab, setActiveTab] = useState('Intake');
  const [hasPDF, setHasPDF] = useState(false); // Toggle this to test both states
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const tabs = [
    'Rules',
    'Intake',
    'ICD-10 Codes',
    'Insurance',
    'Ask AI',
    'Tasks',
    'Notes',
    'Plan of Care',
    'Visits'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setHasPDF(true);
      console.log('📄 PDF Uploaded:', file.name);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar currentPage="Patients" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">{patientName}</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-slate-400">{patientMRN}</span>
                <span className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded">
                  Production get/meal
                </span>
                <span className="text-sm text-slate-400">Created: Dec 19, 2025</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-slate-900 border-b border-slate-800 px-8">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Document Viewer */}
          <div className="w-1/2 border-r border-slate-800 flex flex-col bg-slate-900">
            {/* Document Viewer Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Document Viewer</h3>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    Upload document
                  </div>
                </label>
              </div>
            </div>

            {/* Document Viewer Content */}
            <div className="flex-1 overflow-auto">
              {hasPDF ? (
                <div className="h-full flex flex-col">
                  {/* PDF Controls */}
                  <div className="px-6 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">
                        charts_3ef69bc7_b82a...
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-400">Pages highlight</span>
                        <button 
                          className="p-1 hover:bg-slate-800 rounded transition-colors"
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="w-4 h-4 text-slate-400" />
                        </button>
                        <span className="text-xs text-slate-300 px-2">
                          Page {currentPage} / {totalPages}
                        </span>
                        <button 
                          className="p-1 hover:bg-slate-800 rounded transition-colors"
                          aria-label="Next page"
                        >
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1.5 hover:bg-slate-800 rounded transition-colors"
                        aria-label="Download document"
                      >
                        <Download className="w-4 h-4 text-slate-400" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-slate-800 rounded transition-colors"
                        aria-label="Maximize viewer"
                      >
                        <Maximize2 className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {/* PDF Preview */}
                  <div className="flex-1 p-6 bg-slate-800/30 overflow-auto">
                    <div className="bg-white rounded shadow-lg p-8 max-w-2xl mx-auto">
                      <div className="text-slate-900 text-sm space-y-4">
                        <p className="font-semibold">Patient is mentally sharp most days...</p>
                        <p className="text-xs leading-relaxed">
                          Today I start of care I assess the patient in the home Vital signs vs call pulse 78 bpm per radial 
                          80% regular heart 71. Temp weight 165 lb respirations 16 if patient respiratory heart is 
                          regular and strong blood pressure 130 over 72 right arm lying 134 per 80 sitting 130 per 78 standing 
                          122 per 74 afribrate notification parameters were within normal limits...
                        </p>
                        <p className="text-xs leading-relaxed">
                          [Additional medical text content would appear here in a real PDF viewer]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // No PDF State
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      No Document Uploaded
                    </h3>
                    <p className="text-sm text-slate-400 mb-6">
                      Upload a PDF document to view patient records and medical information.
                    </p>
                    <label className="cursor-pointer inline-block">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Document
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Content based on active tab */}
          <div className="w-1/2 flex flex-col bg-slate-950">
            {/* Render content based on active tab */}
            {activeTab === 'ICD-10 Codes' ? (
              <ICD10CodesSection />
            ) : (
              <>
                {/* Intake Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Patient Intake</h3>
                  <button className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Recalculate
                  </button>
                </div>

                {/* Intake Content */}
                <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
              {/* Meds Section */}
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">Meds</h4>
                  <button className="p-1 hover:bg-slate-800 rounded transition-colors">
                    <Copy className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Atorvastatin 80 mg daily for cholesterol</li>
                  <li>• Amlodipine 5 mg daily for blood pressure and heart failure</li>
                  <li>• Pantoprazole 40 mg every morning for prevention of heartburn</li>
                  <li>• Sertraline 100 mg daily</li>
                  <li>• Albuterol inhaler 90 mcg, 2 puffs every 6 hours as needed for wheezing or shortness of breath</li>
                  <li>• Levothyroxine 137 mcg every morning</li>
                  <li>• Metoprolol tartrate 25 mg twice daily</li>
                  <li>• Furosemide 20 mg (0.5 tablet) daily</li>
                  <li>• Ibuprofen XL 150 mg daily</li>
                  <li>• Memantine starting 5 mg daily, titrating to 10 mg twice daily</li>
                  <li>• Sertraline 25 mg daily for mood (added in dementia care plan)</li>
                </ul>
              </div>

              {/* Summary of Past Treatment Section */}
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">Summary of Past Treatment</h4>
                  <button 
                    className="p-1 hover:bg-slate-800 rounded transition-colors"
                    aria-label="Copy summary"
                  >
                    <Copy className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The patient was referred for routine dementia management and care-plan reassessment. Additionally, there is a follow-up for multiple chronic conditions including diabetes with insulin dependency, congestive heart failure, and others. The referral also involves management of cognitive decline with activities of daily living, cognitive testing results, behavioral symptoms such as increased nighttime wandering and occasional verbal agitation, and assistance needs with activities such as bathing and dressing. The patient has a history of congestive heart failure, management of diabetes with oral hypoglycemics plus insulin, and cardiovascular and other chronic conditions. The patient has also been receiving home health care support, caregiver training, and monitoring of complex medical issues.
                </p>
              </div>

              {/* Primary Diagnosis Section */}
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">Primary Diagnosis</h4>
                  <button 
                    className="p-1 hover:bg-slate-800 rounded transition-colors"
                    aria-label="Copy diagnosis"
                  >
                    <Copy className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The primary diagnosis is congestive heart failure, as the patient was recently hospitalized for this condition and requires ongoing monitoring and management.
                </p>
              </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
