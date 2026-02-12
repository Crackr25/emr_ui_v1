import React from 'react';
import { 
  CheckSquare, 
  Users, 
  Calendar, 
  Sparkles, 
  Shield, 
  LayoutDashboard, 
  Building2,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
        active
          ? 'bg-slate-800 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

interface SidebarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage = 'Patients', onNavigate }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: <CheckSquare className="w-5 h-5" />, label: 'Tasks' },
    { icon: <Users className="w-5 h-5" />, label: 'Patients' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Schedule' },
    { icon: <Sparkles className="w-5 h-5" />, label: 'AI Studio' },
    { icon: <Shield className="w-5 h-5" />, label: 'Insurance' },
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Organizations' },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo/Brand */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-white font-semibold text-lg">HealthCare</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
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
      <div className="px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-slate-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
