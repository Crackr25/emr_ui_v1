import React from 'react';
import { ChevronDown, ChevronUp, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { License } from './LicenseForm';

interface LicenseListProps {
  licenses: License[];
  expandedIndex: number | null;
  onToggleExpand: (index: number) => void;
  onRemove: (index: number) => void;
}

export const LicenseList: React.FC<LicenseListProps> = ({
  licenses,
  expandedIndex,
  onToggleExpand,
  onRemove,
}) => {
  if (licenses.length === 0) {
    return (
      <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
        <p className="text-xs text-gray-700">
          ℹ️ Please add at least one professional license to continue
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900 text-sm">Added Licenses ({licenses.length})</h3>
      {licenses.map((license, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* License Header - Clickable */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onToggleExpand(index)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {license.license_type} - {license.license_number}
                  </p>
                  {license.image_file && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      <FileText className="w-3 h-3 mr-1" />
                      Image attached
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  {license.issuing_state} | {license.issue_date} to {license.expiry_date}
                </p>
              </div>
              <div className="flex items-center gap-2">
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
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500">License Type</p>
                    <p className="text-sm text-gray-900 mt-0.5">{license.license_type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">License Number</p>
                    <p className="text-sm text-gray-900 mt-0.5">{license.license_number}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Issuing State</p>
                    <p className="text-sm text-gray-900 mt-0.5">{license.issuing_state}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Issue Date</p>
                    <p className="text-sm text-gray-900 mt-0.5">{license.issue_date}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-medium text-gray-500">Expiry Date</p>
                    <p className="text-sm text-gray-900 mt-0.5">{license.expiry_date}</p>
                  </div>
                </div>

                {/* License Image */}
                {license.image_preview && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-2">License Image</p>
                    <div className="relative w-full border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={license.image_preview}
                        alt="License document"
                        className="w-full h-auto object-contain bg-gray-50"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{license.image_file?.name}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
