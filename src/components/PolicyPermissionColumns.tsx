import { ColumnDef } from '@tanstack/react-table';
import { PolicyPermission } from '../types/policy.types';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreatePolicyPermissionColumnsProps {
  theme: string;
  onEdit: (permission: PolicyPermission) => void;
  onDelete: (permId: string) => void;
  policyGroups: Array<{ policy_id: string; policy_name: string }>;
}

export const createPolicyPermissionColumns = ({ 
  theme, 
  onEdit, 
  onDelete,
  policyGroups 
}: CreatePolicyPermissionColumnsProps): ColumnDef<PolicyPermission>[] => [
  {
    accessorKey: 'policy_id',
    header: 'Policy Group',
    cell: ({ row }) => {
      const policyGroup = policyGroups.find(p => p.policy_id === row.original.policy_id);
      return (
        <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {policyGroup?.policy_name || 'Unknown'}
        </div>
      );
    },
  },
  {
    accessorKey: 'perm_domain',
    header: 'Domain',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        {row.original.perm_domain}
      </div>
    ),
  },
  {
    accessorKey: 'perm_target',
    header: 'Target',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        {row.original.perm_target}
      </div>
    ),
  },
  {
    accessorKey: 'perm_action',
    header: 'Action',
    cell: ({ row }) => (
      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
        {row.original.perm_action}
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
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
          onClick={() => onDelete(row.original.perm_id)}
          className={`h-8 w-8 p-0 ${theme === 'dark' ? 'hover:bg-red-950/30 text-zinc-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-600 hover:text-red-600'}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
