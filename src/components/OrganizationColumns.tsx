import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2, Star } from 'lucide-react';
import { Organization } from '../types/organization.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CreateOrganizationColumnsProps {
  theme: string;
  onEdit: (org: Organization) => void;
  onDelete: (orgId: string) => void;
  onSetPrimary: (orgId: string) => void;
}

export const createOrganizationColumns = ({
  theme,
  onEdit,
  onDelete,
  onSetPrimary,
}: CreateOrganizationColumnsProps): ColumnDef<Organization>[] => [
  {
    accessorKey: 'name',
    header: 'Organization Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      const isPrimary = row.original.is_primary;
      return (
        <div className="flex items-center gap-2">
          <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </div>
          {isPrimary && (
            <Badge className={`${theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
              <Star className="w-3 h-3 mr-1 fill-current" />
              Primary
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return type ? (
        <Badge variant="outline" className={theme === 'dark' ? 'border-zinc-700 text-zinc-300' : 'border-gray-300 text-gray-700'}>
          {type}
        </Badge>
      ) : (
        <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>-</span>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string;
      return (
        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
          {phone || '-'}
        </span>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const email = row.getValue('email') as string;
      return (
        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
          {email || '-'}
        </span>
      );
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.getValue('address') as string;
      return (
        <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
          {address || '-'}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={status === 'active' ? 'default' : 'secondary'}
          className={
            status === 'active'
              ? theme === 'dark'
                ? 'bg-green-900/30 text-green-400 border-green-800'
                : 'bg-green-100 text-green-700 border-green-200'
              : theme === 'dark'
              ? 'bg-zinc-800 text-zinc-400 border-zinc-700'
              : 'bg-gray-100 text-gray-600 border-gray-300'
          }
        >
          {status}
        </Badge>
      );
    },
  },  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const organization = row.original;
      const isPrimary = organization.is_primary;

      return (
        <div className="flex items-center gap-2">
          {!isPrimary && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSetPrimary(organization.organization_id)}
              className={`h-8 px-3 ${theme === 'dark' ? 'hover:bg-yellow-950/30 text-yellow-400 hover:text-yellow-300' : 'hover:bg-yellow-50 text-yellow-600 hover:text-yellow-700'}`}
              title="Set as primary organization"
            >
              <Star className="w-4 h-4 mr-1" />
              <span className="text-xs">Set Primary</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(organization)}
            className={`h-8 w-8 p-0 ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this organization?')) {
                onDelete(organization.organization_id);
              }
            }}
            className={`h-8 w-8 p-0 ${theme === 'dark' ? 'hover:bg-red-950/30 text-zinc-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-600 hover:text-red-600'}`}
            disabled={isPrimary}
            title={isPrimary ? 'Cannot delete primary organization' : 'Delete organization'}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
