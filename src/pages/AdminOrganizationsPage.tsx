import React, { useState, useMemo } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AddOrganizationModal } from '../components/AddOrganizationModal';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Organization, OrganizationFormData } from '../types/organization.types';
import { createOrganizationColumns } from '../components/OrganizationColumns';

interface AdminOrganizationsPageProps {
  onNavigate?: (page: string) => void;
}

const MOCK_ORGANIZATIONS: Organization[] = [
  {
    organization_id: '1',
    name: 'UTAH Hospice',
    address: '123 Main Street, Salt Lake City, UT 84101',
    phone: '(801) 555-0100',
    email: 'contact@utahhospice.org',
    website: 'https://utahhospice.org',
    type: 'Hospice',
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    organization_id: '2',
    name: 'Mountain View Medical Center',
    address: '456 Healthcare Blvd, Provo, UT 84601',
    phone: '(801) 555-0200',
    email: 'info@mountainviewmed.com',
    website: 'https://mountainviewmed.com',
    type: 'Hospital',
    status: 'active',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    organization_id: '3',
    name: 'Sunrise Home Health',
    address: '789 Care Lane, Ogden, UT 84401',
    phone: '(801) 555-0300',
    email: 'hello@sunrisehomehealth.com',
    type: 'Home Health',
    status: 'active',
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z',
  },
];

export const AdminOrganizationsPage: React.FC<AdminOrganizationsPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>(MOCK_ORGANIZATIONS);
  const [editingOrganization, setEditingOrganization] = useState<Organization | null>(null);

  const handleAddOrganization = (orgData: OrganizationFormData) => {
    if (editingOrganization) {
      const updatedOrg: Organization = {
        ...editingOrganization,
        ...orgData,
        updated_at: new Date().toISOString(),
      };
      setOrganizations(organizations.map(org => 
        org.organization_id === editingOrganization.organization_id ? updatedOrg : org
      ));
      console.log('✏️ Organization updated:', updatedOrg);
    } else {
      const newOrg: Organization = {
        organization_id: String(organizations.length + 1),
        ...orgData,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setOrganizations([newOrg, ...organizations]);
      console.log('✅ Organization created:', newOrg);
    }
    setEditingOrganization(null);
  };

  const handleEditOrganization = (org: Organization) => {
    setEditingOrganization(org);
    setIsAddModalOpen(true);
  };

  const handleDeleteOrganization = (orgId: string) => {
    setOrganizations(organizations.filter(org => org.organization_id !== orgId));
    console.log('🗑️ Organization deleted:', orgId);
  };

  const columns = useMemo(
    () => createOrganizationColumns({ 
      theme, 
      onEdit: handleEditOrganization,
      onDelete: handleDeleteOrganization 
    }),
    [theme, organizations]
  );

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <AdminSidebar currentPage="Organizations" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b px-8 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Admin Portal</h1>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage Organizations
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
              <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Organizations ({organizations.length})
              </h2>
            </div>
            <Button
              onClick={() => {
                setEditingOrganization(null);
                setIsAddModalOpen(true);
              }}
              className={`${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Organization
            </Button>
          </div>

          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
            <DataTable 
              columns={columns} 
              data={organizations} 
              theme={theme}
              searchKey="name"
              searchPlaceholder="Search organizations..."
              entityLabel="organization(s)"
            />
          </div>
        </div>
      </main>

      <AddOrganizationModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingOrganization(null);
        }}
        onSubmit={handleAddOrganization}
        editingOrganization={editingOrganization}
      />
    </div>
  );
};
