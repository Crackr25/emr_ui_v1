import { ColumnDef } from '@tanstack/react-table';
import { User } from '../types/user.types';
import { CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateUserAssignmentColumnsProps {
  theme: string;
  selectedRoleId: string;
  onToggleRole: (userId: string, currentlyAssigned: boolean) => void;
}

export const createUserAssignmentColumns = ({ 
  theme, 
  selectedRoleId,
  onToggleRole 
}: CreateUserAssignmentColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: 'role_name',
    header: 'Current Role',
    cell: ({ row }) => (
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
        {row.original.role_name || 'No Role'}
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
        pending: theme === 'dark' ? 'bg-blue-950/30 text-blue-400 border-blue-800' : 'bg-blue-50 text-blue-700 border-blue-200',
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
    header: 'Assign Role',
    cell: ({ row }) => {
      const isAssigned = row.original.role_id === selectedRoleId;
      
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleRole(row.original.user_id, isAssigned)}
          className={`h-8 px-3 ${
            isAssigned
              ? theme === 'dark' 
                ? 'bg-green-950/30 text-green-400 hover:bg-green-950/50' 
                : 'bg-green-50 text-green-700 hover:bg-green-100'
              : theme === 'dark'
                ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          {isAssigned ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-1" />
              <span className="text-xs">Assigned</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 mr-1" />
              <span className="text-xs">Assign</span>
            </>
          )}
        </Button>
      );
    },
  },
];
