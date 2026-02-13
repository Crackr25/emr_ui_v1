import React, { useState } from 'react';
import { Activity, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterPageProps {
  inviteEmail?: string;
  inviteRole?: 'doctor' | 'nurse' | 'admin';
  onComplete?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ 
  inviteEmail = 'user@example.com',
  inviteRole = 'doctor',
  onComplete 
}) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('✅ User registered:', {
        email: inviteEmail,
        role: inviteRole,
        password: '***hidden***',
      });

      // Auto-login after registration
      login(inviteEmail, inviteRole);
      setIsSubmitting(false);
      onComplete?.();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Activity className="w-7 h-7 text-black" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-bold">OneUp</h1>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="w-full max-w-md aspect-square bg-zinc-900 rounded-2xl shadow-2xl p-4">
            <div className="w-full h-full bg-zinc-800 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-24 h-24 mx-auto mb-4 text-white" strokeWidth={1.5} />
                <p className="text-lg font-medium text-white">Welcome to the Team</p>
                <p className="text-sm text-zinc-400 mt-2">Complete your registration to get started</p>
              </div>
            </div>
          </div>

          {/* Feature Text */}
          <p className="mt-8 text-center text-zinc-400 max-w-md">
            Join thousands of healthcare professionals using our platform
          </p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold text-black">OneUp</h1>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Complete Registration</h2>
            <p className="text-zinc-600">Set up your password to access your account</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email (Read-only) */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={inviteEmail}
                readOnly
                disabled
                className="mt-1.5 bg-gray-50 text-gray-700 cursor-not-allowed border-gray-200"
              />
              <p className="mt-1 text-xs text-zinc-500">This email was invited to join as a {inviteRole}</p>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="Enter your password"
                  className={`pl-10 pr-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-zinc-500">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  placeholder="Confirm your password"
                  className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-800 text-white"
              size="lg"
            >
              {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs text-zinc-500 mt-6">
            By completing registration, you agree to the{' '}
            <a href="#" className="underline hover:text-black">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-black">Terms of Use</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
