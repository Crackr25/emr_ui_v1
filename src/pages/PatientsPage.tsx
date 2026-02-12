import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Upload } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { StatusBadge } from '../components/StatusBadge';
import { Patient } from '../types/patient.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock Data
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: ' One Up',
    mrn: 'MRN-2024-001',
    filesStatus: 'processed',
    filesCount: 12,
    stage: 'processed',
    organization: 'General Hospital',
    tasks: 3,
    createdAt: '2024-02-10',
  },
  {
    id: '2',
    name: 'Jane Doe',
    mrn: 'MRN-2024-002',
    filesStatus: 'pending',
    filesCount: 5,
    stage: 'pending',
    organization: 'City Medical Center',
    tasks: 7,
    createdAt: '2024-02-11',
  },
  {
    id: '3',
    name: 'David Smith',
    mrn: 'MRN-2024-003',
    filesStatus: 'hold',
    filesCount: 3,
    stage: 'hold',
    organization: 'Regional Clinic',
    tasks: 2,
    createdAt: '2024-02-09',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    mrn: 'MRN-2024-004',
    filesStatus: 'no_files',
    stage: 'pending',
    organization: 'Metro Health',
    tasks: 1,
    createdAt: '2024-02-12',
  },
  {
    id: '5',
    name: 'Michael Brown',
    mrn: 'MRN-2024-005',
    filesStatus: 'processed',
    filesCount: 8,
    stage: 'processed',
    organization: 'University Hospital',
    tasks: 5,
    createdAt: '2024-02-08',
  },
  {
    id: '6',
    name: 'Emily Davis',
    mrn: 'MRN-2024-006',
    filesStatus: 'pending',
    filesCount: 2,
    stage: 'pending',
    organization: 'Community Care',
    tasks: 4,
    createdAt: '2024-02-11',
  },
];

interface PatientsPageProps {
  onNavigate?: (page: string) => void;
  onPatientSelect?: (patientName: string, patientMRN: string) => void;
}

export const PatientsPage: React.FC<PatientsPageProps> = ({ onNavigate, onPatientSelect }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPatients(MOCK_PATIENTS.map(p => p.id));
    } else {
      setSelectedPatients([]);
    }
  };

  const handleSelectPatient = (patientId: string, checked: boolean) => {
    if (checked) {
      setSelectedPatients([...selectedPatients, patientId]);
    } else {
      setSelectedPatients(selectedPatients.filter(id => id !== patientId));
    }
  };

  const filteredPatients = MOCK_PATIENTS.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Sidebar currentPage="Patients" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Patients</h1>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage and track patient records
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className={`text-xs ${theme === 'dark' ? 'border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700' : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <Upload className="w-3.5 h-3.5 mr-1.5" />
                Import
              </Button>
              <Button size="sm" className={`text-xs ${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}>
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add Patient
              </Button>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-9 h-9 text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus-visible:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus-visible:ring-blue-500'}`}
              />
            </div>

            {/* Filter Button */}
            <Button variant="outline" size="sm" className={`text-xs ${theme === 'dark' ? 'border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700' : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <Filter className="w-3.5 h-3.5 mr-1.5" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto px-8 py-4">
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden`}>
            <Table>
              <TableHeader>
                <TableRow className={`border-b ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-900' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <TableHead className="w-10 py-2">
                    <Checkbox
                      checked={selectedPatients.length === MOCK_PATIENTS.length}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all patients"
                      className="rounded border-zinc-700"
                    />
                  </TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Patient Name</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>MRN</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Files</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Stage</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Organization</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Tasks</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Created At</TableHead>
                  <TableHead className={`text-xs font-medium py-2 w-10 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className={`border-b ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-800/50' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    {/* Checkbox */}
                    <TableCell className="py-2">
                      <Checkbox
                        checked={selectedPatients.includes(patient.id)}
                        onCheckedChange={(checked) => handleSelectPatient(patient.id, checked as boolean)}
                        aria-label={`Select ${patient.name}`}
                        className={`rounded ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-300'}`}
                      />
                    </TableCell>

                    {/* Patient Name */}
                    <TableCell className="py-2">
                      <button
                        onClick={() => onPatientSelect?.(patient.name, patient.mrn)}
                        className="flex items-center gap-2 hover:opacity-70 transition-opacity text-left w-full"
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                          <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                            {patient.name.charAt(0)}
                          </span>
                        </div>
                        <span className={`text-sm font-medium hover:underline ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {patient.name}
                        </span>
                      </button>
                    </TableCell>

                    {/* MRN */}
                    <TableCell className="py-2">
                      <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>{patient.mrn}</span>
                    </TableCell>

                    {/* Files */}
                    <TableCell className="py-2">
                      <StatusBadge
                        status={patient.filesStatus}
                        filesCount={patient.filesCount}
                        type="files"
                      />
                    </TableCell>

                    {/* Stage */}
                    <TableCell className="py-2">
                      <StatusBadge status={patient.stage} type="stage" />
                    </TableCell>

                    {/* Organization */}
                    <TableCell className="py-2">
                      <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>{patient.organization}</span>
                    </TableCell>

                    {/* Tasks */}
                    <TableCell className="py-2">
                      <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>{patient.tasks}</span>
                    </TableCell>

                    {/* Created At */}
                    <TableCell className="py-2">
                      <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>{patient.createdAt}</span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                        aria-label={`Actions for ${patient.name}`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Info */}
          <div className={`mt-3 flex items-center justify-between text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
            <p>
              Showing <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{filteredPatients.length}</span> of{' '}
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{MOCK_PATIENTS.length}</span> patients
            </p>
            <div className="flex items-center gap-4">
              <span>Rows per page: 10</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
