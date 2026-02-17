import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AddPolicyPermissionModal } from '../components/AddPolicyPermissionModal';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { PolicyPermission, PolicyPermissionFormData } from '../types/policy.types';
import { createPolicyPermissionColumns } from '../components/PolicyPermissionColumns';

interface AdminPermissionsPageProps {
  onNavigate?: (page: string) => void;
}

const MOCK_POLICY_GROUPS = [
  { policy_id: '1', policy_name: 'Clinical Access' },
  { policy_id: '2', policy_name: 'Administrative Rights' },
  { policy_id: '3', policy_name: 'Billing Access' },
];

const MOCK_PERMISSIONS: PolicyPermission[] = [
  {
    perm_id: '1',
    policy_id: '1',
    perm_domain: 'Patient',
    perm_target: 'Records',
    perm_action: 'View',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    perm_id: '2',
    policy_id: '1',
    perm_domain: 'Patient',
    perm_target: 'Records',
    perm_action: 'Create',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    perm_id: '3',
    policy_id: '1',
    perm_domain: 'Patient',
    perm_target: 'Records',
    perm_action: 'Update',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    perm_id: '4',
    policy_id: '2',
    perm_domain: 'System',
    perm_target: 'Users',
    perm_action: 'Create',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    perm_id: '5',
    policy_id: '3',
    perm_domain: 'Billing',
    perm_target: 'Invoices',
    perm_action: 'View',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
];

export const AdminPermissionsPage: React.FC<AdminPermissionsPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [permissions, setPermissions] = useState<PolicyPermission[]>(MOCK_PERMISSIONS);
  const [editingPermission, setEditingPermission] = useState<PolicyPermission | null>(null);

  const handleAddPermission = (data: PolicyPermissionFormData) => {
    if (editingPermission) {
      const updated: PolicyPermission = {
        ...editingPermission,
        ...data,
        updated_at: new Date().toISOString(),
      };
      setPermissions(permissions.map(p => p.perm_id === editingPermission.perm_id ? updated : p));
      console.log('✅ Permission updated:', updated);
      setEditingPermission(null);
    } else {
      const newPermission: PolicyPermission = {
        perm_id: String(permissions.length + 1),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPermissions([newPermission, ...permissions]);
      console.log('✅ Permission added:', newPermission);
    }
  };

  const handleEdit = (permission: PolicyPermission) => {
    setEditingPermission(permission);
    setIsAddModalOpen(true);
  };

  const handleDelete = (permId: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      setPermissions(permissions.filter(p => p.perm_id !== permId));
      console.log('🗑️ Permission deleted:', permId);
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingPermission(null);
  };

  const columns = useMemo(
    () => createPolicyPermissionColumns({ 
      theme, 
      onEdit: handleEdit, 
      onDelete: handleDelete,
      policyGroups: MOCK_POLICY_GROUPS 
    }),
    [theme]
  );

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <AdminSidebar currentPage="Permissions" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Policy Permissions</h1>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage granular permissions for policy groups
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className={`${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Permission
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-6">
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
            <div className="mb-4">
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                All Permissions
              </h3>
            </div>
            
            <DataTable 
              columns={columns} 
              data={permissions} 
              theme={theme}
              searchKey="perm_target"
              searchPlaceholder="Search permissions..."
              entityLabel="permission(s)"
            />
          </div>
        </div>
      </main>

      <AddPolicyPermissionModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddPermission}
        editingPermission={editingPermission}
        policyGroups={MOCK_POLICY_GROUPS}
      />
    </div>
  );
};
