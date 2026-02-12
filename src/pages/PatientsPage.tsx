import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Upload } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { StatusBadge } from '../components/StatusBadge';
import { Patient } from '../types/patient.types';

// Mock Data
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'LIME, HEALTH',
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
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar currentPage="Patients" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Platform / Patients</h1>
              <p className="text-sm text-slate-400 mt-1">
                Manage and track patient records
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Patient
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
                placeholder="Filter by name or MRN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Button */}
            <button className="px-4 py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPatients.length === MOCK_PATIENTS.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      aria-label="Select all patients"
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-0"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    MRN
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Files
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Tasks
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
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    {/* Checkbox */}
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPatients.includes(patient.id)}
                        onChange={(e) => handleSelectPatient(patient.id, e.target.checked)}
                        aria-label={`Select ${patient.name}`}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-0"
                      />
                    </td>

                    {/* Patient Name */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onPatientSelect?.(patient.name, patient.mrn)}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left w-full"
                      >
                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-slate-300">
                            {patient.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-white hover:text-blue-400 transition-colors">
                          {patient.name}
                        </span>
                      </button>
                    </td>

                    {/* MRN */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{patient.mrn}</span>
                    </td>

                    {/* Files */}
                    <td className="px-6 py-4">
                      <StatusBadge
                        status={patient.filesStatus}
                        filesCount={patient.filesCount}
                        type="files"
                      />
                    </td>

                    {/* Stage */}
                    <td className="px-6 py-4">
                      <StatusBadge status={patient.stage} type="stage" />
                    </td>

                    {/* Organization */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">
                        {patient.organization}
                      </span>
                    </td>

                    {/* Tasks */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-slate-800 text-slate-300 text-xs font-medium rounded-md">
                        {patient.tasks}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">
                        {new Date(patient.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button 
                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                        aria-label={`Actions for ${patient.name}`}
                      >
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredPatients.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-slate-400">No patients found matching your search.</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <p>
              Showing <span className="text-white font-medium">{filteredPatients.length}</span> of{' '}
              <span className="text-white font-medium">{MOCK_PATIENTS.length}</span> patients
            </p>
            <p>
              {selectedPatients.length > 0 && (
                <span className="text-green-500 font-medium">
                  {selectedPatients.length} selected
                </span>
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
