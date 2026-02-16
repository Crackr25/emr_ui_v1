import React, { useState, useMemo } from 'react';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { InviteLinkModal } from '../components/InviteLinkModal';
import { InviteUserModal } from '../components/InviteUserModal';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InvitedUser, createInvitedUsersColumns } from '../components/InvitedUsersColumns';

interface AdminInvitePageProps {
  onNavigate?: (page: string) => void;
}

export const AdminInvitePage: React.FC<AdminInvitePageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [currentInvite, setCurrentInvite] = useState<{ email: string; role: string; link: string } | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [lastInvitedEmail, setLastInvitedEmail] = useState('');
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      role: 'doctor',
      status: 'accepted',
      invitedAt: '2026-02-10',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      role: 'nurse',
      status: 'pending',
      invitedAt: '2026-02-12',
    },
  ]);

  const handleSendInvite = (email: string, role: 'doctor' | 'nurse' | 'admin') => {
    const newInvite: InvitedUser = {
      id: String(invitedUsers.length + 1),
      email,
      role,
      status: 'pending',
      invitedAt: new Date().toISOString().split('T')[0],
    };

    // Generate invite link
    const inviteLink = `${window.location.origin}?email=${encodeURIComponent(email)}&role=${role}`;

    setInvitedUsers([newInvite, ...invitedUsers]);
    console.log('✉️ Invite sent:', newInvite);
    console.log('🔗 Invite link:', inviteLink);
    
    // Show success alert
    setLastInvitedEmail(email);
    setShowSuccessAlert(true);
    
    // Show modal with invite link
    setCurrentInvite({ email, role, link: inviteLink });
    setIsLinkModalOpen(true);
    
    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return theme === 'dark' ? 'text-green-400' : 'text-green-600';
      case 'pending':
        return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
      case 'expired':
        return theme === 'dark' ? 'text-red-400' : 'text-red-600';
      default:
        return theme === 'dark' ? 'text-zinc-400' : 'text-gray-600';
    }
  };

  const columns = useMemo(
    () => createInvitedUsersColumns({ theme, getStatusColor }),
    [theme]
  );

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Admin Sidebar */}
      <AdminSidebar currentPage="Users" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Admin Portal</h1>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Invite Users
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {/* Success Alert */}
          {showSuccessAlert && (
            <Alert variant="success" className={`mb-6 ${theme === 'dark' ? 'bg-green-950/30 border-green-800' : 'bg-green-50 border-green-200'}`}>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>Invitation Sent!</AlertTitle>
              <AlertDescription className={theme === 'dark' ? 'text-green-400/80' : 'text-green-600'}>
                An invitation has been successfully sent to <strong>{lastInvitedEmail}</strong>
              </AlertDescription>
            </Alert>
          )}

          {/* Toolbar - Search and Actions */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              {/* Search and Filter will be inside the DataTable */}
            </div>
            <Button
              onClick={() => setIsInviteModalOpen(true)}
              className={`${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite User
            </Button>
          </div>

          {/* Invited Users Table */}
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
            <div className="mb-4">
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Recent Invitations
              </h3>
            </div>
            
            <DataTable 
              columns={columns} 
              data={invitedUsers} 
              theme={theme}
              searchKey="email"
              searchPlaceholder="Search by email..."
              entityLabel="invitation(s)"
            />
          </div>
        </div>
      </main>

      {/* Invite User Modal */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleSendInvite}
      />

      {/* Invite Link Modal */}
      {currentInvite && (
        <InviteLinkModal
          isOpen={isLinkModalOpen}
          onClose={() => setIsLinkModalOpen(false)}
          email={currentInvite.email}
          role={currentInvite.role}
          inviteLink={currentInvite.link}
        />
      )}
    </div>
  );
};
