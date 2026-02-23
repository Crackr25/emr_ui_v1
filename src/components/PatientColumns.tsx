import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { Patient } from "../types/patient.types";

interface ColumnOptions {
  theme: 'light' | 'dark';
  onPatientSelect?: (patientName: string, patientMRN: string) => void;
  onStageChange?: (patientId: string, newStage: 'pending' | 'processed' | 'hold') => void;
}

export const createPatientColumns = ({
  theme,
  onPatientSelect,
  onStageChange,
}: ColumnOptions): ColumnDef<Patient>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className={theme === 'dark' ? 'border-zinc-700' : 'border-gray-300'}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className={theme === 'dark' ? 'border-zinc-700' : 'border-gray-300'}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <button
          onClick={() => onPatientSelect?.(patient.name, patient.mrn)}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity text-left w-full"
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              {patient.name.charAt(0)}
            </span>
          </div>
          <span className={`text-sm font-medium hover:underline ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {patient.name}
          </span>
        </button>
      );
    },
  },
  {
    accessorKey: "mrn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          MRN
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
          {row.getValue("mrn")}
        </span>
      );
    },
  },
  {
    accessorKey: "filesStatus",
    header: "Files",
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <StatusBadge
          status={patient.filesStatus}
          filesCount={patient.filesCount}
          type="files"
        />
      );
    },
  },
  {
    accessorKey: "stage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Referral Stage
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const patient = row.original;
      const stage = row.getValue("stage") as 'pending' | 'processed' | 'hold';
      
      return (
        <Select
          value={stage}
          onValueChange={(value) => onStageChange?.(patient.id, value as 'pending' | 'processed' | 'hold')}
        >
          <SelectTrigger
            className={`w-36 h-8 text-xs ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                stage === 'pending' ? 'bg-yellow-500' :
                stage === 'processed' ? 'bg-green-500' :
                'bg-red-500'
              }`} />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white'}>
            <SelectItem value="pending">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                Pending
              </div>
            </SelectItem>
            <SelectItem value="processed">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Processed
              </div>
            </SelectItem>
            <SelectItem value="hold">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                Hold
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "organization",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Organization
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
          {row.getValue("organization")}
        </span>
      );
    },
  },
  {
    accessorKey: "tasks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Tasks
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
          {row.getValue("tasks")}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`h-8 px-2 -ml-2 hover:bg-transparent ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Created At
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
          {row.getValue("createdAt")}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="icon"
          className={`h-7 w-7 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
          aria-label={`Actions for ${row.original.name}`}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      );
    },
  },
];
