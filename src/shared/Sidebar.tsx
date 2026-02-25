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
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        active
          ? theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-gray-100 text-gray-900'
          : theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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

export const Sidebar: React.FC<SidebarProps> = ({ currentPage = 'Patients', onNavigate }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { icon: <CheckSquare className="w-4 h-4" />, label: 'Tasks' },
    { icon: <Users className="w-4 h-4" />, label: 'Patients' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Schedule' },
    { icon: <Sparkles className="w-4 h-4" />, label: 'AI Studio' },
    { icon: <Shield className="w-4 h-4" />, label: 'Insurance' },
    { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { icon: <Building2 className="w-4 h-4" />, label: 'Organizations' },
  ];

  return (
    <aside className={`w-56 h-screen flex flex-col ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-200'} border-r`}>
      {/* Logo/Brand */}
      <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-md flex items-center justify-center ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}>
            <span className={`font-bold text-xs ${theme === 'dark' ? 'text-black' : 'text-white'}`}>O</span>
          </div>
          <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>OneUp</span>
        </div>
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
      <div className={`px-3 py-3 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2 px-2 mb-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
            <User className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'User'}</p>
            <p className={`text-xs truncate ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{user?.email}</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-2 px-2 py-1.5 mb-2 text-xs rounded-md transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
