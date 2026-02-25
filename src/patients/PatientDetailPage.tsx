import React from "react";
import { Sidebar } from "../shared/Sidebar";
import { PDFViewer } from "../shared/PDFViewer";
import { useTheme } from "../context/ThemeContext";
import { IntakeTab } from "./tabs/IntakeTab";
import { ICD10CodesTab } from "./tabs/ICD10CodesTab";
import { RulesTab } from "./tabs/RulesTab";
import { InsuranceTab } from "./tabs/InsuranceTab";
import { AskAITab } from "./tabs/AskAITab";
import { TasksTab } from "./tabs/TasksTab";
import { NotesTab } from "./tabs/NotesTab";
import { PlanOfCareTab } from "./tabs/PlanOfCareTab";
import { VisitsTab } from "./tabs/VisitsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface PatientDetailPageProps {
  onNavigate?: (page: string) => void;
  patientName?: string;
  patientMRN?: string;
}

export const PatientDetailPage: React.FC<PatientDetailPageProps> = ({
  onNavigate,
  patientName = "One Up",
  patientMRN = "MRN: 123456789",
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}
    >
      {/* Sidebar */}
      <Sidebar currentPage="PatientDetail" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border-b px-8 py-3`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {patientName}
              </h1>
              <div
                className={`flex items-center gap-3 mt-0.5 text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
              >
                <span>{patientMRN}</span>
                <Badge
                  variant="secondary"
                  className="bg-zinc-800 text-zinc-300 border-0 text-xs"
                >
                  Production get/meal
                </Badge>
                <span>Created: Dec 19, 2025</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <Tabs
          defaultValue="Intake"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div
            className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border-b px-8`}
          >
            <TabsList className="bg-transparent h-auto p-0 gap-4">
              <TabsTrigger
                value="Intake"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                Intake
              </TabsTrigger>
              <TabsTrigger
                value="Rules"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                Rules
              </TabsTrigger>
              <TabsTrigger
                value="ICD-10 Codes"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                ICD-10 Codes
              </TabsTrigger>
              <TabsTrigger
                value="Insurance"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                Insurance
              </TabsTrigger>
              <TabsTrigger
                value="Ask AI"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                Ask AI
              </TabsTrigger>
              <TabsTrigger
                value="Tasks"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                Tasks
              </TabsTrigger>
              <TabsTrigger
                value="Notes"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                Notes
              </TabsTrigger>
              <TabsTrigger
                value="Plan of Care"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                Plan of Care
              </TabsTrigger>
              <TabsTrigger
                value="Visits"
                className={`bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-2 text-xs data-[state=active]:font-medium ${theme === "dark" ? "text-zinc-400 data-[state=active]:text-white data-[state=active]:border-white" : "text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-gray-900"}`}
              >
                Visits
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent
            value="Intake"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <IntakeTab />
          </TabsContent>

          <TabsContent
            value="Rules"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <RulesTab />
          </TabsContent>

          <TabsContent
            value="ICD-10 Codes"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <ICD10CodesTab />
          </TabsContent>

          <TabsContent
            value="Insurance"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <InsuranceTab />
          </TabsContent>

          <TabsContent
            value="Ask AI"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <AskAITab />
          </TabsContent>

          <TabsContent
            value="Tasks"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <TasksTab />
          </TabsContent>

          <TabsContent
            value="Notes"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <NotesTab />
          </TabsContent>

          <TabsContent
            value="Plan of Care"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <PlanOfCareTab />
          </TabsContent>

          <TabsContent
            value="Visits"
            className="flex-1 flex m-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PDFViewer />
            <VisitsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
