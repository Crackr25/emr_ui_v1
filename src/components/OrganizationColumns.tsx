import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Organization } from '../types/organization.types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface CreateOrganizationColumnsProps {
  theme: string;
  onEdit: (org: Organization) => void;
  onDelete: (orgId: string) => void;
}

export const createOrganizationColumns = ({
  theme,
  onEdit,
  onDelete,
}: CreateOrganizationColumnsProps): ColumnDef<Organization>[] => [
  {
    accessorKey: 'name',
    header: 'Organization Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return (
        <div className="flex items-center gap-2">
          <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </div>
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
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const organization = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
            <DropdownMenuLabel className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className={theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} />
            <DropdownMenuItem
              onClick={() => onEdit(organization)}
              className={theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(organization.organization_id)}
              className={theme === 'dark' ? 'text-red-400 hover:bg-zinc-800' : 'text-red-600 hover:bg-gray-100'}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
