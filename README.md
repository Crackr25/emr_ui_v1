# Healthcare EMR - Login Screen

A production-ready login screen for a Healthcare Electronic Medical Records (EMR) system built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Split-Screen Layout**: Professional healthcare-themed design with hero section
- **Form Validation**: Strict email and password validation using Zod
- **Type-Safe**: Full TypeScript support with react-hook-form integration
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Loading States**: Smooth loading animation with 2-second simulated API delay
- **Mock Role Selection**: Debug dropdown to simulate Doctor/Nurse/Admin roles
- **Accessibility**: WCAG compliant with proper ARIA labels and focus states
- **HIPAA Compliant UI**: Professional medical color palette and security badges

## 🛠️ Tech Stack

- **React 18** with Vite
- **TypeScript** for type safety
- **Tailwind CSS** for styling (utility-first)
- **react-hook-form** for form management
- **Zod** for schema validation
- **lucide-react** for icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Features

### Color Palette
- **Background**: Slate-50
- **Primary**: Teal-600 to Blue-700 gradient
- **Text**: Slate-900/700/600
- **Error**: Red-500/600

### Components
- **LoginPage.tsx**: Main login screen with split-screen layout
- **InputField.tsx**: Reusable form input component with validation
- **loginSchema.ts**: Zod validation schema

## 🔐 Mock Authentication

The login form includes a debug role selector (toggle with "Debug: Mock Role Selector" button) to simulate different user roles:
- 👨‍⚕️ Doctor
- 👩‍⚕️ Nurse
- 👔 Admin

On successful login, check the browser console for logged data.

## 📝 Form Validation

- **Email**: Must be a valid email format
- **Password**: Minimum 8 characters
- **Real-time validation**: Errors shown on blur/submit

## 🎯 Next Steps

- Integrate with backend API
- Add routing (React Router)
- Implement actual authentication
- Add role-based dashboards
- Add "Remember Me" functionality
- Implement "Forgot Password" flow

## 📄 License

MIT
