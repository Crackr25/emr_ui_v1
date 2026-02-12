import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  role: 'doctor' | 'nurse' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: 'doctor' | 'nurse' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: 'doctor' | 'nurse' | 'admin') => {
    // Extract name from email (simple logic)
    const name = email.split('@')[0].replace('.', ' ').toUpperCase();
    
    setUser({
      email,
      role,
      name,
    });

    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify({ email, role, name }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
