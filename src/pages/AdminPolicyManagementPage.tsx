import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AddPolicyGroupModal } from '../components/AddPolicyGroupModal';
import { AddPolicyPermissionModal } from '../components/AddPolicyPermissionModal';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PolicyGroup, PolicyPermission, PolicyGroupFormData, PolicyPermissionFormData } from '../types/policy.types';
import { createPolicyGroupColumns } from '../components/PolicyGroupColumns';
import { createPolicyPermissionColumns } from '../components/PolicyPermissionColumns';

interface AdminPolicyManagementPageProps {
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

export const AdminPolicyManagementPage: React.FC<AdminPolicyManagementPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'policy-groups' | 'permissions'>('policy-groups');
  
  // Policy Groups State
  const [isPolicyGroupModalOpen, setIsPolicyGroupModalOpen] = useState(false);
  const [policyGroups, setPolicyGroups] = useState<PolicyGroup[]>(MOCK_POLICY_GROUPS);
  const [editingPolicyGroup, setEditingPolicyGroup] = useState<PolicyGroup | null>(null);
  
  // Permissions State
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [permissions, setPermissions] = useState<PolicyPermission[]>(MOCK_PERMISSIONS);
  const [editingPermission, setEditingPermission] = useState<PolicyPermission | null>(null);

  // Policy Groups Handlers
  const handleAddPolicyGroup = (data: PolicyGroupFormData) => {
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

  const handleEditPolicyGroup = (policyGroup: PolicyGroup) => {
    setEditingPolicyGroup(policyGroup);
    setIsPolicyGroupModalOpen(true);
  };

  const handleDeletePolicyGroup = (policyId: string) => {
    if (window.confirm('Are you sure you want to delete this policy group?')) {
      setPolicyGroups(policyGroups.filter(p => p.policy_id !== policyId));
      console.log('🗑️ Policy Group deleted:', policyId);
    }
  };

  const handleClosePolicyGroupModal = () => {
    setIsPolicyGroupModalOpen(false);
    setEditingPolicyGroup(null);
  };

  // Permissions Handlers
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

  const handleEditPermission = (permission: PolicyPermission) => {
    setEditingPermission(permission);
    setIsPermissionModalOpen(true);
  };

  const handleDeletePermission = (permId: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      setPermissions(permissions.filter(p => p.perm_id !== permId));
      console.log('🗑️ Permission deleted:', permId);
    }
  };

  const handleClosePermissionModal = () => {
    setIsPermissionModalOpen(false);
    setEditingPermission(null);
  };

  // Columns
  const policyGroupColumns = useMemo(
    () => createPolicyGroupColumns({ 
      theme, 
      onEdit: handleEditPolicyGroup, 
      onDelete: handleDeletePolicyGroup 
    }),
    [theme]
  );

  const permissionColumns = useMemo(
    () => createPolicyPermissionColumns({ 
      theme, 
      onEdit: handleEditPermission, 
      onDelete: handleDeletePermission,
      policyGroups: policyGroups.map(pg => ({ 
        policy_id: pg.policy_id, 
        policy_name: pg.policy_name 
      }))
    }),
    [theme, policyGroups]
  );

  // Get header info based on active tab
  const getHeaderInfo = () => {
    if (activeTab === 'policy-groups') {
      return {
        title: 'Policy Management',
        description: 'Manage policy groups and permissions',
        buttonText: 'Add Policy Group',
        onButtonClick: () => setIsPolicyGroupModalOpen(true)
      };
    } else {
      return {
        title: 'Policy Management',
        description: 'Manage policy groups and permissions',
        buttonText: 'Add Permission',
        onButtonClick: () => setIsPermissionModalOpen(true)
      };
    }
  };

  const headerInfo = getHeaderInfo();
  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <AdminSidebar currentPage="Policy Management" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {headerInfo.title}
              </h1>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                {headerInfo.description}
              </p>
            </div>
            <Button
              onClick={headerInfo.onButtonClick}
              className={`${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              <Plus className="w-4 h-4 mr-2" />
              {headerInfo.buttonText}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-6">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'policy-groups' | 'permissions')}
            className="w-full"
          >
            <TabsList className={`mb-4 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100'}`}>
              <TabsTrigger value="policy-groups">Policy Groups</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="policy-groups" className="mt-0">
              <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
                <div className="mb-4">
                  <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    All Policy Groups
                  </h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Define policy categories and actions for role-based access control
                  </p>
                </div>
                
                <DataTable 
                  columns={policyGroupColumns} 
                  data={policyGroups} 
                  theme={theme}
                  searchKey="policy_name"
                  searchPlaceholder="Search policy groups..."
                  entityLabel="policy group(s)"
                />
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="mt-0">
              <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
                <div className="mb-4">
                  <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    All Permissions
                  </h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Configure granular permissions for each policy group
                  </p>
                </div>
                
                <DataTable 
                  columns={permissionColumns} 
                  data={permissions} 
                  theme={theme}
                  searchKey="perm_target"
                  searchPlaceholder="Search permissions..."
                  entityLabel="permission(s)"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Policy Group Modal */}
      <AddPolicyGroupModal
        isOpen={isPolicyGroupModalOpen}
        onClose={handleClosePolicyGroupModal}
        onSubmit={handleAddPolicyGroup}
        editingPolicyGroup={editingPolicyGroup}
      />

      {/* Permission Modal */}
      <AddPolicyPermissionModal
        isOpen={isPermissionModalOpen}
        onClose={handleClosePermissionModal}
        onSubmit={handleAddPermission}
        editingPermission={editingPermission}
        policyGroups={policyGroups.map(pg => ({ 
          policy_id: pg.policy_id, 
          policy_name: pg.policy_name 
        }))}
      />
    </div>
  );
};
