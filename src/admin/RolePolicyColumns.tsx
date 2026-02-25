import { ColumnDef } from '@tanstack/react-table';
import { RolePolicy } from '../types/policy.types';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateRolePolicyColumnsProps {
  theme: string;
  onDelete: (policyId: string, roleId: string) => void;
}

export const createRolePolicyColumns = ({ theme, onDelete }: CreateRolePolicyColumnsProps): ColumnDef<RolePolicy>[] => [
  {
    accessorKey: 'role_name',
    header: 'Role',
    cell: ({ row }) => (
      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {row.original.role_name || 'Unknown Role'}
      </div>
    ),
  },
  {
    accessorKey: 'policy_name',
    header: 'Policy Group',
    cell: ({ row }) => (
      <div className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
        {row.original.policy_name || 'Unknown Policy'}
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
    header: 'Assigned',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        {new Date(row.original.created_at).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(row.original.policy_id, row.original.role_id)}
          className={`h-8 w-8 p-0 ${theme === 'dark' ? 'hover:bg-red-950/30 text-zinc-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-600 hover:text-red-600'}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
