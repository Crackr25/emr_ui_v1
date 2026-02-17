export interface Role {
  role_id: string;
  role_name: string;
  role_description: string;
  requires_npi: boolean;
  requires_license: boolean;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'voided';
}

export interface RoleFormData {
  role_name: string;
  role_description: string;
  requires_npi: boolean;
  requires_license: boolean;
  status: 'active' | 'inactive' | 'voided';
}
