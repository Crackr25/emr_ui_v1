import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { LoginFormData } from '../schemas/loginSchema';

interface InputFieldProps {
  label: string;
  name: keyof LoginFormData;
  type?: 'text' | 'email' | 'password' | 'select';
  placeholder?: string;
  register: UseFormRegister<LoginFormData>;
  error?: FieldError;
  icon?: React.ReactNode;
  options?: { value: string; label: string }[];
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  icon,
  options,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        {type === 'select' && options ? (
          <select
            id={name}
            {...register(name)}
            className={`w-full px-4 py-3 ${
              icon ? 'pl-10' : ''
            } border rounded-lg bg-white text-slate-900 placeholder-slate-400 
            transition-all duration-200 outline-none
            ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className={`w-full px-4 py-3 ${
              icon ? 'pl-10' : ''
            } border rounded-lg bg-white text-slate-900 placeholder-slate-400 
            transition-all duration-200 outline-none
            ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
            }`}
          />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};
