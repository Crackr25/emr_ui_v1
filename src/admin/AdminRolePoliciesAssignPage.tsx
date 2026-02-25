import React, { useState, useMemo } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { AddRolePolicyModal } from "./AddRolePolicyModal";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Role } from "../types/role.types";
import { RolePolicy, RolePolicyFormData } from "../types/policy.types";
import { createRolePolicyColumns } from "./RolePolicyColumns";

interface AdminRolePoliciesAssignPageProps {
  selectedRole: Role;
  onNavigate?: (page: string) => void;
  onBack: () => void;
}

const MOCK_POLICY_GROUPS = [
  { policy_id: "1", policy_name: "Clinical Access" },
  { policy_id: "2", policy_name: "Administrative Rights" },
  { policy_id: "3", policy_name: "Billing Access" },
  { policy_id: "4", policy_name: "Patient Management" },
  { policy_id: "5", policy_name: "User Management" },
];

const MOCK_ROLE_POLICIES: RolePolicy[] = [
  {
    policy_id: "1",
    role_id: "1",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    status: "active",
    role_name: "Member",
    policy_name: "Clinical Access",
  },
  {
    policy_id: "2",
    role_id: "2",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    status: "active",
    role_name: "Admin",
    policy_name: "Administrative Rights",
  },
  {
    policy_id: "3",
    role_id: "2",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    status: "active",
    role_name: "Admin",
    policy_name: "User Management",
  },
  {
    policy_id: "1",
    role_id: "3",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    status: "active",
    role_name: "Owner",
    policy_name: "Clinical Access",
  },
  {
    policy_id: "2",
    role_id: "3",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    status: "active",
    role_name: "Owner",
    policy_name: "Administrative Rights",
  },
  {
    policy_id: "3",
    role_id: "3",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    status: "active",
    role_name: "Owner",
    policy_name: "Billing Access",
  },
];

export const AdminRolePoliciesAssignPage: React.FC<
  AdminRolePoliciesAssignPageProps
> = ({ selectedRole, onNavigate, onBack }) => {
  const { theme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [rolePolicies, setRolePolicies] = useState<RolePolicy[]>(
    MOCK_ROLE_POLICIES.filter((rp) => rp.role_id === selectedRole.role_id),
  );

  const handleAddRolePolicy = (data: RolePolicyFormData) => {
    const policy = MOCK_POLICY_GROUPS.find(
      (p) => p.policy_id === data.policy_id,
    );

    const newRolePolicy: RolePolicy = {
      ...data,
      role_id: selectedRole.role_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      role_name: selectedRole.role_name,
      policy_name: policy?.policy_name,
    };

    setRolePolicies([newRolePolicy, ...rolePolicies]);
    console.log("✅ Policy assigned to role:", newRolePolicy);
  };

  const handleDelete = (policyId: string, roleId: string) => {
    if (
      window.confirm(
        "Are you sure you want to remove this policy from this role?",
      )
    ) {
      setRolePolicies(
        rolePolicies.filter(
          (rp) => !(rp.policy_id === policyId && rp.role_id === roleId),
        ),
      );
      console.log("🗑️ Policy removed from role:", { policyId, roleId });
    }
  };

  const columns = useMemo(
    () => createRolePolicyColumns({ theme, onDelete: handleDelete }),
    [theme],
  );

  return (
    <div
      className={`flex h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}
    >
      <AdminSidebar currentPage="Roles" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border-b px-8 py-3`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className={`h-8 px-3 ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-400 hover:text-white" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"}`}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="text-xs">Back to Roles</span>
              </Button>
              <div>
                <h1
                  className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {selectedRole.role_name} - Policy Assignments
                </h1>
                <p
                  className={`text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                >
                  Manage policy groups assigned to this role
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className={`${theme === "dark" ? "bg-white hover:bg-zinc-200 text-black" : "bg-black hover:bg-gray-800 text-white"}`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Assign Policy
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-6">
          <div
            className={`${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} border rounded-lg p-6`}
          >
            <div className="mb-4">
              <h3
                className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                Assigned Policies
              </h3>
              <p
                className={`text-xs mt-1 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
              >
                Policy groups assigned to {selectedRole.role_name}
              </p>
            </div>

            <DataTable
              columns={columns}
              data={rolePolicies}
              theme={theme}
              searchKey="policy_name"
              searchPlaceholder="Search policies..."
              entityLabel="policy assignment(s)"
            />
          </div>
        </div>
      </main>

      <AddRolePolicyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddRolePolicy}
        roles={[
          { role_id: selectedRole.role_id, role_name: selectedRole.role_name },
        ]}
        policyGroups={MOCK_POLICY_GROUPS}
        preselectedRoleId={selectedRole.role_id}
      />
    </div>
  );
};
