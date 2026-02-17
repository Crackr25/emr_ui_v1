export interface User {
  user_id: string;
  email: string;
  name: string;
  role_id?: string;
  role_name?: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface UserRoleAssignment {
  user_id: string;
  role_id: string;
  assigned_at: string;
}
