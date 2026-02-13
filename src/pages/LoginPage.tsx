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

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          {/* SSO Buttons */}
          <div className="space-y-3">
            {/* Apple Sign In */}
            <Button
              type="button"
              onClick={() => {
                console.log('🍎 Sign in with Apple');
                // Simulate Apple login
                setTimeout(() => {
                  login('apple@user.com', 'doctor');
                }, 1000);
              }}
              className="w-full bg-white hover:bg-zinc-50 text-black border border-zinc-300"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Start with Apple
            </Button>

            {/* Microsoft Sign In */}
            <Button
              type="button"
              onClick={() => {
                console.log('🪟 Sign in with Microsoft');
                // Simulate Microsoft login
                setTimeout(() => {
                  login('microsoft@user.com', 'doctor');
                }, 1000);
              }}
              className="w-full bg-white hover:bg-zinc-50 text-black border border-zinc-300"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path fill="#f25022" d="M11.4 0H0v11.4h11.4V0z"/>
                <path fill="#00a4ef" d="M24 0H12.6v11.4H24V0z"/>
                <path fill="#7fba00" d="M11.4 12.6H0V24h11.4V12.6z"/>
                <path fill="#ffb900" d="M24 12.6H12.6V24H24V12.6z"/>
              </svg>
              Start with Microsoft
            </Button>

            {/* Google Sign In */}
            <Button
              type="button"
              onClick={() => {
                console.log('🔐 Sign in with Google');
                // Simulate Google login
                setTimeout(() => {
                  login('google@user.com', 'doctor');
                }, 1000);
              }}
              className="w-full bg-zinc-900 hover:bg-black text-white"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Start with Google
            </Button>

            {/* Admin Login - For Testing */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-zinc-500">Admin Access</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => {
                console.log('👑 Sign in as Admin');
                // Simulate Admin login
                setTimeout(() => {
                  login('admin@oneup.com', 'admin');
                }, 1000);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              Sign in as Admin
            </Button>
          </div>

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
