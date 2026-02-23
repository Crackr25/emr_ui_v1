import React, { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { User } from '../types/user.types';
import { Role } from '../types/role.types';
import { createUserAssignmentColumns } from '../components/UserAssignmentColumns';

interface AdminRoleUsersPageProps {
  selectedRole: Role;
  onNavigate?: (page: string) => void;
  onBack: () => void;
}

// Mock Users Data
const MOCK_USERS: User[] = [
  {
    user_id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role_id: '1',
    role_name: 'Member',
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    user_id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role_id: '2',
    role_name: 'Admin',
    status: 'active',
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z',
  },
  {
    user_id: '3',
    email: 'bob.wilson@example.com',
    name: 'Bob Wilson',
    role_id: '3',
    role_name: 'Owner',
    status: 'active',
    created_at: '2024-01-17T10:00:00Z',
    updated_at: '2024-01-17T10:00:00Z',
  },
  {
    user_id: '4',
    email: 'alice.brown@example.com',
    name: 'Alice Brown',
    role_id: '4',
    role_name: 'Physician',
    status: 'active',
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
  },
  {
    user_id: '5',
    email: 'charlie.davis@example.com',
    name: 'Charlie Davis',
    role_id: '1',
    role_name: 'Member',
    status: 'active',
    created_at: '2024-01-19T10:00:00Z',
    updated_at: '2024-01-19T10:00:00Z',
  },
  {
    user_id: '6',
    email: 'diana.miller@example.com',
    name: 'Diana Miller',
    role_id: undefined,
    role_name: undefined,
    status: 'pending',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
  },
];

export const AdminRoleUsersPage: React.FC<AdminRoleUsersPageProps> = ({ 
  selectedRole, 
  onNavigate, 
  onBack 
}) => {
  const { theme } = useTheme();
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const handleToggleRole = (userId: string, currentlyAssigned: boolean) => {
    setUsers(users.map(user => {
      if (user.user_id === userId) {
        if (currentlyAssigned) {
          // Remove role
          console.log(`🔄 Removing role "${selectedRole.role_name}" from user: ${user.email}`);
          return {
            ...user,
            role_id: undefined,
            role_name: undefined,
            updated_at: new Date().toISOString(),
          };
        } else {
          // Assign role
          console.log(`✅ Assigning role "${selectedRole.role_name}" to user: ${user.email}`);
          return {
            ...user,
            role_id: selectedRole.role_id,
            role_name: selectedRole.role_name,
            updated_at: new Date().toISOString(),
          };
        }
      }
      return user;
    }));
  };

  const columns = useMemo(
    () => createUserAssignmentColumns({ 
      theme, 
      selectedRoleId: selectedRole.role_id,
      onToggleRole: handleToggleRole 
    }),
    [theme, selectedRole.role_id]
  );

  // Count users with this role
  const assignedCount = users.filter(u => u.role_id === selectedRole.role_id).length;

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <AdminSidebar currentPage="Roles" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className={`${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Roles
              </Button>
              <div className={`h-6 w-px ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`} />
              <div>
                <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Assign Users to: {selectedRole.role_name}
                </h1>
                <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {assignedCount} user{assignedCount !== 1 ? 's' : ''} currently assigned to this role
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {/* Role Info Card */}
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-4 mb-6`}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Role Name</p>
                <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedRole.role_name}
                </p>
              </div>
              <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Description</p>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                  {selectedRole.role_description || 'No description'}
                </p>
              </div>
              <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Requirements</p>
                <div className="flex gap-2 mt-1">
                  {selectedRole.requires_npi && (
                    <span className={`text-xs px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-blue-950/30 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                      NPI Required
                    </span>
                  )}
                  {selectedRole.requires_license && (
                    <span className={`text-xs px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-purple-950/30 text-purple-400' : 'bg-purple-50 text-purple-700'}`}>
                      License Required
                    </span>
                  )}
                  {!selectedRole.requires_npi && !selectedRole.requires_license && (
                    <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      No special requirements
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
            <div className="mb-4">
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                All Users
              </h3>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Click "Assign" to assign this role to a user, or "Assigned" to remove the role
              </p>
            </div>
            
            <DataTable 
              columns={columns} 
              data={users} 
              theme={theme}
              searchKey="name"
              searchPlaceholder="Search users..."
              entityLabel="user(s)"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
