import React, { useState } from 'react';
import { X, Copy, Check, Mail, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InviteLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  role: string;
  inviteLink: string;
}

export const InviteLinkModal: React.FC<InviteLinkModalProps> = ({
  isOpen,
  onClose,
  email,
  role,
  inviteLink,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    window.open(inviteLink, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span>Invitation Sent!</span>
          </DialogTitle>
          <DialogDescription className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
            An invitation has been created for the following user
          </DialogDescription>
        </DialogHeader>

        {/* User Info */}
        <div className={`rounded-lg p-4 space-y-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
          <div className="flex justify-between items-center">
            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Email
            </span>
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {email}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Role
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              theme === 'dark' ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-700'
            }`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          </div>
        </div>

        {/* Invite Link */}
        <div className="space-y-2">
          <label className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
            Invitation Link
          </label>
          <div className={`p-3 rounded-lg border ${
            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <code className={`block text-xs break-all ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
              {inviteLink}
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleCopyLink}
            className={`flex-1 ${
              copied
                ? theme === 'dark'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-green-600 hover:bg-green-700'
                : theme === 'dark'
                ? 'bg-white hover:bg-zinc-200 text-black'
                : 'bg-black hover:bg-gray-800 text-white'
            }`}
            size="sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </>
            )}
          </Button>
          <Button
            onClick={handleOpenLink}
            variant="outline"
            className={`${theme === 'dark' ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            size="sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open
          </Button>
        </div>

        {/* Info Message */}
        <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
          💡 In production, this link would be automatically sent via email to the user.
        </p>

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
