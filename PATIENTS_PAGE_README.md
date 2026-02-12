# Patients List Page - Documentation

## 📋 Overview

A production-ready, dark-themed Patients List page for Healthcare EMR system with advanced filtering, status tracking, and clean component architecture.

## 🎨 Design System

### Color Palette (Dark Mode)
- **Background**: `bg-slate-950` (Main background)
- **Surfaces**: `bg-slate-900` (Cards, sidebar, header)
- **Borders**: `border-slate-800` (Subtle dividers)
- **Text Primary**: `text-white`
- **Text Secondary**: `text-slate-400`
- **Accent Green**: `text-green-500` (Processed states)
- **Warning Yellow**: `text-yellow-500` (Pending states)
- **Error Red**: `text-red-400/500` (Hold states)

### Typography
- **Font Family**: Inter/Sans-serif
- **Headers**: `text-2xl font-semibold`
- **Body**: `text-sm`
- **Labels**: `text-xs uppercase tracking-wider`

## 🏗️ Component Architecture

### 1. **patient.types.ts** (`src/types/patient.types.ts`)

Type definitions for the entire patient management system.

```typescript
export type FileStatus = 'processed' | 'pending' | 'hold' | 'no_files';
export type StageStatus = 'processed' | 'pending' | 'hold';

export interface Patient {
  id: string;
  name: string;
  mrn: string;
  filesStatus: FileStatus;
  filesCount?: number;
  stage: StageStatus;
  organization: string;
  tasks: number;
  createdAt: string;
}
```

### 2. **StatusBadge.tsx** (`src/components/StatusBadge.tsx`)

Reusable status indicator component with two modes:

#### Files Mode (`type="files"`)
- **Processed**: ✅ Green with CheckCircle icon + file count
- **Pending**: 🟡 Yellow with dot + file count
- **Hold**: 🔴 Red with dot + file count
- **No Files**: 📄 Gray with FileText icon

#### Stage Mode (`type="stage"`)
- **Processed**: Green pill badge with CheckCircle
- **Pending**: Yellow pill badge with Clock icon
- **Hold**: Red pill badge with dot

**Props:**
```typescript
interface StatusBadgeProps {
  status: FileStatus | StageStatus;
  filesCount?: number;
  type?: 'files' | 'stage';
}
```

### 3. **Sidebar.tsx** (`src/components/Sidebar.tsx`)

Fixed sidebar navigation with:
- **Width**: 256px (w-64)
- **Menu Items**: Tasks, Patients (Active), Schedule, AI Studio, Insurance, Dashboard, Organizations
- **Active State**: `bg-slate-800` with white text
- **Hover State**: `hover:bg-slate-800/50`
- **User Profile**: Bottom section with avatar and name (Luke Heine)

**Features:**
- Click-to-activate navigation items
- Lucide icons for all menu items
- Brand logo at top
- User profile at bottom

### 4. **PatientsPage.tsx** (`src/pages/PatientsPage.tsx`)

Main page component with full layout.

#### Layout Structure:
```
┌─────────────┬──────────────────────────────────┐
│             │  Header (Title + Actions)        │
│   Sidebar   ├──────────────────────────────────┤
│   (Fixed)   │  Toolbar (Search + Filter)       │
│             ├──────────────────────────────────┤
│             │  Table (Patients Data)           │
│             │                                  │
└─────────────┴──────────────────────────────────┘
```

#### Header Section:
- **Title**: "Platform / Patients"
- **Subtitle**: "Manage and track patient records"
- **Actions**:
  - Import button (Upload icon)
  - Add Patient button (Green, primary)

#### Toolbar Section:
- **Search Bar**: Full-width with Search icon, placeholder "Filter by name or MRN..."
- **Filter Button**: Dropdown trigger with Filter icon

#### Table Columns:
1. **Checkbox**: Select all / Select individual
2. **Patient Name**: Avatar + Name
3. **MRN**: Medical Record Number
4. **Files**: Status badge with file count
5. **Stage**: Status badge (pill style)
6. **Organization**: Text
7. **Tasks**: Badge with count
8. **Created At**: Formatted date
9. **Actions**: Ellipsis menu button

#### Features:
- ✅ Real-time search filtering (name or MRN)
- ✅ Multi-select with checkboxes
- ✅ Hover effects on rows (`hover:bg-slate-800/50`)
- ✅ Empty state handling
- ✅ Selection counter in footer
- ✅ Accessibility labels (ARIA)

## 📊 Mock Data

6 realistic patient records with varied statuses:

| Name | MRN | Files | Stage | Organization | Tasks |
|------|-----|-------|-------|--------------|-------|
| LIME, HEALTH | MRN-2024-001 | Processed (12) | Processed | General Hospital | 3 |
| Jane Doe | MRN-2024-002 | Pending (5) | Pending | City Medical Center | 7 |
| David Smith | MRN-2024-003 | Hold (3) | Hold | Regional Clinic | 2 |
| Sarah Johnson | MRN-2024-004 | No Files | Pending | Metro Health | 1 |
| Michael Brown | MRN-2024-005 | Processed (8) | Processed | University Hospital | 5 |
| Emily Davis | MRN-2024-006 | Pending (2) | Pending | Community Care | 4 |

## 🚀 Running the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Navigate to `http://localhost:5173` to view the Patients page.

## 🎯 Interactive Features

### Search Functionality
- Type in the search bar to filter by patient name or MRN
- Real-time filtering (no submit button needed)
- Case-insensitive search

### Selection System
- Click checkbox in header to select/deselect all patients
- Click individual checkboxes to select specific patients
- Footer shows count of selected patients

### Hover Effects
- Table rows: `hover:bg-slate-800/50`
- Buttons: Color transitions on hover
- Sidebar items: Background highlight on hover

## 🔧 Customization Guide

### Changing Colors
Edit the Tailwind classes in components:

```typescript
// Primary accent (currently green)
className="bg-green-500 hover:bg-green-600"

// Change to blue:
className="bg-blue-500 hover:bg-blue-600"
```

### Adding New Status Types
1. Update `patient.types.ts`:
```typescript
export type FileStatus = 'processed' | 'pending' | 'hold' | 'no_files' | 'archived';
```

2. Add case in `StatusBadge.tsx`:
```typescript
if (status === 'archived') {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      <Archive className="w-4 h-4" />
      <span className="text-sm">Archived</span>
    </div>
  );
}
```

### Adding New Table Columns
1. Add field to `Patient` interface in `patient.types.ts`
2. Add `<th>` in table header
3. Add `<td>` in table body row

## 📱 Responsive Behavior

Currently optimized for desktop (1024px+). For mobile responsiveness:

1. Hide sidebar on mobile (add `hidden lg:flex` to Sidebar)
2. Add hamburger menu for mobile navigation
3. Make table horizontally scrollable
4. Stack header actions vertically on small screens

## 🔒 Accessibility Features

- ✅ ARIA labels on all checkboxes
- ✅ ARIA labels on action buttons
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements
- ✅ Semantic HTML structure

## 🎨 Visual Hierarchy

1. **Primary Actions**: Green buttons (Add Patient)
2. **Secondary Actions**: Gray buttons (Import, Filter)
3. **Status Indicators**: Color-coded badges
4. **Interactive Elements**: Hover states and transitions
5. **Content Structure**: Clear spacing and borders

## 🔄 Switching Between Pages

To switch between LoginPage and PatientsPage, edit `src/App.tsx`:

```typescript
// Show Patients Page (current)
import { PatientsPage } from './pages/PatientsPage';
function App() {
  return <PatientsPage />;
}

// Show Login Page
import { LoginPage } from './pages/LoginPage';
function App() {
  return <LoginPage />;
}
```

## 📝 Next Steps

1. **Add Routing**: Implement React Router for navigation
2. **API Integration**: Connect to backend for real data
3. **Pagination**: Add pagination for large datasets
4. **Advanced Filters**: Implement filter dropdown with status/org filters
5. **Actions Menu**: Build dropdown menu for row actions
6. **Export**: Add CSV/PDF export functionality
7. **Bulk Actions**: Enable bulk operations on selected patients

## 🐛 Known Limitations

- No actual routing (single page app)
- Mock data only (no backend integration)
- Filter button is UI-only (no dropdown yet)
- Actions menu is UI-only (no dropdown yet)
- No pagination (shows all records)

---

**Built with**: React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons
