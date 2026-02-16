# Onboarding Components

This directory contains reusable components for the onboarding flow. These components follow our standard for building modular, maintainable UI components.

## Component Structure

### Form Components
- **PersonalInfoForm** - Handles first name, last name, and date of birth inputs
- **NPIForm** - Handles NPI number input with validation
- **LicenseForm** - Form for adding professional licenses with image upload
- **TaxonomyForm** - Form for adding specialty taxonomies

### List Components
- **LicenseList** - Expandable list of added licenses with full details
- **TaxonomyList** - Expandable list of added taxonomies with primary indicator

### Layout Components
- **OnboardingHero** - Left side hero section with branding and progress
- **OnboardingProgress** - Progress bar showing current step

## Component Standards

### 1. **Single Responsibility**
Each component should have one clear purpose. Forms handle input, lists handle display.

### 2. **Props Interface**
Always define TypeScript interfaces for props:
```typescript
interface ComponentProps {
  data: DataType;
  onAction: (value: string) => void;
}
```

### 3. **Controlled Components**
All form inputs should be controlled components with state managed by the parent.

### 4. **Event Handlers**
Pass event handlers as props rather than managing state internally:
```typescript
onFieldChange: (field: string, value: string) => void;
```

### 5. **Type Exports**
Export shared types from component files:
```typescript
export { ComponentName, type DataType } from './ComponentName';
```

### 6. **Index File**
Use an index.ts file to export all components for clean imports:
```typescript
export { Component1 } from './Component1';
export { Component2 } from './Component2';
```

## Usage Example

```typescript
import {
  PersonalInfoForm,
  LicenseForm,
  LicenseList,
  type License,
} from '@/components/onboarding';

function MyPage() {
  const [formData, setFormData] = useState({...});
  
  return (
    <PersonalInfoForm
      formData={formData}
      errors={errors}
      onFieldChange={handleFieldChange}
    />
  );
}
```

## File Organization

```
onboarding/
├── PersonalInfoForm.tsx    # Personal info input form
├── NPIForm.tsx             # NPI number input form
├── LicenseForm.tsx         # License form with image upload
├── LicenseList.tsx         # Expandable license list
├── TaxonomyForm.tsx        # Taxonomy input form
├── TaxonomyList.tsx        # Expandable taxonomy list
├── OnboardingHero.tsx      # Hero section component
├── OnboardingProgress.tsx  # Progress bar component
├── index.ts                # Barrel export file
└── README.md               # This file
```

## Benefits

1. **Reusability** - Components can be used in different contexts
2. **Testability** - Each component can be tested in isolation
3. **Maintainability** - Changes are localized to specific components
4. **Readability** - Smaller files are easier to understand
5. **Type Safety** - Shared types ensure consistency

## Best Practices

- Keep components under 200 lines when possible
- Extract complex logic into custom hooks
- Use meaningful prop names
- Document complex props with JSDoc comments
- Handle loading and error states appropriately
- Follow accessibility guidelines (ARIA labels, semantic HTML)
