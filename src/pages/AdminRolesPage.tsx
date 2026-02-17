import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AddRoleModal } from '../components/AddRoleModal';
import { AdminRoleUsersPage } from './AdminRoleUsersPage';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Role, RoleFormData } from '../types/role.types';
import { createRoleColumns } from '../components/RoleColumns';

interface AdminRolesPageProps {
  onNavigate?: (page: string) => void;
}

// Mock Data
const MOCK_ROLES: Role[] = [
  {
    role_id: '1',
    role_name: 'Physician',
    role_description: 'Licensed medical doctor providing patient care',
    requires_npi: true,
    requires_license: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    role_id: '2',
    role_name: 'Nurse',
    role_description: 'Registered nurse assisting with patient care',
    requires_npi: false,
    requires_license: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    role_id: '3',
    role_name: 'Staff',
    role_description: 'Administrative and support staff',
    requires_npi: false,
    requires_license: false,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    role_id: '4',
    role_name: 'System Owner',
    role_description: 'Full system administrator with all permissions',
    requires_npi: false,
    requires_license: false,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
];

export const AdminRolesPage: React.FC<AdminRolesPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedRoleForUsers, setSelectedRoleForUsers] = useState<Role | null>(null);

  const handleAddRole = (roleData: RoleFormData) => {
    if (editingRole) {
      // Update existing role
      const updatedRole: Role = {
        ...editingRole,
        ...roleData,
        updated_at: new Date().toISOString(),
      };
      setRoles(roles.map(r => r.role_id === editingRole.role_id ? updatedRole : r));
      console.log('✅ Role updated:', updatedRole);
      setEditingRole(null);
    } else {
      // Add new role
      const newRole: Role = {
        role_id: String(roles.length + 1),
        ...roleData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setRoles([newRole, ...roles]);
      console.log('✅ Role added:', newRole);
    }
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsAddRoleModalOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.role_id !== roleId));
      console.log('🗑️ Role deleted:', roleId);
    }
  };

  const handleCloseModal = () => {
    setIsAddRoleModalOpen(false);
    setEditingRole(null);
  };

  const handleAssignUsers = (role: Role) => {
    setSelectedRoleForUsers(role);
  };

  const columns = useMemo(
    () => createRoleColumns({ 
      theme, 
      onEdit: handleEditRole, 
      onDelete: handleDeleteRole,
      onAssignUsers: handleAssignUsers
    }),
    [theme]
  );

  // Show user assignment page if a role is selected
  if (selectedRoleForUsers) {
    return (
      <AdminRoleUsersPage 
        selectedRole={selectedRoleForUsers}
        onNavigate={onNavigate}
        onBack={() => setSelectedRoleForUsers(null)}
      />
    );
  }

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Admin Sidebar */}
      <AdminSidebar currentPage="Roles" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Roles Management</h1>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage system roles and permissions
              </p>
            </div>
            <Button
              onClick={() => setIsAddRoleModalOpen(true)}
              className={`${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {/* Roles Table */}
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
            <div className="mb-4">
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                System Roles
              </h3>
            </div>
            
            <DataTable 
              columns={columns} 
              data={roles} 
              theme={theme}
              searchKey="role_name"
              searchPlaceholder="Search roles..."
              entityLabel="role(s)"
            />
          </div>
        </div>
      </main>

      {/* Add/Edit Role Modal */}
      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddRole}
        editingRole={editingRole}
      />
    </div>
  );
};
