import React, { useState } from 'react';
import { UserPlus, Mail, Send } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { InviteLinkModal } from '../components/InviteLinkModal';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface InvitedUser {
  id: string;
  email: string;
  role: 'doctor' | 'nurse' | 'admin';
  status: 'pending' | 'accepted' | 'expired';
  invitedAt: string;
}

interface AdminInvitePageProps {
  onNavigate?: (page: string) => void;
}

export const AdminInvitePage: React.FC<AdminInvitePageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'doctor' | 'nurse' | 'admin'>('doctor');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInvite, setCurrentInvite] = useState<{ email: string; role: string; link: string } | null>(null);
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

  const handleSendInvite = () => {
    if (!email) return;

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
    
    // Show modal with invite link
    setCurrentInvite({ email, role, link: inviteLink });
    setIsModalOpen(true);
    
    // Reset form
    setEmail('');
    setRole('doctor');
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

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Admin Sidebar */}
      <AdminSidebar currentPage="Invite" onNavigate={onNavigate} />

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
          {/* Invite Form Card */}
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
              <h2 className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Send Invitation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Email Input */}
              <div className="md:col-span-2">
                <Label htmlFor="email" className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Email Address
                </Label>
                <div className="relative mt-1">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-9 h-9 text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus-visible:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus-visible:ring-blue-500'}`}
                  />
                </div>
              </div>

              {/* Role Select */}
              <div>
                <Label htmlFor="role" className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Role
                </Label>
                <Select value={role} onValueChange={(value: 'doctor' | 'nurse' | 'admin') => setRole(value)}>
                  <SelectTrigger 
                    className={`mt-1 h-9 text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                    <SelectItem value="doctor" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Doctor</SelectItem>
                    <SelectItem value="nurse" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Nurse</SelectItem>
                    <SelectItem value="admin" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Send Button */}
            <div className="mt-4">
              <Button
                onClick={handleSendInvite}
                disabled={!email}
                className={`text-xs ${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
                size="sm"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Send Invitation
              </Button>
            </div>
          </div>

          {/* Invited Users Table */}
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden`}>
            <div className="px-6 py-4 border-b border-zinc-800">
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Recent Invitations
              </h3>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow className={`border-b ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-900' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Email</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Role</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Status</TableHead>
                  <TableHead className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Invited At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className={`border-b ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-800/50' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <TableCell className={`font-medium text-sm py-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {user.email}
                    </TableCell>
                    <TableCell className={`text-xs py-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className={`text-xs py-2 font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </TableCell>
                    <TableCell className={`text-xs py-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
                      {user.invitedAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Info */}
          <div className={`mt-3 flex items-center justify-between text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
            <p>
              Showing <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{invitedUsers.length}</span> invitation(s)
            </p>
          </div>
        </div>
      </main>

      {/* Invite Link Modal */}
      {currentInvite && (
        <InviteLinkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={currentInvite.email}
          role={currentInvite.role}
          inviteLink={currentInvite.link}
        />
      )}
    </div>
  );
};
