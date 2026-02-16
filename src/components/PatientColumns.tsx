import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Patient } from "../types/patient.types";

interface ColumnOptions {
  theme: 'light' | 'dark';
  onPatientSelect?: (patientName: string, patientMRN: string) => void;
}

export const createPatientColumns = ({
  theme,
  onPatientSelect,
}: ColumnOptions): ColumnDef<Patient>[] => [
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
          Stage
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <StatusBadge status={row.getValue("stage")} type="stage" />;
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
