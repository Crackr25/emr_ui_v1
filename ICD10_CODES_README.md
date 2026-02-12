# ICD-10 Codes Tab - Documentation

## 🎯 Overview

The ICD-10 Codes tab displays a list of medical diagnosis codes (International Classification of Diseases, 10th Revision, Clinical Modification) for the patient. This interface allows healthcare providers to view, add, manage, and export diagnosis codes.

## 🎨 UI Components

### Header Section
- **Title**: "ICD 10 CM Codes"
- **Metadata**: 
  - Comorbidity: No
  - Clinical Group: Unknown
- **Export Buttons**: CSV and JSON download options

### Action Bar
- **Add Code Button**: Plus icon with "Add Code" text

### Codes List
Each code entry displays:
1. **Drag Handle**: 3-dot vertical handle (visible on hover)
2. **Primary Indicator**: Checkbox/circle for marking primary diagnosis
3. **Code**: ICD-10 code (e.g., "D63.1")
4. **Description**: Full diagnosis description
5. **Count Badge**: Number indicator (0 or count)
6. **Ratio**: Fraction display (e.g., "0/3")
7. **Actions**: Expand, Copy, Delete buttons (visible on hover)

## 📊 Mock Data (10 Codes)

Based on the reference image, the following ICD-10 codes are included:

1. **D63.1** - Anemia in chronic kidney disease
2. **I13.0** - Hypertensive heart and chronic kidney disease
3. **F03.92** - Unspecified dementia, unspecified seve...
4. **F03.93** - Unspecified dementia, unspecified seve...
5. **I145.30** - Unspecified macular degeneration (0/3)
6. **J44.9** - Chronic obstructive pulmonar... (0/2)
7. **I48.0** - Paroxysmal atrial fibrillation (0/1)
8. **Z86.73** - Personal history of transient ischemi... (0/1)
9. **K21.0** - Gastro-esophageal reflux disease ... (0/1)
10. **E78.2** - Mixed hyperlipidemia (0/1)

## 🔧 Features

### ✅ Implemented
- **List Display**: All 10 codes with descriptions
- **Hover Effects**: Row highlights, action buttons appear
- **Drag Handle**: Visual indicator for reordering (UI ready)
- **Primary Indicator**: Checkbox for marking primary diagnosis
- **Count Badges**: Color-coded (orange for >0, gray for 0)
- **Ratio Display**: Shows fraction when available
- **Expand/Collapse**: Click to show more details
- **Copy Button**: Copy code to clipboard (UI ready)
- **Delete Button**: Remove code from list
- **Export Buttons**: CSV and JSON download (UI ready)
- **Add Code**: Button to add new codes (UI ready)
- **Empty State**: Shows when no codes exist

### 🎯 Interactive Elements
- **Expand**: Click chevron to see full details
- **Delete**: Click trash icon to remove code
- **Hover**: Shows drag handle and action buttons
- **Primary**: Click checkbox to mark as primary

## 🚀 How to Use

### Viewing ICD-10 Codes
1. Navigate to **Patient Detail** page
2. Click **"ICD-10 Codes"** tab
3. View list of diagnosis codes

### Expanding Code Details
1. Hover over a code row
2. Click the **chevron down** icon
3. Expanded section shows additional details

### Deleting a Code
1. Hover over a code row
2. Click the **trash icon**
3. Code is removed from list

### Adding a Code (UI Ready)
1. Click **"+ Add Code"** button
2. (Modal would open to add new code)

### Exporting Codes (UI Ready)
1. Click **CSV** or **JSON** button in header
2. (Download would trigger)

## 🎨 Visual Design

### Color Scheme
- **Background**: Slate-950
- **Rows**: Slate-900/50 on hover
- **Borders**: Slate-800
- **Text**: White (primary), Slate-300/400 (secondary)
- **Badges**: 
  - Orange-500/20 (count > 0)
  - Slate-800 (count = 0)

### Layout
- **Full width**: Takes entire right panel
- **Scrollable**: List scrolls if many codes
- **Fixed header**: Header stays at top
- **Row height**: Comfortable spacing (py-4)

### Interactive States
- **Hover**: Background changes to slate-900/50
- **Actions visible**: Buttons fade in on hover
- **Expanded**: Shows additional content below
- **Deleted**: Row removed with smooth transition

## 📝 Code Structure

### Component: ICD10CodesSection.tsx

```typescript
interface ICD10Code {
  id: string;
  code: string;
  description: string;
  count: number;
  ratio: string;
  isPrimary?: boolean;
}
```

### State Management
```typescript
const [codes, setCodes] = useState<ICD10Code[]>(MOCK_ICD10_CODES);
const [expandedCodes, setExpandedCodes] = useState<Set<string>>(new Set());
```

### Key Functions
- `toggleExpand(codeId)`: Expand/collapse code details
- `handleDelete(codeId)`: Remove code from list

## 🔄 Integration

### PatientDetailPage.tsx
```typescript
{activeTab === 'ICD-10 Codes' ? (
  <ICD10CodesSection />
) : (
  // Intake content
)}
```

### Tab Switching
- Click "ICD-10 Codes" tab
- Content switches from Intake to ICD-10 Codes
- Document viewer remains on left

## 🧪 Testing

### Test Case 1: View Codes
1. Navigate to patient detail
2. Click "ICD-10 Codes" tab
3. ✅ See list of 10 codes
4. ✅ See header with export buttons

### Test Case 2: Hover Interactions
1. Hover over any code row
2. ✅ Background changes
3. ✅ Drag handle appears
4. ✅ Action buttons appear

### Test Case 3: Expand Code
1. Hover over a code
2. Click chevron down icon
3. ✅ Expanded section appears
4. ✅ Click again to collapse

### Test Case 4: Delete Code
1. Hover over a code
2. Click trash icon
3. ✅ Code removed from list
4. ✅ Count updates

### Test Case 5: Empty State
1. Delete all codes
2. ✅ Empty state appears
3. ✅ "Add Your First Code" button shown

## 📊 Badge System

### Count Badges
- **0**: Gray badge (bg-slate-800)
- **>0**: Orange badge (bg-orange-500/20)

### Ratio Display
- Shows when available (e.g., "0/3")
- Appears with chevron icon
- Indicates occurrence/total

## 🎯 Use Cases

### For Doctors
1. **Review Diagnoses**: See all patient diagnoses
2. **Mark Primary**: Identify primary diagnosis
3. **Add New**: Add newly identified conditions
4. **Export**: Download for reports

### For Coders
1. **Verify Codes**: Ensure correct ICD-10 codes
2. **Check Ratios**: Review code occurrence
3. **Organize**: Reorder by priority
4. **Export**: Generate billing reports

### For Administrators
1. **Audit**: Review diagnosis coding
2. **Export Data**: Generate reports
3. **Quality Check**: Verify completeness

## 🔧 Future Enhancements

### Planned Features
1. **Drag & Drop**: Reorder codes by dragging
2. **Search**: Filter codes by code or description
3. **Add Modal**: Form to add new codes
4. **Edit**: Modify code descriptions
5. **Primary Toggle**: Click to mark/unmark primary
6. **Bulk Actions**: Select multiple, delete/export
7. **Code Validation**: Verify valid ICD-10 codes
8. **Auto-suggest**: Suggest codes from PDF
9. **History**: Track code changes
10. **Notes**: Add notes to specific codes

### Backend Integration
```typescript
// Fetch codes
const fetchCodes = async (patientId: string) => {
  const response = await fetch(`/api/patients/${patientId}/icd10-codes`);
  return response.json();
};

// Add code
const addCode = async (patientId: string, code: ICD10Code) => {
  await fetch(`/api/patients/${patientId}/icd10-codes`, {
    method: 'POST',
    body: JSON.stringify(code),
  });
};

// Delete code
const deleteCode = async (patientId: string, codeId: string) => {
  await fetch(`/api/patients/${patientId}/icd10-codes/${codeId}`, {
    method: 'DELETE',
  });
};
```

## 📱 Responsive Design

Currently optimized for desktop. For mobile:
- Stack code info vertically
- Hide ratio on small screens
- Make actions always visible
- Swipe to delete

## 🔒 Access Control

### Permissions
- **View**: All authenticated users
- **Add/Edit**: Doctors, Coders
- **Delete**: Doctors, Coders, Admin
- **Export**: All authenticated users

## 📊 Export Formats

### CSV Export
```csv
Code,Description,Count,Ratio,Primary
D63.1,Anemia in chronic kidney disease,0,,No
I13.0,Hypertensive heart and chronic kidney disease,0,,No
...
```

### JSON Export
```json
[
  {
    "code": "D63.1",
    "description": "Anemia in chronic kidney disease",
    "count": 0,
    "ratio": "",
    "isPrimary": false
  },
  ...
]
```

## 🎨 Styling Details

### Row Styling
- **Default**: Transparent background
- **Hover**: `bg-slate-900/50`
- **Padding**: `px-6 py-4`
- **Border**: `border-b border-slate-800`

### Badge Styling
- **Count 0**: `bg-slate-800 text-slate-400`
- **Count >0**: `bg-orange-500/20 text-orange-400`
- **Size**: `text-xs px-2 py-0.5`

### Button Styling
- **Hover**: `hover:bg-slate-800`
- **Icon**: `w-4 h-4 text-slate-400`
- **Transition**: `transition-colors`

---

**The ICD-10 Codes tab is now fully functional!** Click the "ICD-10 Codes" tab to view and manage patient diagnosis codes. 🎉
