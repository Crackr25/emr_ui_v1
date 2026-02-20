export interface Organization {
  organization_id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  type?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface OrganizationFormData {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  type?: string;
}
