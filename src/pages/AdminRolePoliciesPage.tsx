import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AddRolePolicyModal } from '../components/AddRolePolicyModal';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { RolePolicy, RolePolicyFormData } from '../types/policy.types';
import { createRolePolicyColumns } from '../components/RolePolicyColumns';

interface AdminRolePoliciesPageProps {
  onNavigate?: (page: string) => void;
}

const MOCK_ROLES = [
  { role_id: '1', role_name: 'Physician' },
  { role_id: '2', role_name: 'Nurse' },
  { role_id: '3', role_name: 'Staff' },
  { role_id: '4', role_name: 'System Owner' },
];

const MOCK_POLICY_GROUPS = [
  { policy_id: '1', policy_name: 'Clinical Access' },
  { policy_id: '2', policy_name: 'Administrative Rights' },
  { policy_id: '3', policy_name: 'Billing Access' },
];

const MOCK_ROLE_POLICIES: RolePolicy[] = [
  {
    policy_id: '1',
    role_id: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
    role_name: 'Physician',
    policy_name: 'Clinical Access',
  },
  {
    policy_id: '2',
    role_id: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
    role_name: 'Physician',
    policy_name: 'Administrative Rights',
  },
  {
    policy_id: '1',
    role_id: '2',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
    role_name: 'Nurse',
    policy_name: 'Clinical Access',
  },
  {
    policy_id: '3',
    role_id: '3',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
    role_name: 'Staff',
    policy_name: 'Billing Access',
  },
];

export const AdminRolePoliciesPage: React.FC<AdminRolePoliciesPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [rolePolicies, setRolePolicies] = useState<RolePolicy[]>(MOCK_ROLE_POLICIES);

  const handleAddRolePolicy = (data: RolePolicyFormData) => {
    const role = MOCK_ROLES.find(r => r.role_id === data.role_id);
    const policy = MOCK_POLICY_GROUPS.find(p => p.policy_id === data.policy_id);

    const newRolePolicy: RolePolicy = {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      role_name: role?.role_name,
      policy_name: policy?.policy_name,
    };

    setRolePolicies([newRolePolicy, ...rolePolicies]);
    console.log('✅ Role Policy assigned:', newRolePolicy);
  };

  const handleDelete = (policyId: string, roleId: string) => {
    if (window.confirm('Are you sure you want to remove this policy assignment?')) {
      setRolePolicies(rolePolicies.filter(
        rp => !(rp.policy_id === policyId && rp.role_id === roleId)
      ));
      console.log('🗑️ Role Policy removed:', { policyId, roleId });
    }
  };

  const columns = useMemo(
    () => createRolePolicyColumns({ theme, onDelete: handleDelete }),
    [theme]
  );

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <AdminSidebar currentPage="Role Policies" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Role Policies</h1>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Assign policy groups to roles
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className={`${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Assign Policy
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-6">
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
            <div className="mb-4">
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Policy Assignments
              </h3>
            </div>
            
            <DataTable 
              columns={columns} 
              data={rolePolicies} 
              theme={theme}
              searchKey="role_name"
              searchPlaceholder="Search by role..."
              entityLabel="assignment(s)"
            />
          </div>
        </div>
      </main>

      <AddRolePolicyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddRolePolicy}
        roles={MOCK_ROLES}
        policyGroups={MOCK_POLICY_GROUPS}
      />
    </div>
  );
};
