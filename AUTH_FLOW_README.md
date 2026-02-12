# Authentication Flow - User Guide

## 🔐 How It Works

The application now has a complete authentication flow:

1. **User visits the app** → Sees Login Page
2. **User enters credentials** → Clicks "Sign In"
3. **2-second loading animation** → Simulates API call
4. **Authentication successful** → Automatically redirected to Patients Page
5. **User clicks Logout** → Returns to Login Page

## 🎯 Login Flow

### Step 1: Login Page
- Enter any valid email (e.g., `doctor@hospital.com`)
- Enter password (minimum 8 characters, e.g., `password123`)
- Optional: Click "Debug: Mock Role Selector" to choose role (Doctor/Nurse/Admin)
- Click **"Sign In"** button

### Step 2: Loading State
- Button shows spinner and "Signing in..." text
- 2-second simulated API delay

### Step 3: Automatic Redirect
- Upon successful login, you're automatically taken to the **Patients Page**
- Your user info appears in the sidebar (name extracted from email)

### Step 4: Logout
- Click the **"Logout"** button at the bottom of the sidebar
- You'll be returned to the Login Page

## 🏗️ Technical Implementation

### Files Created/Modified:

#### 1. **AuthContext.tsx** (`src/context/AuthContext.tsx`)
- React Context for global authentication state
- Provides `login()`, `logout()`, `user`, and `isAuthenticated`
- Persists user data in `localStorage` for page refreshes

#### 2. **LoginPage.tsx** (Updated)
- Now calls `login()` function after successful validation
- Automatically triggers redirect via App.tsx

#### 3. **Sidebar.tsx** (Updated)
- Displays authenticated user's name and email
- Shows "Logout" button at bottom
- Clicking logout clears auth state and returns to login

#### 4. **App.tsx** (Updated)
- Wrapped with `<AuthProvider>`
- Conditional rendering: `isAuthenticated ? <PatientsPage /> : <LoginPage />`

## 📝 Usage Examples

### Login with Different Roles

**Doctor:**
```
Email: doctor@hospital.com
Password: password123
Role: Doctor (from debug dropdown)
```

**Nurse:**
```
Email: nurse.jane@clinic.com
Password: securepass
Role: Nurse
```

**Admin:**
```
Email: admin@healthcare.com
Password: admin1234
Role: Admin
```

### What Happens After Login

1. User object is created:
```typescript
{
  email: "doctor@hospital.com",
  role: "doctor",
  name: "DOCTOR" // Extracted from email
}
```

2. Stored in localStorage (persists across page refreshes)
3. App automatically shows Patients Page
4. Sidebar displays user info

### Logout Process

1. Click "Logout" button in sidebar
2. User state cleared
3. localStorage cleared
4. App automatically shows Login Page

## 🔄 State Persistence

The authentication state persists across page refreshes:

- **Logged In**: Refresh the page → Still logged in, see Patients Page
- **Logged Out**: Refresh the page → Still logged out, see Login Page

This is achieved via `localStorage` in `AuthContext.tsx`.

## 🎨 Visual Feedback

### Login Page:
- Loading spinner during authentication
- Form validation errors (red borders)
- Success → Instant redirect

### Patients Page:
- User info in sidebar (name + email)
- Logout button with hover effect
- All patient data visible

## 🧪 Testing the Flow

1. **Start the app**: `npm run dev`
2. **See Login Page** (not authenticated)
3. **Enter credentials**:
   - Email: `test@example.com`
   - Password: `password123`
4. **Click "Sign In"**
5. **Wait 2 seconds** (loading animation)
6. **See Patients Page** (authenticated)
7. **Check sidebar** - Your email appears as user info
8. **Click "Logout"**
9. **Back to Login Page**

## 🔐 Security Notes

**Current Implementation (Development):**
- ✅ Client-side state management
- ✅ localStorage persistence
- ✅ Form validation (email format, password length)
- ❌ No real backend authentication
- ❌ No password encryption
- ❌ No token-based auth (JWT)

**For Production, Add:**
- Backend API for authentication
- JWT tokens for session management
- Secure HTTP-only cookies
- Password hashing (bcrypt)
- Rate limiting on login attempts
- Multi-factor authentication (MFA)

## 📊 Authentication State Structure

```typescript
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
```

## 🎯 Key Features

✅ **Protected Routes**: Patients page only accessible when logged in
✅ **Automatic Redirects**: Login → Patients, Logout → Login
✅ **State Persistence**: Survives page refreshes
✅ **User Display**: Shows logged-in user info in sidebar
✅ **Clean UX**: Smooth transitions, loading states
✅ **Type-Safe**: Full TypeScript support

## 🚀 Next Steps for Enhancement

1. **Add More Pages**: Dashboard, Schedule, Tasks
2. **Role-Based Access**: Different views for Doctor/Nurse/Admin
3. **Backend Integration**: Real API authentication
4. **Token Management**: JWT with refresh tokens
5. **Protected Route Component**: Reusable auth guard
6. **Remember Me**: Extended session persistence
7. **Password Reset**: Forgot password flow

---

**The authentication flow is now complete and ready to use!** 🎉
