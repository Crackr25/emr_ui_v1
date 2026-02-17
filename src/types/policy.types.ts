// Policy Groups
export interface PolicyGroup {
  policy_id: string;
  policy_name: string;
  pg_short_code: string;
  action: string;
  action_short_code: string;
  scope?: string;
  section?: string;
  field_exception?: string;
  description: string;
  key: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'voided';
}

export interface PolicyGroupFormData {
  policy_name: string;
  pg_short_code: string;
  action: string;
  action_short_code: string;
  scope?: string;
  section?: string;
  field_exception?: string;
  description: string;
  status: 'active' | 'inactive' | 'voided';
}

// Policy Permissions
export interface PolicyPermission {
  perm_id: string;
  policy_id: string;
  perm_domain: string;
  perm_target: string;
  perm_action: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'voided';
}

export interface PolicyPermissionFormData {
  policy_id: string;
  perm_domain: string;
  perm_target: string;
  perm_action: string;
  status: 'active' | 'inactive' | 'voided';
}

// Role Policies (Junction Table)
export interface RolePolicy {
  policy_id: string;
  role_id: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'voided';
  // Joined data for display
  role_name?: string;
  policy_name?: string;
}

export interface RolePolicyFormData {
  policy_id: string;
  role_id: string;
  status: 'active' | 'inactive' | 'voided';
}
