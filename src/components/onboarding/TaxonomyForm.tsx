import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface Taxonomy {
  taxonomy_code: string;
  description: string;
  is_primary: boolean;
}

interface TaxonomyFormProps {
  currentTaxonomy: Taxonomy;
  errors: Partial<Taxonomy>;
  onFieldChange: (field: keyof Taxonomy, value: string | boolean) => void;
  onAddTaxonomy: () => void;
}

export const TaxonomyForm: React.FC<TaxonomyFormProps> = ({
  currentTaxonomy,
  errors,
  onFieldChange,
  onAddTaxonomy,
}) => {
  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <h3 className="font-medium text-gray-900">Add Taxonomy</h3>

      <div className="space-y-3">
        <div>
          <Label htmlFor="taxonomy_code" className="text-sm font-medium text-gray-700">
            NUCC Taxonomy Code
          </Label>
          <Input
            id="taxonomy_code"
            type="text"
            maxLength={10}
            value={currentTaxonomy.taxonomy_code}
            onChange={(e) => onFieldChange('taxonomy_code', e.target.value)}
            placeholder="207Q00000X"
            className={`mt-1.5 ${errors.taxonomy_code ? 'border-red-500' : ''}`}
          />
          {errors.taxonomy_code && (
            <p className="mt-1 text-xs text-red-600">{errors.taxonomy_code}</p>
          )}
          <p className="mt-1 text-xs text-zinc-500">10-character NUCC taxonomy code</p>
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Input
            id="description"
            type="text"
            value={currentTaxonomy.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="e.g., Internal Medicine"
            className={`mt-1.5 ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_primary"
            checked={currentTaxonomy.is_primary}
            onChange={(e) => onFieldChange('is_primary', e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <Label htmlFor="is_primary" className="text-sm font-medium text-gray-700 cursor-pointer">
            Set as primary specialty
          </Label>
        </div>
      </div>

      <Button
        type="button"
        onClick={onAddTaxonomy}
        variant="outline"
        className="w-full"
        size="sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Taxonomy
      </Button>
    </div>
  );
};
