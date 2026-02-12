import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientsPage } from './pages/PatientsPage';
import { AIStudioPage } from './pages/AIStudioPage';
import { PatientDetailPage } from './pages/PatientDetailPage';
import { LoginPage } from './pages/LoginPage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('Patients');
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; mrn: string } | null>(null);

  // Show LoginPage if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Handle navigation between pages
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Clear selected patient when navigating away from detail
    if (page !== 'PatientDetail') {
      setSelectedPatient(null);
    }
  };

  // Handle patient selection
  const handlePatientSelect = (patientName: string, patientMRN: string) => {
    setSelectedPatient({ name: patientName, mrn: patientMRN });
    setCurrentPage('PatientDetail');
  };

  // Render the appropriate page based on currentPage
  switch (currentPage) {
    case 'AI Studio':
      return <AIStudioPage onNavigate={handleNavigate} />;
    case 'PatientDetail':
      return (
        <PatientDetailPage 
          onNavigate={handleNavigate}
          patientName={selectedPatient?.name}
          patientMRN={selectedPatient?.mrn}
        />
      );
    case 'Patients':
      return <PatientsPage onNavigate={handleNavigate} onPatientSelect={handlePatientSelect} />;
    // Add more cases as needed
    default:
      return <PatientsPage onNavigate={handleNavigate} onPatientSelect={handlePatientSelect} />;
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
