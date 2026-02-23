import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientsPage } from './pages/PatientsPage';
import { TasksPage } from './pages/TasksPage';
import { AIStudioPage } from './pages/AIStudioPage';
import { PatientDetailPage } from './pages/PatientDetailPage';
import { LoginPage } from './pages/LoginPage';
import { AdminInvitePage } from './pages/AdminInvitePage';
import { AdminOrganizationsPage } from './pages/AdminOrganizationsPage';
import { AdminRolesPage } from './pages/AdminRolesPage';
import { AdminPolicyManagementPage } from './pages/AdminPolicyManagementPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPageRefactored';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('Patients');
  const [adminPage, setAdminPage] = useState('Users');
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; mrn: string } | null>(null);
  const [inviteData, setInviteData] = useState<{ email: string; role: 'doctor' | 'nurse' | 'admin' } | null>(null);

  // Check for invite link or onboarding on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const role = urlParams.get('role') as 'doctor' | 'nurse' | 'admin' | null;

    if (email && role) {
      setInviteData({ email, role });
    }
  }, []);

  // Check if onboarding page is requested
  const urlParams = new URLSearchParams(window.location.search);
  const showOnboarding = urlParams.get('onboarding') === 'true';

  // Handle navigation between pages
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Clear selected patient when navigating away from detail
    if (page !== 'PatientDetail') {
      setSelectedPatient(null);
    }
  };

  // Handle admin navigation
  const handleAdminNavigate = (page: string) => {
    setAdminPage(page);
  };

  // Show OnboardingPage if requested via query parameter
  if (showOnboarding && !isAuthenticated) {
    return (
      <OnboardingPage 
        email="test@example.com"
        role="doctor"
        onComplete={() => window.location.href = '/'}
      />
    );
  }

  // Show RegisterPage if user clicked invite link
  if (inviteData && !isAuthenticated) {
    return (
      <RegisterPage 
        inviteEmail={inviteData.email}
        inviteRole={inviteData.role}
        onComplete={() => setInviteData(null)}
      />
    );
  }

  // Show LoginPage if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }  // Show Admin Portal for admin users
  if (user?.role === 'admin') {
    switch (adminPage) {
      case 'Organizations':
        return <AdminOrganizationsPage onNavigate={handleAdminNavigate} />;
      case 'Roles':
        return <AdminRolesPage onNavigate={handleAdminNavigate} />;
      case 'Policy Management':
        return <AdminPolicyManagementPage onNavigate={handleAdminNavigate} />;
      case 'Users':
      default:
        return <AdminInvitePage onNavigate={handleAdminNavigate} />;
    }
  }

  // Handle patient selection
  const handlePatientSelect = (patientName: string, patientMRN: string) => {
    setSelectedPatient({ name: patientName, mrn: patientMRN });
    setCurrentPage('PatientDetail');
  };

  // Render the appropriate page based on currentPage
  switch (currentPage) {
    case 'Tasks':
      return <TasksPage onNavigate={handleNavigate} />;
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
