# Add Intake Field Modal - Documentation

## 🎯 Overview

The "Add Intake Field" modal allows users to create new AI intake presets for extracting data from patient medical records. The modal matches the reference image design with a dark theme and comprehensive form fields.

## 🎨 Modal Design

### Layout
- **Dark Modal**: `bg-slate-900` with `border-slate-800`
- **Backdrop**: Black overlay with blur effect (`bg-black/60 backdrop-blur-sm`)
- **Size**: Max width 448px (max-w-md), centered on screen
- **Position**: Fixed overlay with z-index 50

### Form Fields

#### 1. **Field Name** (Required)
- Text input
- Placeholder: "Enter intake field name (e.g., 'Patient Age')"
- Required field for submission

#### 2. **Set** (Optional)
- Dropdown select with options:
  - Select a set (default)
  - General
  - Medical
  - Administrative
  - Custom
- Plus button to add new set (UI ready)

#### 3. **System Prompt** (Optional)
- Textarea (4 rows)
- Placeholder: "Enter instructions for extracting this field..."
- Help text: "Provide instructions for how this field should be extracted from documents."

#### 4. **Example 1** (Optional)
- Textarea (2 rows)
- Placeholder: "Enter example value..."

#### 5. **Example 2** (Optional)
- Textarea (2 rows)
- Placeholder: "Enter another example value..."

#### 6. **Multiline Field** (Checkbox)
- Checkbox to indicate if field supports multiple lines
- Green checkbox with focus ring

### Action Buttons
- **Cancel**: Gray text button, closes modal without saving
- **Create Intake Field**: Green button with Plus icon, submits form

## 🔧 Technical Implementation

### Component: AddIntakeFieldModal.tsx

```typescript
interface AddIntakeFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IntakeFieldFormData) => void;
}

export interface IntakeFieldFormData {
  fieldName: string;
  set: string;
  systemPrompt: string;
  example1: string;
  example2: string;
  multilineField: boolean;
}
```

### Features Implemented

#### State Management
- Local form state with `useState`
- Form data structure matches `IntakeFieldFormData` interface
- Form resets on submit and cancel

#### Validation
- **Field Name** is required (HTML5 validation)
- All other fields are optional
- Form submission prevented if required fields are empty

#### User Interactions
1. **Open Modal**: Click "Add Intake Field" button
2. **Fill Form**: Enter field details
3. **Submit**: Click "Create Intake Field"
4. **Cancel**: Click "Cancel" or backdrop or X button
5. **Auto-close**: Modal closes after successful submission

#### Accessibility
- All inputs have proper labels
- Focus management
- Keyboard navigation support
- ARIA labels on icon buttons
- Proper form semantics

## 🚀 How to Use

### Opening the Modal

1. Navigate to **AI Studio** page
2. Click **"Add Intake Field"** button (green button in header)
3. Modal appears with form

### Creating a New Intake Field

**Example 1: Simple Field**
```
Field Name: Patient Age
Set: General
System Prompt: Extract the patient's age in years
Example 1: 45 years old
Example 2: Age: 62
Multiline field: ☐ (unchecked)
```

**Example 2: Complex Field**
```
Field Name: Medical History Summary
Set: Medical
System Prompt: Summarize the patient's past medical history in bullet points, including chronic conditions, surgeries, and major illnesses.
Example 1: 
• Hypertension (diagnosed 2015)
• Type 2 Diabetes
• Appendectomy (2010)
Example 2:
• COPD
• Previous MI (2018)
• Hip replacement (2020)
Multiline field: ☑ (checked)
```

### Form Submission Flow

1. **Fill required fields** (Field Name minimum)
2. **Click "Create Intake Field"**
3. **New preset is created** with:
   - Auto-generated ID
   - Current date as "Created At"
   - Form data as preset details
4. **Modal closes automatically**
5. **New preset appears in table**
6. **Console logs confirmation**: `✅ New Intake Field Created: {...}`

### Canceling

- Click **"Cancel"** button
- Click **X** icon in header
- Click **backdrop** (outside modal)
- Form data is reset
- Modal closes

## 📊 Data Flow

```
User clicks "Add Intake Field"
        ↓
Modal opens (isModalOpen = true)
        ↓
User fills form
        ↓
User clicks "Create Intake Field"
        ↓
handleAddIntakeField() called
        ↓
New IntakePreset object created
        ↓
Added to intakePresets state
        ↓
Table re-renders with new preset
        ↓
Modal closes (isModalOpen = false)
        ↓
Form resets to empty state
```

## 🎨 Visual Features

### Focus States
- All inputs have green focus ring (`focus:ring-2 focus:ring-green-500`)
- Smooth transitions on all interactive elements

### Hover Effects
- Buttons change color on hover
- Cancel button: `hover:text-white hover:bg-slate-800`
- Submit button: `hover:bg-green-600`
- X button: `hover:text-white`

### Backdrop Behavior
- Clicking backdrop closes modal
- Blur effect for depth (`backdrop-blur-sm`)
- Semi-transparent black overlay (`bg-black/60`)

## 🔄 Integration with AIStudioPage

### State Management
```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
const [intakePresets, setIntakePresets] = useState<IntakePreset[]>(INITIAL_MOCK_PRESETS);
```

### Handler Function
```typescript
const handleAddIntakeField = (formData: IntakeFieldFormData) => {
  const newPreset: IntakePreset = {
    id: String(intakePresets.length + 1),
    name: formData.fieldName,
    set: formData.set || '-',
    systemPrompt: formData.systemPrompt || '',
    example1: formData.example1 || '',
    example2: formData.example2 || '',
    createdAt: new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }),
  };

  setIntakePresets([...intakePresets, newPreset]);
  console.log('✅ New Intake Field Created:', newPreset);
};
```

### Modal Rendering
```typescript
<AddIntakeFieldModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleAddIntakeField}
/>
```

## 🧪 Testing

### Manual Testing Steps

1. **Open Modal**
   - Click "Add Intake Field" button
   - ✅ Modal should appear
   - ✅ Backdrop should blur background

2. **Test Required Field**
   - Leave "Field Name" empty
   - Click "Create Intake Field"
   - ✅ Browser validation should prevent submission

3. **Test Form Submission**
   - Fill "Field Name": "Test Field"
   - Click "Create Intake Field"
   - ✅ Modal should close
   - ✅ New row should appear in table
   - ✅ Console should log new preset

4. **Test Cancel**
   - Open modal
   - Fill some fields
   - Click "Cancel"
   - ✅ Modal should close
   - ✅ No new preset created

5. **Test Backdrop Click**
   - Open modal
   - Click outside modal (on backdrop)
   - ✅ Modal should close

6. **Test X Button**
   - Open modal
   - Click X icon
   - ✅ Modal should close

7. **Test Form Reset**
   - Open modal
   - Fill fields
   - Submit or cancel
   - Open modal again
   - ✅ Form should be empty

## 📝 Example Use Cases

### Use Case 1: Creating Medication Field
```
Field Name: Current Medications
Set: Medical
System Prompt: List all current medications with dosage and frequency
Example 1: Lisinopril 10mg daily, Metformin 500mg twice daily
Example 2: Aspirin 81mg daily
Multiline field: ✓
```

### Use Case 2: Creating Age Field
```
Field Name: Patient Age
Set: General
System Prompt: Extract patient's age in years
Example 1: 45
Example 2: 62
Multiline field: ☐
```

### Use Case 3: Creating Diagnosis Field
```
Field Name: Primary Diagnosis
Set: Medical
System Prompt: Identify and explain the primary diagnosis from the medical record
Example 1: Type 2 Diabetes Mellitus - chronic condition affecting blood sugar regulation
Example 2: Hypertension - elevated blood pressure requiring medication management
Multiline field: ✓
```

## 🎯 Future Enhancements

### Planned Features
1. **Edit Mode**: Open modal with existing preset data for editing
2. **Delete Confirmation**: Modal for deleting presets
3. **Set Management**: Add/edit/delete sets via the Plus button
4. **Field Validation**: Custom validation rules
5. **Templates**: Pre-filled templates for common fields
6. **Import/Export**: Import presets from JSON
7. **Duplicate Detection**: Warn if field name already exists
8. **Rich Text Editor**: For system prompts with formatting
9. **Preview**: Preview how field will appear in forms
10. **Help Tooltips**: Contextual help for each field

### Backend Integration
```typescript
// Future API call
const handleAddIntakeField = async (formData: IntakeFieldFormData) => {
  try {
    const response = await fetch('/api/intake-presets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const newPreset = await response.json();
    setIntakePresets([...intakePresets, newPreset]);
  } catch (error) {
    console.error('Failed to create intake field:', error);
  }
};
```

## 🔒 Validation Rules

### Current Validation
- ✅ Field Name: Required, non-empty string
- ✅ All other fields: Optional

### Future Validation
- Field Name: 3-100 characters, alphanumeric with spaces
- System Prompt: Max 1000 characters
- Examples: Max 500 characters each
- Set: Must be from predefined list or custom

## 🎨 Styling Details

### Colors
- **Modal Background**: `bg-slate-900`
- **Modal Border**: `border-slate-800`
- **Input Background**: `bg-slate-800`
- **Input Border**: `border-slate-700`
- **Focus Ring**: `ring-green-500`
- **Submit Button**: `bg-green-500` → `hover:bg-green-600`

### Spacing
- **Modal Padding**: `px-6 py-4`
- **Form Gap**: `space-y-4`
- **Input Padding**: `px-3 py-2`
- **Button Gap**: `gap-3`

### Typography
- **Title**: `text-lg font-semibold`
- **Labels**: `text-sm font-medium text-slate-300`
- **Help Text**: `text-xs text-slate-500`
- **Placeholders**: `placeholder-slate-500`

---

**The Add Intake Field modal is now fully functional!** 🎉
