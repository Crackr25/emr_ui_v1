import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface InvitedUser {
  id: string;
  email: string;
  role: 'doctor' | 'nurse' | 'admin';
  status: 'pending' | 'accepted' | 'expired';
  invitedAt: string;
}

interface ColumnOptions {
  theme: 'light' | 'dark';
  getStatusColor: (status: string) => string;
}

export const createInvitedUsersColumns = ({
  theme,
  getStatusColor,
}: ColumnOptions): ColumnDef<InvitedUser>[] => [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Email
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {row.getValue("email")}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Role
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'
        }`}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Status
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className={`text-xs font-medium ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "invitedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Invited At
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
          {row.getValue("invitedAt")}
        </div>
      );
    },
  },
];
