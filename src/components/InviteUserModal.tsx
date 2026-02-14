import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: 'doctor' | 'nurse' | 'admin') => void;
}

export const InviteUserModal: React.FC<InviteUserModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'doctor' | 'nurse' | 'admin'>('doctor');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    onInvite(email, role);
    
    // Reset form
    setEmail('');
    setRole('doctor');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </div>
            <span>Invite User</span>
          </DialogTitle>
          <DialogDescription className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
            Send an invitation to a new user to join the platform
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Email Input */}
          <div>
            <Label htmlFor="modal-email" className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Email Address
            </Label>
            <div className="relative mt-1">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`} />
              <Input
                id="modal-email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`pl-9 h-10 text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus-visible:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus-visible:ring-blue-500'}`}
              />
            </div>
          </div>

          {/* Role Select */}
          <div>
            <Label htmlFor="modal-role" className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Role
            </Label>
            <Select value={role} onValueChange={(value: 'doctor' | 'nurse' | 'admin') => setRole(value)}>
              <SelectTrigger 
                className={`mt-1 h-10 text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                <SelectItem value="doctor" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Doctor</SelectItem>
                <SelectItem value="nurse" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Nurse</SelectItem>
                <SelectItem value="admin" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={`flex-1 ${theme === 'dark' ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!email}
              className={`flex-1 ${theme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              Send Invitation
            </Button>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none ${
            theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
};
