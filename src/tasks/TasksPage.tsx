import React, { useMemo, useState } from "react";
import {
  Plus,
  Download,
  Filter,
  Columns,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Sidebar } from "../shared/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { AddTaskModal, TaskFormData } from "./AddTaskModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: string;
  assignee: string;
  patient: string;
  mrn: string;
  organization: string;
  fileStatus: string;
  task: string;
  taskType: string;
  oasisDate: string;
  status: string;
  startDate: string;
  endDate: string;
  completedAt: string;
  points: number;
  estimatedImpact: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    assignee: "Karlie Webb",
    patient: "Neal, Warren",
    mrn: "10219404",
    organization: "Harmony New Mexico",
    fileStatus: "Processed (1 files)",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/19/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
  {
    id: "2",
    assignee: "Karlie Webb",
    patient: "Navarro, Linda",
    mrn: "10246449",
    organization: "Harmony New Mexico",
    fileStatus: "Processed (1 files)",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/19/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
  {
    id: "3",
    assignee: "Karlie Webb",
    patient: "King, Minnie L",
    mrn: "1039063",
    organization: "Harmony New Mexico",
    fileStatus: "No Files",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/19/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
  {
    id: "4",
    assignee: "Karlie Webb",
    patient: "Kenye, Angelina",
    mrn: "1039056",
    organization: "Harmony New Mexico",
    fileStatus: "No Files",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/19/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
  {
    id: "5",
    assignee: "Karlie Webb",
    patient: "Clay, Charles",
    mrn: "10248629",
    organization: "Harmony New Mexico",
    fileStatus: "No Files",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/19/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
  {
    id: "6",
    assignee: "Karlie Webb",
    patient: "Oliver, Grant W",
    mrn: "10248611",
    organization: "Harmony New Mexico",
    fileStatus: "No Files",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/18/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
  {
    id: "7",
    assignee: "Caroline Zinberg",
    patient: "Nakahara, Yoshiko",
    mrn: "10487337",
    organization: "Harmony New Mexico",
    fileStatus: "Processed (1 files)",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/18/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
  {
    id: "8",
    assignee: "Caroline Zinberg",
    patient: "Johnson, Nancy A",
    mrn: "10475333",
    organization: "Harmony New Mexico",
    fileStatus: "Processed (1 files)",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/16/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
  {
    id: "9",
    assignee: "Caroline Zinberg",
    patient: "Bradley, Martha J",
    mrn: "1039004",
    organization: "Harmony New Mexico",
    fileStatus: "No Files",
    task: "Discharge",
    taskType: "Discharge Review",
    oasisDate: "2/16/2026",
    status: "Assigned",
    startDate: "2/23/2026",
    endDate: "2/25/2026",
    completedAt: "-",
    points: 0.5,
    estimatedImpact: "-",
  },
];

interface TasksPageProps {
  onNavigate?: (page: string) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [showCompleted, setShowCompleted] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    assignee: true,
    patient: true,
    mrn: true,
    organization: true,
    fileStatus: true,
    task: true,
    taskType: true,
    oasisDate: true,
    status: true,
    startDate: true,
    endDate: true,
    completedAt: true,
    points: true,
    estimatedImpact: true,
  });

  const toggleColumnVisibility = (columnKey: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey as keyof typeof prev],
    }));
  };

  const columnLabels = {
    assignee: "Assignee",
    patient: "Patient",
    mrn: "MRN",
    organization: "Organization",
    fileStatus: "File Status",
    task: "Task",
    taskType: "Task Type",
    oasisDate: "OASIS Date",
    status: "Status",
    startDate: "Start Date",
    endDate: "End Date",
    completedAt: "Completed At",
    points: "Points",
    estimatedImpact: "Estimated Impact",
  };

  const allColumns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "assignee",
        header: "Assignee",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-300" : "text-gray-900"}`}
          >
            {row.original.assignee}
          </div>
        ),
      },
      {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-300" : "text-gray-900"}`}
          >
            {row.original.patient}
          </div>
        ),
      },
      {
        accessorKey: "mrn",
        header: "MRN",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
          >
            {row.original.mrn}
          </div>
        ),
      },
      {
        accessorKey: "organization",
        header: "Organization",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-300" : "text-gray-900"}`}
          >
            {row.original.organization}
          </div>
        ),
      },
      {
        accessorKey: "fileStatus",
        header: "File Status",
        cell: ({ row }) => {
          const status = row.original.fileStatus;

          if (status.includes("Processed")) {
            return (
              <div className="flex items-center gap-2 text-green-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium">{status}</span>
              </div>
            );
          }

          if (status === "No Files") {
            return (
              <div className="flex items-center gap-2 text-slate-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-xs">{status}</span>
              </div>
            );
          }

          if (status.includes("Pending")) {
            return (
              <div className="flex items-center gap-2 text-yellow-500">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs font-medium">{status}</span>
              </div>
            );
          }

          if (status.includes("Hold")) {
            return (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs font-medium text-red-400">
                  {status}
                </span>
              </div>
            );
          }

          return (
            <div
              className={`text-xs ${theme === "dark" ? "text-zinc-300" : "text-gray-900"}`}
            >
              {status}
            </div>
          );
        },
      },
      {
        accessorKey: "task",
        header: "Task",
        cell: ({ row }) => (
          <Select
            value={row.original.task}
            onValueChange={(value) => {
              const updatedTasks = tasks.map((t) =>
                t.id === row.original.id ? { ...t, task: value } : t,
              );
              setTasks(updatedTasks);
            }}
          >
            <SelectTrigger
              className={`h-8 text-xs border rounded-md shadow-none hover:bg-gray-50 dark:hover:bg-zinc-800 ${theme === "dark" ? "bg-transparent text-zinc-300 border-zinc-700" : "bg-transparent text-gray-900 border-gray-300"}`}
            >
              <div className="flex items-center justify-between w-full">
                <SelectValue />
                <ChevronDown className="w-3 h-3 opacity-50" />
              </div>
            </SelectTrigger>
            <SelectContent
              className={theme === "dark" ? "bg-zinc-800 border-zinc-700" : ""}
            >
              <SelectItem value="Discharge">Discharge</SelectItem>
              <SelectItem value="Initial Assessment">
                Initial Assessment
              </SelectItem>
              <SelectItem value="Follow-up Visit">Follow-up Visit</SelectItem>
              <SelectItem value="OASIS Completion">OASIS Completion</SelectItem>
              <SelectItem value="Care Plan Review">Care Plan Review</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
      {
        accessorKey: "taskType",
        header: "Task Type",
        cell: ({ row }) => (
          <Select
            value={row.original.taskType}
            onValueChange={(value) => {
              const updatedTasks = tasks.map((t) =>
                t.id === row.original.id ? { ...t, taskType: value } : t,
              );
              setTasks(updatedTasks);
            }}
          >
            <SelectTrigger
              className={`h-8 text-xs border rounded-md shadow-none hover:bg-gray-50 dark:hover:bg-zinc-800 ${theme === "dark" ? "bg-transparent text-zinc-300 border-zinc-700" : "bg-transparent text-gray-900 border-gray-300"}`}
            >
              <div className="flex items-center justify-between w-full">
                <SelectValue />
                <ChevronDown className="w-3 h-3 opacity-50" />
              </div>
            </SelectTrigger>
            <SelectContent
              className={theme === "dark" ? "bg-zinc-800 border-zinc-700" : ""}
            >
              <SelectItem value="Discharge Review">Discharge Review</SelectItem>
              <SelectItem value="Assessment">Assessment</SelectItem>
              <SelectItem value="Documentation">Documentation</SelectItem>
              <SelectItem value="Visit">Visit</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
      {
        accessorKey: "oasisDate",
        header: "OASIS Date",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
          >
            {row.original.oasisDate}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Select
            value={row.original.status}
            onValueChange={(value) => {
              const updatedTasks = tasks.map((t) =>
                t.id === row.original.id ? { ...t, status: value } : t,
              );
              setTasks(updatedTasks);
            }}
          >
            <SelectTrigger
              className={`h-8 text-xs border rounded-md ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-blue-50 border-blue-200 text-blue-600"}`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <SelectValue />
                </div>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </div>
            </SelectTrigger>
            <SelectContent
              className={theme === "dark" ? "bg-zinc-800 border-zinc-700" : ""}
            >
              <SelectItem value="Assigned">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Assigned
                </div>
              </SelectItem>
              <SelectItem value="In Progress">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  In Progress
                </div>
              </SelectItem>
              <SelectItem value="Completed">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Completed
                </div>
              </SelectItem>
              <SelectItem value="On Hold">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  On Hold
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
          >
            {row.original.startDate}
          </div>
        ),
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
          >
            {row.original.endDate}
          </div>
        ),
      },
      {
        accessorKey: "completedAt",
        header: "Completed At",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
          >
            {row.original.completedAt}
          </div>
        ),
      },
      {
        accessorKey: "points",
        header: "Points",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-300" : "text-gray-900"}`}
          >
            {row.original.points}
          </div>
        ),
      },
      {
        accessorKey: "estimatedImpact",
        header: "Estimated Impact",
        cell: ({ row }) => (
          <div
            className={`text-xs ${theme === "dark" ? "text-zinc-300" : "text-gray-900"}`}
          >
            {row.original.estimatedImpact}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const [isOpen, setIsOpen] = useState(false);

          return (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={`h-7 w-7 ${theme === "dark" ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}
                aria-label={`Actions for ${row.original.patient}`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                  />
                  <div
                    className={`absolute right-0 mt-1 w-40 rounded-lg shadow-lg border z-20 ${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          console.log("Edit task:", row.original.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                          theme === "dark"
                            ? "hover:bg-zinc-800 text-zinc-300"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          const updatedTasks = tasks.filter(
                            (t) => t.id !== row.original.id,
                          );
                          setTasks(updatedTasks);
                          console.log("Delete task:", row.original.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [theme],
  );

  const columns = useMemo(
    () =>
      allColumns.filter((col) => {
        if (col.id === "select" || col.id === "actions") return true;
        if ("accessorKey" in col && col.accessorKey) {
          return columnVisibility[
            col.accessorKey as keyof typeof columnVisibility
          ];
        }
        return true;
      }),
    [allColumns, columnVisibility],
  );

  const handleAddTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: String(tasks.length + 1),
      assignee: taskData.assign_to,
      patient: taskData.patient,
      mrn: "MRN-2024-" + String(tasks.length + 1).padStart(3, "0"),
      organization: "General Hospital",
      fileStatus: "Pending",
      task: taskData.task_name,
      taskType: taskData.task_type,
      oasisDate: taskData.oasis_date,
      status: taskData.task_status,
      startDate: taskData.start_date,
      endDate: taskData.end_date,
      completedAt: taskData.completed_date,
      points: 0,
      estimatedImpact: "Medium",
    };

    setTasks([newTask, ...tasks]);
    console.log("✅ Task added:", newTask);
  };

  return (
    <div
      className={`flex h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}
    >
      <Sidebar currentPage="Tasks" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border-b px-8 py-3`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                Tasks
              </h1>
              <p
                className={`text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
              >
                Manage and track all tasks
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${theme === "dark" ? "border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700" : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download CSV
              </Button>
              <Button
                size="sm"
                onClick={() => setIsAddTaskModalOpen(true)}
                className={`text-xs ${theme === "dark" ? "bg-white hover:bg-zinc-200 text-black" : "bg-black hover:bg-gray-800 text-white"}`}
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add Task
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsViewMenuOpen(!isViewMenuOpen)}
                  className={`text-xs ${theme === "dark" ? "border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700" : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  <Columns className="w-3.5 h-3.5 mr-1.5" />
                  View
                </Button>
                {isViewMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsViewMenuOpen(false)}
                    />
                    <div
                      className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border z-20 ${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}
                    >
                      <div
                        className={`px-3 py-2 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}
                      >
                        <p
                          className={`text-xs font-semibold ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                        >
                          Toggle columns
                        </p>
                      </div>
                      <div className="py-1">
                        {Object.entries(columnLabels).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => toggleColumnVisibility(key)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                              theme === "dark"
                                ? "hover:bg-zinc-800 text-zinc-300"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 flex items-center justify-center ${
                                columnVisibility[
                                  key as keyof typeof columnVisibility
                                ]
                                  ? theme === "dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                  : theme === "dark"
                                    ? "text-zinc-600"
                                    : "text-gray-400"
                              }`}
                            >
                              {columnVisibility[
                                key as keyof typeof columnVisibility
                              ] && (
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <span>{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-6">
          <div
            className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border rounded-lg p-6`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Filter
                  className={`w-4 h-4 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                />
                <span
                  className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                >
                  Filters
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${theme === "dark" ? "bg-zinc-800 text-zinc-300" : "bg-gray-100 text-gray-700"}`}
                >
                  1
                </span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={showCompleted}
                  onCheckedChange={(checked) => setShowCompleted(!!checked)}
                />
                <span
                  className={`text-xs ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                >
                  Show completed
                </span>
              </label>
            </div>

            <DataTable
              columns={columns}
              data={tasks}
              theme={theme}
              searchKey="patient"
              searchPlaceholder="Search patient"
              entityLabel="task(s)"
              onRowSelectionChange={setRowSelection}
              rowSelection={rowSelection}
            />
          </div>
        </div>
      </main>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
