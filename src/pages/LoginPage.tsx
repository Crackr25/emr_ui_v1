import React, { useState } from 'react';
import { Activity, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OTPPage } from './OTPPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      console.log('🔐 Email/Password login:', email);
      console.log('📧 Sending OTP to:', email);
      // In production, validate credentials and send OTP
      setVerifiedEmail(email);
      setShowOTP(true);
    }
  };

  // Show OTP page if email/password submitted
  if (showOTP) {
    return <OTPPage email={verifiedEmail} onBack={() => setShowOTP(false)} />;
  }

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
                <p className="text-lg font-medium text-white">Modern Healthcare</p>
                <p className="text-sm text-zinc-400 mt-2">Trusted by 10,000+ professionals</p>
              </div>
            </div>
          </div>

          {/* Feature Text */}
          <p className="mt-8 text-center text-zinc-400 max-w-md">
            Streamline patient care with our comprehensive Electronic Medical Records system
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
            <h2 className="text-3xl font-bold text-black mb-2">Welcome Back</h2>
            <p className="text-zinc-600">Sign in to access your dashboard</p>
          </div>

          {/* Email/Password Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs text-zinc-500 mt-6">
            By proceeding, you agree to the{' '}
            <a href="#" className="underline hover:text-black">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-black">Terms of Use</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
