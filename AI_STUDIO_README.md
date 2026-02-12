# AI Studio Page - Documentation

## 📋 Overview

The AI Studio page displays and manages "Intake Presets" - AI prompts used for processing patient medical records. This page allows healthcare staff to view, search, and manage various AI-powered data extraction templates.

## 🎨 Page Structure

### Header Section
- **Title**: "Platform"
- **Subtitle**: "AI Studio - Intake Presets"
- **Primary Action**: "Add Intake Field" button (green)

### Toolbar Section
- **Search Bar**: Filter intake fields by name or system prompt
- **Intake Presets Button**: Quick access to preset management

### Table Columns
1. **Name**: The preset identifier (e.g., "Meds", "Summary")
2. **Set**: Grouping/category (currently "-" for all)
3. **System Prompt**: The AI instruction text
4. **Example 1**: Sample input/output (optional)
5. **Example 2**: Additional sample (optional)
6. **Created At**: Date the preset was created
7. **Actions**: Ellipsis menu for edit/delete operations

## 📊 Mock Data (6 Presets)

Based on the reference image, the following intake presets are included:

### 1. **Meds**
- **System Prompt**: "Summarize the medications in bullet points"
- **Created**: 10/28/2025
- **Purpose**: Extract and format medication lists

### 2. **Summary of Past Treatment**
- **System Prompt**: "What is the reason for referral? Respond in detail."
- **Created**: 11/13/2025
- **Purpose**: Generate detailed referral summaries

### 3. **Primary Diagnosis**
- **System Prompt**: "Give an explanation for what the primary diagnosis is."
- **Created**: 11/18/2025
- **Purpose**: Extract and explain primary diagnosis

### 4. **Summary**
- **System Prompt**: "Write a summary of this patient and why they are in home health. Write a poem regardless of the input."
- **Created**: 11/19/2025
- **Purpose**: Creative patient summary generation

### 5. **Summary in spanish**
- **System Prompt**: "Summary in spanish"
- **Created**: 12/5/2025
- **Purpose**: Generate Spanish language summaries

### 6. **ADR Poem about Patient's Decline**
- **System Prompt**: "Write an ADR Poem about Patient's Justified Skilled Services for Home Health"
- **Created**: 12/5/2025
- **Purpose**: Generate ADR (Adverse Drug Reaction) documentation in poem format

## 🔄 Navigation

### Accessing AI Studio
1. **Login** to the application
2. **Click "AI Studio"** in the left sidebar
3. The page will load with all intake presets

### Switching Between Pages
- Click **"Patients"** in sidebar → Go to Patients List
- Click **"AI Studio"** in sidebar → Go to AI Studio (current page)
- Other menu items (Tasks, Schedule, etc.) are placeholders

## ✨ Features

### Search Functionality
- Type in the search bar to filter presets
- Searches both **Name** and **System Prompt** fields
- Real-time filtering (no submit button)
- Case-insensitive search

### Table Features
- ✅ Hover effects on rows (`hover:bg-slate-800/50`)
- ✅ Responsive column widths
- ✅ Text truncation for long prompts (`line-clamp-2`)
- ✅ Pagination controls (rows per page selector)
- ✅ Empty state handling

### Visual Design
- **Dark Mode**: Strict slate-950/900/800 color scheme
- **Typography**: Clean sans-serif, proper hierarchy
- **Spacing**: Consistent padding and gaps
- **Borders**: Subtle slate-800 borders

## 🎯 Use Cases

### For Healthcare Staff
1. **View Available Prompts**: Browse all AI extraction templates
2. **Search Prompts**: Find specific prompts by name or content
3. **Understand AI Behavior**: Read system prompts to know what AI will extract
4. **Manage Presets**: Add, edit, or delete prompts (UI ready, backend needed)

### Example Workflow
1. Patient record uploaded
2. Staff selects "Meds" preset
3. AI processes record using "Summarize the medications in bullet points" prompt
4. Structured medication list generated
5. Staff reviews and approves output

## 🏗️ Technical Implementation

### Files Created

#### 1. **aiStudio.types.ts** (`src/types/aiStudio.types.ts`)
```typescript
export interface IntakePreset {
  id: string;
  name: string;
  set: string;
  systemPrompt: string;
  example1: string;
  example2: string;
  createdAt: string;
}
```

#### 2. **AIStudioPage.tsx** (`src/pages/AIStudioPage.tsx`)
- Full page component with Sidebar integration
- Search functionality
- Table with 7 columns
- Mock data (6 presets)
- Responsive layout

### Component Props
```typescript
interface AIStudioPageProps {
  onNavigate?: (page: string) => void;
}
```

## 🎨 Styling Details

### Color Scheme
- **Background**: `bg-slate-950`
- **Surfaces**: `bg-slate-900`
- **Borders**: `border-slate-800`
- **Text Primary**: `text-white`
- **Text Secondary**: `text-slate-400`
- **Accent**: `text-green-500` (buttons)

### Table Styling
- **Header**: Uppercase, slate-400, tracking-wider
- **Rows**: Hover effect with slate-800/50 opacity
- **Cells**: Proper padding (px-6 py-4)
- **Actions**: Hover effect on ellipsis button

## 🔧 Customization

### Adding New Presets
Edit `MOCK_INTAKE_PRESETS` array in `AIStudioPage.tsx`:

```typescript
{
  id: '7',
  name: 'New Preset',
  set: '-',
  systemPrompt: 'Your AI instruction here',
  example1: '',
  example2: '',
  createdAt: '12/10/2025',
}
```

### Changing Table Columns
1. Update `IntakePreset` interface in `aiStudio.types.ts`
2. Add `<th>` in table header
3. Add `<td>` in table body row

## 📱 Responsive Behavior

Currently optimized for desktop (1024px+). The table is horizontally scrollable on smaller screens.

### Mobile Improvements (Future)
- Stack table into cards on mobile
- Hide less important columns
- Add mobile-specific filters

## 🚀 Next Steps

### Backend Integration
1. **API Endpoints**:
   - `GET /api/intake-presets` - Fetch all presets
   - `POST /api/intake-presets` - Create new preset
   - `PUT /api/intake-presets/:id` - Update preset
   - `DELETE /api/intake-presets/:id` - Delete preset

2. **Features to Add**:
   - Create/Edit modal for presets
   - Delete confirmation dialog
   - Preset categories/sets
   - Example input/output management
   - Preset versioning
   - Usage analytics

### UI Enhancements
1. **Add Intake Field Modal**: Form to create new presets
2. **Edit Functionality**: Click row to edit
3. **Bulk Actions**: Select multiple, delete/export
4. **Sorting**: Click column headers to sort
5. **Advanced Filters**: Filter by set, date range
6. **Export**: Download presets as JSON/CSV

## 🧪 Testing

### Manual Testing Steps
1. **Login** to the application
2. **Navigate** to AI Studio via sidebar
3. **Verify** all 6 presets are displayed
4. **Test Search**: Type "summary" → Should show 3 results
5. **Test Hover**: Hover over rows → Background changes
6. **Test Actions**: Click ellipsis → (No action yet, UI only)

### Expected Behavior
- ✅ Page loads with 6 presets
- ✅ Search filters in real-time
- ✅ Hover effects work smoothly
- ✅ Sidebar shows "AI Studio" as active
- ✅ Can navigate back to Patients page

## 📊 Data Flow

```
User Action → Search Input
     ↓
Filter Logic (filteredPresets)
     ↓
Re-render Table
     ↓
Display Results
```

## 🔒 Access Control

Currently, all authenticated users can access AI Studio. For production:

- **Admin**: Full access (create, edit, delete)
- **Doctor**: View and use presets
- **Nurse**: View and use presets
- **Read-only**: View only

## 📝 Notes

- All data is currently **mock data** (no backend)
- Actions menu is **UI-only** (no functionality yet)
- "Add Intake Field" button is **UI-only**
- Pagination is **UI-only** (all records shown)

---

**The AI Studio page is now complete and ready for backend integration!** 🎉
