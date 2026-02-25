import React, { useState, useRef, useEffect } from "react";
import {
  CheckSquare,
  Users,
  Calendar,
  Sparkles,
  Shield,
  LayoutDashboard,
  Building2,
  User,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  Check,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

// ─── Mock organizations (replace with API data) ───────────────────────────────
const ORGANIZATIONS = [
  { id: "1", name: "Sunrise Health Clinic" },
  { id: "2", name: "Bayview Medical Group" },
  { id: "3", name: "Northside Care Center" },
];

// ─── Organization switcher ────────────────────────────────────────────────────

interface Org {
  id: string;
  name: string;
}

interface OrgSwitcherProps {
  orgs: Org[];
  selected: Org;
  onSelect: (org: Org) => void;
}

const OrgSwitcher: React.FC<OrgSwitcherProps> = ({
  orgs,
  selected,
  onSelect,
}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
          isDark
            ? "bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800"
            : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Building2 className="w-3.5 h-3.5 shrink-0 text-blue-500" />
        <span className="flex-1 truncate text-left">{selected.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""} ${isDark ? "text-zinc-500" : "text-gray-400"}`}
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 right-0 top-full mt-1 z-50 rounded-md border shadow-lg overflow-hidden ${
            isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-200"
          }`}
        >
          {orgs.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                onSelect(org);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                org.id === selected.id
                  ? isDark
                    ? "bg-zinc-800 text-white"
                    : "bg-blue-50 text-blue-700"
                  : isDark
                    ? "text-zinc-300 hover:bg-zinc-800"
                    : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="flex-1 truncate text-left">{org.name}</span>
              {org.id === selected.id && <Check className="w-3 h-3 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Sidebar item ─────────────────────────────────────────────────────────────

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  onClick,
}) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        active
          ? theme === "dark"
            ? "bg-zinc-800 text-white"
            : "bg-gray-100 text-gray-900"
          : theme === "dark"
            ? "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      <div className="w-4 h-4">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

interface SidebarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage = "Patients",
  onNavigate,
}) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [selectedOrg, setSelectedOrg] = useState<{ id: string; name: string }>(
    ORGANIZATIONS[0],
  );

  const menuItems = [
    { icon: <CheckSquare className="w-4 h-4" />, label: "Tasks" },
    { icon: <Users className="w-4 h-4" />, label: "Patients" },
    { icon: <Calendar className="w-4 h-4" />, label: "Schedule" },
    { icon: <Sparkles className="w-4 h-4" />, label: "AI Studio" },
    { icon: <Shield className="w-4 h-4" />, label: "Insurance" },
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard" },
    { icon: <Building2 className="w-4 h-4" />, label: "Organizations" },
  ];

  return (
    <aside
      className={`w-56 h-screen flex flex-col ${theme === "dark" ? "bg-zinc-950 border-zinc-800" : "bg-white border-gray-200"} border-r`}
    >
      {/* Logo/Brand */}
      <div
        className={`px-4 py-3 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-md flex items-center justify-center ${theme === "dark" ? "bg-white" : "bg-black"}`}
          >
            <span
              className={`font-bold text-xs ${theme === "dark" ? "text-black" : "text-white"}`}
            >
              O
            </span>
          </div>
          <span
            className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            OneUp
          </span>
        </div>
      </div>

      {/* Organization Switcher */}
      <div
        className={`px-3 py-2.5 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}
      >
        <p
          className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}
        >
          Organization
        </p>
        <OrgSwitcher
          orgs={ORGANIZATIONS}
          selected={selectedOrg}
          onSelect={setSelectedOrg}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={currentPage === item.label}
            onClick={() => onNavigate?.(item.label)}
          />
        ))}
      </nav>

      {/* User Profile */}
      <div
        className={`px-3 py-3 border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}
      >
        <div className="flex items-center gap-2 px-2 mb-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-zinc-800" : "bg-gray-200"}`}
          >
            <User
              className={`w-4 h-4 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-xs font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {user?.name || "User"}
            </p>
            <p
              className={`text-xs truncate ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
            >
              {user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-2 px-2 py-1.5 mb-2 text-xs rounded-md transition-colors ${theme === "dark" ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
        >
          {theme === "dark" ? (
            <Sun className="w-3.5 h-3.5" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors ${theme === "dark" ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
