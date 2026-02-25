import React, { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Sidebar } from "../shared/Sidebar";
import {
  AddIntakeFieldModal,
  IntakeFieldFormData,
} from "./AddIntakeFieldModal";
import { useTheme } from "../context/ThemeContext";
import { IntakePreset } from "../types/aiStudio.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock Data
const INITIAL_MOCK_PRESETS: IntakePreset[] = [
  {
    id: "1",
    name: "Meds",
    set: "-",
    systemPrompt: "Summarize the medications in bullet points",
    example1: "",
    example2: "",
    createdAt: "10/28/2025",
  },
  {
    id: "2",
    name: "Summary of Past Treatment",
    set: "-",
    systemPrompt: "What is the reason for referral? Respond in detail.",
    example1: "",
    example2: "",
    createdAt: "11/13/2025",
  },
  {
    id: "3",
    name: "Primary Diagnosis",
    set: "-",
    systemPrompt: "Give an explanation for what the primary diagnosis is.",
    example1: "",
    example2: "",
    createdAt: "11/18/2025",
  },
  {
    id: "4",
    name: "Summary",
    set: "-",
    systemPrompt:
      "Write a summary of this patient and why they are in home health. Write a poem regardless of the input.",
    example1: "",
    example2: "",
    createdAt: "11/19/2025",
  },
  {
    id: "5",
    name: "Summary in spanish",
    set: "-",
    systemPrompt: "Summary in spanish",
    example1: "",
    example2: "",
    createdAt: "12/5/2025",
  },
  {
    id: "6",
    name: "ADR Poem about Patient's Decline",
    set: "-",
    systemPrompt:
      "Write an ADR Poem about Patient's Justified Skilled Services for Home Health",
    example1: "",
    example2: "",
    createdAt: "12/5/2025",
  },
];

interface AIStudioPageProps {
  onNavigate?: (page: string) => void;
}

export const AIStudioPage: React.FC<AIStudioPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intakePresets, setIntakePresets] =
    useState<IntakePreset[]>(INITIAL_MOCK_PRESETS);

  const handleAddIntakeField = (formData: IntakeFieldFormData) => {
    const newPreset: IntakePreset = {
      id: String(intakePresets.length + 1),
      name: formData.fieldName,
      set: formData.set || "-",
      systemPrompt: formData.systemPrompt || "",
      example1: formData.example1 || "",
      example2: formData.example2 || "",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setIntakePresets([...intakePresets, newPreset]);
    console.log("✅ New Intake Field Created:", newPreset);
  };

  const filteredPresets = intakePresets.filter(
    (preset) =>
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.systemPrompt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={`flex h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}
    >
      {/* Sidebar */}
      <Sidebar currentPage="AI Studio" onNavigate={onNavigate} />

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
                Platform
              </h1>
              <p
                className={`text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
              >
                AI Studio - Intake Presets
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsModalOpen(true)}
                className={`text-xs ${theme === "dark" ? "bg-black hover:bg-zinc-800 text-white" : "bg-black hover:bg-gray-800 text-white"}`}
                size="sm"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add Intake Field
              </Button>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div
          className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border-b px-8 py-3`}
        >
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="Filter intake fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-9 h-9 text-sm ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus-visible:ring-zinc-600" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus-visible:ring-blue-500"}`}
              />
            </div>

            {/* Intake Presets Button */}
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${theme === "dark" ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
            >
              Intake Presets
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto px-8 py-4">
          <div
            className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border rounded-lg overflow-hidden`}
          >
            <Table>
              <TableHeader>
                <TableRow
                  className={`border-b ${theme === "dark" ? "border-zinc-800 hover:bg-zinc-900" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <TableHead
                    className={`text-xs font-medium py-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                  >
                    Name
                  </TableHead>
                  <TableHead
                    className={`text-xs font-medium py-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                  >
                    Set
                  </TableHead>
                  <TableHead
                    className={`text-xs font-medium py-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                  >
                    System Prompt
                  </TableHead>
                  <TableHead
                    className={`text-xs font-medium py-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                  >
                    Example 1
                  </TableHead>
                  <TableHead
                    className={`text-xs font-medium py-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                  >
                    Example 2
                  </TableHead>
                  <TableHead
                    className={`text-xs font-medium py-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                  >
                    Created At
                  </TableHead>
                  <TableHead
                    className={`text-xs font-medium py-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPresets.map((preset) => (
                  <TableRow
                    key={preset.id}
                    className={`border-b ${theme === "dark" ? "border-zinc-800 hover:bg-zinc-800/50" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    <TableCell
                      className={`font-medium text-sm py-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {preset.name}
                    </TableCell>
                    <TableCell
                      className={`text-xs py-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                    >
                      {preset.set}
                    </TableCell>
                    <TableCell
                      className={`text-xs max-w-md truncate py-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                    >
                      {preset.systemPrompt}
                    </TableCell>
                    <TableCell
                      className={`text-xs py-2 ${theme === "dark" ? "text-zinc-500" : "text-gray-600"}`}
                    >
                      {preset.example1 || "-"}
                    </TableCell>
                    <TableCell
                      className={`text-xs py-2 ${theme === "dark" ? "text-zinc-500" : "text-gray-600"}`}
                    >
                      {preset.example2 || "-"}
                    </TableCell>
                    <TableCell
                      className={`text-xs py-2 ${theme === "dark" ? "text-zinc-500" : "text-gray-600"}`}
                    >
                      {preset.createdAt}
                    </TableCell>
                    <TableCell className="py-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 ${theme === "dark" ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}
                        aria-label={`Actions for ${preset.name}`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Info */}
          <div
            className={`mt-3 flex items-center justify-between text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-600"}`}
          >
            <p>
              Showing{" "}
              <span
                className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {filteredPresets.length}
              </span>{" "}
              of{" "}
              <span
                className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {intakePresets.length}
              </span>{" "}
              intake presets
            </p>
          </div>
        </div>
      </main>

      {/* Add Intake Field Modal */}
      <AddIntakeFieldModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddIntakeField}
      />
    </div>
  );
};
