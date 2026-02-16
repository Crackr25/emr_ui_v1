import React from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Taxonomy } from './TaxonomyForm';

interface TaxonomyListProps {
  taxonomies: Taxonomy[];
  expandedIndex: number | null;
  onToggleExpand: (index: number) => void;
  onTogglePrimary: (index: number) => void;
  onRemove: (index: number) => void;
}

export const TaxonomyList: React.FC<TaxonomyListProps> = ({
  taxonomies,
  expandedIndex,
  onToggleExpand,
  onTogglePrimary,
  onRemove,
}) => {
  if (taxonomies.length === 0) {
    return (
      <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
        <p className="text-xs text-gray-700">
          ℹ️ Please add at least one taxonomy with one marked as primary
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900 text-sm">Added Taxonomies ({taxonomies.length})</h3>
      {taxonomies.map((taxonomy, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Taxonomy Header - Clickable */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onToggleExpand(index)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{taxonomy.taxonomy_code}</p>
                  {taxonomy.is_primary && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-black text-white rounded">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{taxonomy.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {!taxonomy.is_primary && (
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePrimary(index);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-black hover:bg-gray-100"
                  >
                    Set Primary
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="px-3 pb-3 pt-0 border-t border-gray-200 bg-white">
                <div className="space-y-3 mt-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500">NUCC Taxonomy Code</p>
                    <p className="text-sm text-gray-900 mt-0.5 font-mono">{taxonomy.taxonomy_code}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Description</p>
                    <p className="text-sm text-gray-900 mt-0.5">{taxonomy.description}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Primary Specialty</p>
                    <p className="text-sm text-gray-900 mt-0.5">
                      {taxonomy.is_primary ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-black text-white">
                          Yes - This is your primary specialty
                        </span>
                      ) : (
                        <span className="text-gray-600">No</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
