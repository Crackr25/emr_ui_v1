import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Loader2, Activity, ChevronDown } from 'lucide-react';
import { loginSchema, LoginFormData } from '../schemas/loginSchema';
import { InputField } from '../components/InputField';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDebugRole, setShowDebugRole] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'doctor',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate API call with 2-second delay
    setTimeout(() => {
      console.log('🔐 Login Successful!');
      console.log('📧 Email:', data.email);
      console.log('👤 Role:', data.role || 'doctor');
      console.log('📊 Full Data:', data);
      
      // Call login function to authenticate user
      login(data.email, data.role || 'doctor');
      
      setIsLoading(false);
      
      // User will be automatically redirected to Patients page
      // by the App.tsx conditional rendering
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 via-blue-700 to-blue-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-bold">HealthCare EMR</h1>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="w-full max-w-md aspect-square bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8">
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-24 h-24 mx-auto mb-4 text-white/80" strokeWidth={1.5} />
                <p className="text-lg font-medium text-white/90">Modern Healthcare</p>
                <p className="text-sm text-white/70 mt-2">Trusted by 10,000+ professionals</p>
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>

          {/* Feature Text */}
          <p className="mt-8 text-center text-white/80 max-w-md">
            Streamline patient care with our comprehensive Electronic Medical Records system
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">HealthCare EMR</h1>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Debug Role Selector Toggle */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowDebugRole(!showDebugRole)}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
            >
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  showDebugRole ? 'rotate-180' : ''
                }`}
              />
              Debug: Mock Role Selector
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Debug Role Selector */}
            {showDebugRole && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <InputField
                  label="Simulate Role (Debug Only)"
                  name="role"
                  type="select"
                  register={register}
                  error={errors.role}
                  options={[
                    { value: 'doctor', label: '👨‍⚕️ Doctor' },
                    { value: 'nurse', label: '👩‍⚕️ Nurse' },
                    { value: 'admin', label: '👔 Admin' },
                  ]}
                />
                <p className="text-xs text-amber-700 mt-2">
                  Current: <span className="font-semibold">{selectedRole}</span>
                </p>
              </div>
            )}

            {/* Email Field */}
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="doctor@hospital.com"
              register={register}
              error={errors.email}
              icon={<Mail className="w-5 h-5" />}
            />

            {/* Password Field */}
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              register={register}
              error={errors.password}
              icon={<Lock className="w-5 h-5" />}
            />

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-700 text-white py-3.5 px-4 rounded-lg font-semibold
                hover:from-teal-700 hover:to-blue-800 
                focus:outline-none focus:ring-4 focus:ring-teal-500/50
                disabled:opacity-70 disabled:cursor-not-allowed
                transition-all duration-200 shadow-lg shadow-teal-500/30
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-50 text-slate-500">
                Healthcare Professional Access
              </span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600">
            Need help?{' '}
            <a
              href="#"
              className="font-medium text-teal-600 hover:text-teal-700 transition-colors"
            >
              Contact IT Support
            </a>
          </p>

          {/* Security Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>HIPAA Compliant & Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};
