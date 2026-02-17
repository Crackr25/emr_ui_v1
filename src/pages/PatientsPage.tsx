import React, { useMemo, useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { Patient } from '../types/patient.types';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { createPatientColumns } from '../components/PatientColumns';
import { AddPatientModal, PatientFormData } from '../components/AddPatientModal';

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
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);

  const columns = useMemo(
    () => createPatientColumns({ theme, onPatientSelect }),
    [theme, onPatientSelect]
  );

  const handleAddPatient = (patientData: PatientFormData) => {
    // Generate a new patient record
    const newPatient: Patient = {
      id: String(patients.length + 1),
      name: `${patientData.first_name} ${patientData.last_name}`,
      mrn: `MRN-${new Date().getFullYear()}-${String(patients.length + 1).padStart(3, '0')}`,
      filesStatus: 'no_files',
      stage: 'pending',
      organization: 'General Hospital', // Default organization
      tasks: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setPatients([newPatient, ...patients]);
    console.log('✅ Patient added:', newPatient);
    console.log('📋 Patient form data:', patientData);
  };

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
              <Button 
                size="sm" 
                onClick={() => setIsAddPatientModalOpen(true)}
                className={`text-xs ${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add Patient
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {/* Patients Table */}
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
            
            <DataTable 
              columns={columns} 
              data={patients} 
              theme={theme}
              searchKey="name"
              searchPlaceholder="Search patients..."
              entityLabel="patient(s)"
            />
          </div>
        </div>
      </main>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onAddPatient={handleAddPatient}
      />
    </div>
  );
};
