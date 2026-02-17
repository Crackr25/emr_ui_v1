import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AddPolicyGroupModal } from '../components/AddPolicyGroupModal';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { PolicyGroup, PolicyGroupFormData } from '../types/policy.types';
import { createPolicyGroupColumns } from '../components/PolicyGroupColumns';

interface AdminPolicyGroupsPageProps {
  onNavigate?: (page: string) => void;
}

const MOCK_POLICY_GROUPS: PolicyGroup[] = [
  {
    policy_id: '1',
    policy_name: 'User management',
    pg_short_code: 'um',
    action: 'View',
    action_short_code: 'vw',
    description: 'the user can view the list of users',
    key: 'um-vw',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    policy_id: '2',
    policy_name: 'User management',
    pg_short_code: 'um',
    action: 'Read',
    action_short_code: 'rd',
    description: 'the user can read a single record',
    key: 'um-rd',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    policy_id: '3',
    policy_name: 'Patient Management',
    pg_short_code: 'pt',
    action: 'View',
    action_short_code: 'vw',
    scope: 'Assigned',
    description: 'the user can see a list of all assigned patients',
    key: 'pt-vw',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    policy_id: '4',
    policy_name: 'Patient Management',
    pg_short_code: 'pt',
    action: 'Read',
    action_short_code: 'rd',
    section: 'Contact',
    description: 'then user can read all patients demographic and other info (not including demographics)',
    key: 'pt-rd',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    policy_id: '5',
    policy_name: 'Roles and Access Management',
    pg_short_code: 'ra',
    action: 'View',
    action_short_code: 'vw',
    description: 'the user can view the list of roles, permissions, policy groups',
    key: 'ra-vw',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    status: 'active',
  },
];

export const AdminPolicyGroupsPage: React.FC<AdminPolicyGroupsPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [policyGroups, setPolicyGroups] = useState<PolicyGroup[]>(MOCK_POLICY_GROUPS);
  const [editingPolicyGroup, setEditingPolicyGroup] = useState<PolicyGroup | null>(null);

  const handleAddPolicyGroup = (data: PolicyGroupFormData) => {
    // Generate key from pg_short_code and action_short_code
    const generatedKey = `${data.pg_short_code}-${data.action_short_code}`;
    
    if (editingPolicyGroup) {
      const updated: PolicyGroup = {
        ...editingPolicyGroup,
        ...data,
        key: generatedKey,
        updated_at: new Date().toISOString(),
      };
      setPolicyGroups(policyGroups.map(p => p.policy_id === editingPolicyGroup.policy_id ? updated : p));
      console.log('✅ Policy Group updated:', updated);
      setEditingPolicyGroup(null);
    } else {
      const newPolicyGroup: PolicyGroup = {
        policy_id: String(policyGroups.length + 1),
        ...data,
        key: generatedKey,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPolicyGroups([newPolicyGroup, ...policyGroups]);
      console.log('✅ Policy Group added:', newPolicyGroup);
    }
  };

  const handleEdit = (policyGroup: PolicyGroup) => {
    setEditingPolicyGroup(policyGroup);
    setIsAddModalOpen(true);
  };

  const handleDelete = (policyId: string) => {
    if (window.confirm('Are you sure you want to delete this policy group?')) {
      setPolicyGroups(policyGroups.filter(p => p.policy_id !== policyId));
      console.log('🗑️ Policy Group deleted:', policyId);
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingPolicyGroup(null);
  };

  const columns = useMemo(
    () => createPolicyGroupColumns({ theme, onEdit: handleEdit, onDelete: handleDelete }),
    [theme]
  );

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <AdminSidebar currentPage="Policy Groups" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Policy Groups</h1>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage policy groups and categories
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className={`${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Policy Group
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-6">
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
            <div className="mb-4">
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                All Policy Groups
              </h3>
            </div>
            
            <DataTable 
              columns={columns} 
              data={policyGroups} 
              theme={theme}
              searchKey="policy_name"
              searchPlaceholder="Search policy groups..."
              entityLabel="policy group(s)"
            />
          </div>
        </div>
      </main>

      <AddPolicyGroupModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddPolicyGroup}
        editingPolicyGroup={editingPolicyGroup}
      />
    </div>
  );
};
