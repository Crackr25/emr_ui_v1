import React, { useMemo, useState } from "react";
import { Plus, Upload, CheckCircle2, Columns } from "lucide-react";
import { Sidebar } from "../shared/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Patient } from "../types/patient.types";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPatientColumns } from "./PatientColumns";
import { AddPatientModal, PatientFormData } from "./AddPatientModal";

// Mock Data
const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: " One Up",
    mrn: "MRN-2024-001",
    filesStatus: "processed",
    filesCount: 12,
    stage: "processed",
    organization: "General Hospital",
    tasks: 3,
    createdAt: "2024-02-10",
  },
  {
    id: "2",
    name: "Jane Doe",
    mrn: "MRN-2024-002",
    filesStatus: "pending",
    filesCount: 5,
    stage: "pending",
    organization: "City Medical Center",
    tasks: 7,
    createdAt: "2024-02-11",
  },
  {
    id: "3",
    name: "David Smith",
    mrn: "MRN-2024-003",
    filesStatus: "hold",
    filesCount: 3,
    stage: "hold",
    organization: "Regional Clinic",
    tasks: 2,
    createdAt: "2024-02-09",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    mrn: "MRN-2024-004",
    filesStatus: "no_files",
    stage: "pending",
    organization: "Metro Health",
    tasks: 1,
    createdAt: "2024-02-12",
  },
  {
    id: "5",
    name: "Michael Brown",
    mrn: "MRN-2024-005",
    filesStatus: "processed",
    filesCount: 8,
    stage: "processed",
    organization: "University Hospital",
    tasks: 5,
    createdAt: "2024-02-08",
  },
  {
    id: "6",
    name: "Emily Davis",
    mrn: "MRN-2024-006",
    filesStatus: "pending",
    filesCount: 2,
    stage: "pending",
    organization: "Community Care",
    tasks: 4,
    createdAt: "2024-02-11",
  },
];

interface PatientsPageProps {
  onNavigate?: (page: string) => void;
  onPatientSelect?: (patientName: string, patientMRN: string) => void;
}

export const PatientsPage: React.FC<PatientsPageProps> = ({
  onNavigate,
  onPatientSelect,
}) => {
  const { theme } = useTheme();
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [bulkStage, setBulkStage] = useState<string>("");
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    mrn: true,
    filesStatus: true,
    stage: true,
    organization: true,
    tasks: true,
    createdAt: true,
  });

  const handleStageChange = (
    patientId: string,
    newStage: "pending" | "processed" | "hold",
  ) => {
    const updatedPatients = patients.map((patient) =>
      patient.id === patientId ? { ...patient, stage: newStage } : patient,
    );
    setPatients(updatedPatients);
    console.log(`✅ Updated patient ${patientId} to stage: ${newStage}`);
  };

  const toggleColumnVisibility = (columnKey: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey as keyof typeof prev],
    }));
  };

  const columnLabels = {
    name: "Name",
    mrn: "MedicalRecord",
    filesStatus: "ProcessingStatus",
    stage: "ReferralStage",
    organization: "AssignedUser",
    tasks: "Tasks",
    createdAt: "CreatedAt",
  };

  const allColumns = useMemo(
    () =>
      createPatientColumns({
        theme,
        onPatientSelect,
        onStageChange: handleStageChange,
      }),
    [theme, onPatientSelect, patients],
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

  const handleAddPatient = (patientData: PatientFormData) => {
    // Generate a new patient record
    const newPatient: Patient = {
      id: String(patients.length + 1),
      name: [
        patientData.first_name,
        patientData.middle_name,
        patientData.last_name,
      ]
        .filter(Boolean)
        .join(" "),
      mrn:
        patientData.medical_record ||
        `MRN-${new Date().getFullYear()}-${String(patients.length + 1).padStart(3, "0")}`,
      filesStatus: "no_files",
      stage: patientData.referral_stage.toLowerCase() as
        | "pending"
        | "processed"
        | "hold",
      organization: "General Hospital",
      tasks: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPatients([newPatient, ...patients]);
    console.log("✅ Patient added:", newPatient);
    console.log("📋 Patient form data:", patientData);
  };

  const handleBulkStageChange = () => {
    if (!bulkStage) return;

    const selectedRowIndices = Object.keys(rowSelection).filter(
      (key) => rowSelection[key],
    );
    if (selectedRowIndices.length === 0) return;

    const updatedPatients = patients.map((patient, index) => {
      if (selectedRowIndices.includes(String(index))) {
        return {
          ...patient,
          stage: bulkStage as "pending" | "processed" | "hold",
        };
      }
      return patient;
    });

    setPatients(updatedPatients);
    setRowSelection({});
    setBulkStage("");
    console.log(
      `✅ Updated ${selectedRowIndices.length} patient(s) to stage: ${bulkStage}`,
    );
  };

  const selectedCount = Object.values(rowSelection).filter(Boolean).length;

  return (
    <div
      className={`flex h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}
    >
      {/* Sidebar */}
      <Sidebar currentPage="Patients" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border-b px-8 py-3`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                Patients
              </h1>
              <p
                className={`text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
              >
                Manage and track patient records
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${theme === "dark" ? "border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700" : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" />
                Import
              </Button>
              <Button
                size="sm"
                onClick={() => setIsAddPatientModalOpen(true)}
                className={`text-xs ${theme === "dark" ? "bg-white hover:bg-zinc-200 text-black" : "bg-black hover:bg-gray-800 text-white"}`}
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add Patient
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

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {/* Bulk Actions Bar */}
          {selectedCount > 0 && (
            <div
              className={`mb-4 flex items-center justify-between px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-blue-50 border-blue-200"}`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                />
                <span
                  className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-blue-900"}`}
                >
                  {selectedCount} patient{selectedCount > 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-700"}`}
                >
                  Change stage to:
                </span>
                <Select value={bulkStage} onValueChange={setBulkStage}>
                  <SelectTrigger
                    className={`w-40 ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white"}`}
                  >
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent
                    className={
                      theme === "dark" ? "bg-zinc-800 border-zinc-700" : ""
                    }
                  >
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
                <Button
                  onClick={handleBulkStageChange}
                  disabled={!bulkStage}
                  size="sm"
                  className={`${theme === "dark" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}

          {/* Patients Table */}
          <div
            className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border rounded-lg p-6`}
          >
            <DataTable
              columns={columns}
              data={patients}
              theme={theme}
              searchKey="name"
              searchPlaceholder="Search patients..."
              entityLabel="patient(s)"
              onRowSelectionChange={setRowSelection}
              rowSelection={rowSelection}
            />
          </div>
        </div>
      </main>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onAddPatient={handleAddPatient}
      />
    </div>
  );
};
