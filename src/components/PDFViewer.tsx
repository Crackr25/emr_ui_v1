import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '../context/ThemeContext';

export const PDFViewer: React.FC = () => {
  const { theme } = useTheme();
  const [hasPDF, setHasPDF] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setHasPDF(true);
      console.log('📄 PDF Uploaded:', file.name);
    }
  };

  return (
    <div className={`w-1/2 flex flex-col border-r ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      {/* Document Header */}
      <div className={`px-6 py-3 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Document Viewer</h3>
          <div className="flex items-center gap-2">
            <label htmlFor="pdf-upload">
              <Button variant="ghost" size="sm" className={`text-xs h-7 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300 hover:bg-zinc-800' : 'text-blue-600 hover:text-blue-700 hover:bg-gray-100'}`} asChild>
                <span className="cursor-pointer">
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  Upload document
                </span>
              </Button>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <Button variant="ghost" size="sm" className={`text-xs h-7 px-2 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
              charts_3ef69bc7
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="ghost" size="icon" className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
              <Download className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
              <Maximize2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              <FileText className="w-3.5 h-3.5" />
              <span className="truncate max-w-[150px]">charts_3ef69bc7-b82a...</span>
              <Switch className="h-3 w-6 data-[state=checked]:bg-blue-600" defaultChecked />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <ChevronLeft className={`w-3 h-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`} />
              <div className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
                <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Highlights</span>
                <span className="ml-1">(8)</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className={`text-xs min-w-[60px] text-center ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Page {currentPage} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className={`h-7 w-7 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300 hover:bg-zinc-800' : 'text-blue-600 hover:text-blue-700 hover:bg-gray-100'}`}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      {hasPDF ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* PDF Controls */}
          <div className={`px-6 py-2 border-b flex items-center justify-between ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>charts_3ef69bc7_b82a...</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Page {currentPage} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="w-px h-5 bg-zinc-700 mx-2"></div>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                aria-label="Download PDF"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                aria-label="Maximize viewer"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* PDF Preview */}
          <div className={`flex-1 overflow-auto p-6 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-100'}`}>
            <div className={`bg-white rounded-lg shadow-2xl p-8 max-w-3xl mx-auto ${theme === 'dark' ? 'bg-zinc-900' : ''}`}>
              <div className="space-y-4 text-zinc-900 text-sm leading-relaxed">
                <p>
                  Patient is reporting strong chest pain. Patient needs a wheelchair to move around the house. Patient has
                  difficulty completing any out of bed independently without human assistance or assistive devices...
                </p>
                <p>
                  VITAL SIGNS: Blood pressure 140/90 mmHg, heart rate 88 bpm, respiratory rate 18 breaths per minute,
                  temperature 98.6°F, oxygen saturation 96% on room air...
                </p>
                <p>
                  Today I start of care I assessed the patient in his home. Vital signs as call posts 78 regular radial
                  60% regular height 70 inches weight 180 lb temperature 98.6 F fahrenheit respiratory height 18 in
                  blood pressure 120 over 78 right arm lying 134 per 80 sitting 130 per 78 standing 122 per 74...
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex-1 flex items-center justify-center p-8 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-100'}`}>
          <div className="text-center">
            <div className={`w-32 h-32 mx-auto mb-6 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white border border-gray-300'}`}>
              <FileText className={`w-16 h-16 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No Document Uploaded</h3>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
              Upload a PDF document to view patient records and medical history
            </p>
            <label htmlFor="pdf-upload-empty">
              <Button size="sm" className={`bg-blue-600 hover:bg-blue-700 text-white text-xs ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`} asChild>
                <span className="cursor-pointer">
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  Upload Document
                </span>
              </Button>
              <input
                id="pdf-upload-empty"
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
