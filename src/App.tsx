import { useState, useEffect, useMemo } from "react";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Auth / Onboarding
import { LoginPage } from "./auth/LoginPage";
import { RegisterPage } from "./auth/RegisterPage";
import { OnboardingPage } from "./onboarding/OnboardingPageRefactored";

// Admin portal
import { AdminInvitePage } from "./admin/AdminInvitePage";
import { AdminOrganizationsPage } from "./admin/AdminOrganizationsPage";
import { AdminRolesPage } from "./admin/AdminRolesPage";
import { AdminPolicyManagementPage } from "./admin/AdminPolicyManagementPage";

// Main app
import { PatientsPage } from "./patients/PatientsPage";
import { PatientDetailPage } from "./patients/PatientDetailPage";
import { TasksPage } from "./tasks/TasksPage";
import { AIStudioPage } from "./ai/AIStudioPage";

// ─── Types ────────────────────────────────────────────────────────────────────

type UserRole = "doctor" | "nurse" | "admin";
type AppPage = "Patients" | "PatientDetail" | "Tasks" | "AI Studio";
type AdminPage = "Users" | "Organizations" | "Roles" | "Policy Management";

interface SelectedPatient {
  name: string;
  mrn: string;
}

interface InviteData {
  email: string;
  role: UserRole;
}

// ─── Admin Portal ─────────────────────────────────────────────────────────────

interface AdminPortalProps {
  currentPage: AdminPage;
  onNavigate: (page: string) => void;
}

function AdminPortal({ currentPage, onNavigate }: AdminPortalProps) {
  switch (currentPage) {
    case "Organizations":
      return <AdminOrganizationsPage onNavigate={onNavigate} />;
    case "Roles":
      return <AdminRolesPage onNavigate={onNavigate} />;
    case "Policy Management":
      return <AdminPolicyManagementPage onNavigate={onNavigate} />;
    case "Users":
    default:
      return <AdminInvitePage onNavigate={onNavigate} />;
  }
}

// ─── Main Portal ──────────────────────────────────────────────────────────────

interface MainPortalProps {
  currentPage: AppPage;
  selectedPatient: SelectedPatient | null;
  onNavigate: (page: string) => void;
  onPatientSelect: (name: string, mrn: string) => void;
}

function MainPortal({
  currentPage,
  selectedPatient,
  onNavigate,
  onPatientSelect,
}: MainPortalProps) {
  switch (currentPage) {
    case "Tasks":
      return <TasksPage onNavigate={onNavigate} />;
    case "AI Studio":
      return <AIStudioPage onNavigate={onNavigate} />;
    case "PatientDetail":
      return (
        <PatientDetailPage
          onNavigate={onNavigate}
          patientName={selectedPatient?.name}
          patientMRN={selectedPatient?.mrn}
        />
      );
    case "Patients":
    default:
      return (
        <PatientsPage
          onNavigate={onNavigate}
          onPatientSelect={onPatientSelect}
        />
      );
  }
}

// ─── Root content ─────────────────────────────────────────────────────────────

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  const [currentPage, setCurrentPage] = useState<AppPage>("Patients");
  const [adminPage, setAdminPage] = useState<AdminPage>("Users");
  const [selectedPatient, setSelectedPatient] =
    useState<SelectedPatient | null>(null);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);

  const urlParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );
  const showOnboarding = urlParams.get("onboarding") === "true";

  useEffect(() => {
    const email = urlParams.get("email");
    const role = urlParams.get("role") as UserRole | null;
    if (email && role) setInviteData({ email, role });
  }, [urlParams]);

  const handleNavigate = (page: string) => {
    if (page !== "PatientDetail") setSelectedPatient(null);
    setCurrentPage(page as AppPage);
  };

  const handlePatientSelect = (name: string, mrn: string) => {
    setSelectedPatient({ name, mrn });
    setCurrentPage("PatientDetail");
  };

  // ── Pre-auth screens ──────────────────────────────────────────────────────
  if (showOnboarding && !isAuthenticated) {
    return (
      <OnboardingPage
        email="test@example.com"
        role="doctor"
        onComplete={() => (window.location.href = "/")}
      />
    );
  }

  if (inviteData && !isAuthenticated) {
    return (
      <RegisterPage
        inviteEmail={inviteData.email}
        inviteRole={inviteData.role}
        onComplete={() => setInviteData(null)}
      />
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // ── Authenticated screens ─────────────────────────────────────────────────
  if (user?.role === "admin") {
    return (
      <AdminPortal
        currentPage={adminPage}
        onNavigate={(p) => setAdminPage(p as AdminPage)}
      />
    );
  }

  return (
    <MainPortal
      currentPage={currentPage}
      selectedPatient={selectedPatient}
      onNavigate={handleNavigate}
      onPatientSelect={handlePatientSelect}
    />
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
