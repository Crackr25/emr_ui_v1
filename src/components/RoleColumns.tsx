import { ColumnDef } from '@tanstack/react-table';
import { Role } from '../types/role.types';
import { Edit, Trash2, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateRoleColumnsProps {
  theme: string;
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
  onAssignUsers?: (role: Role) => void;
  onAssignPolicies?: (role: Role) => void;
}

export const createRoleColumns = ({ theme, onEdit, onDelete, onAssignUsers, onAssignPolicies }: CreateRoleColumnsProps): ColumnDef<Role>[] => [
  {
    accessorKey: 'role_name',
    header: 'Role Name',
    cell: ({ row }) => (
      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {row.original.role_name}
      </div>
    ),
  },
  {
    accessorKey: 'role_description',
    header: 'Description',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        {row.original.role_description || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'requires_npi',
    header: 'Requires NPI',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        {row.original.requires_npi ? 'Yes' : 'No'}
      </div>
    ),
  },
  {
    accessorKey: 'requires_license',
    header: 'Requires License',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        {row.original.requires_license ? 'Yes' : 'No'}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        active: theme === 'dark' ? 'bg-green-950/30 text-green-400 border-green-800' : 'bg-green-50 text-green-700 border-green-200',
        inactive: theme === 'dark' ? 'bg-yellow-950/30 text-yellow-400 border-yellow-800' : 'bg-yellow-50 text-yellow-700 border-yellow-200',
        voided: theme === 'dark' ? 'bg-red-950/30 text-red-400 border-red-800' : 'bg-red-50 text-red-700 border-red-200',
      };
      
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        {new Date(row.original.created_at).toLocaleDateString()}
      </div>
    ),
  },  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {onAssignUsers && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAssignUsers(row.original)}
            className={`h-8 px-3 ${theme === 'dark' ? 'hover:bg-blue-950/30 text-blue-400 hover:text-blue-300' : 'hover:bg-blue-50 text-blue-600 hover:text-blue-700'}`}
          >
            <Users className="w-4 h-4 mr-1" />
            <span className="text-xs">Users</span>
          </Button>
        )}
        {onAssignPolicies && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAssignPolicies(row.original)}
            className={`h-8 px-3 ${theme === 'dark' ? 'hover:bg-purple-950/30 text-purple-400 hover:text-purple-300' : 'hover:bg-purple-50 text-purple-600 hover:text-purple-700'}`}
          >
            <Shield className="w-4 h-4 mr-1" />
            <span className="text-xs">Policies</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(row.original)}
          className={`h-8 w-8 p-0 ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(row.original.role_id)}
          className={`h-8 w-8 p-0 ${theme === 'dark' ? 'hover:bg-red-950/30 text-zinc-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-600 hover:text-red-600'}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
