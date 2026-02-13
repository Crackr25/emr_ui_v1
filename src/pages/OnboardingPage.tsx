import React, { useState } from 'react';
import { Activity, ArrowRight, ArrowLeft, User, Calendar, Badge, FileText, Plus, Trash2, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface License {
  license_type: string;
  license_number: string;
  issuing_state: string;
  issue_date: string;
  expiry_date: string;
}

interface Taxonomy {
  taxonomy_code: string;
  description: string;
  is_primary: boolean;
}

interface OnboardingData {
  firstname: string;
  lastname: string;
  date_of_birth: string;
  npi_number: string;
}

interface OnboardingPageProps {
  email: string;
  role: 'doctor' | 'nurse' | 'admin';
  onComplete?: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ email, role, onComplete }) => {
  const { login } = useAuth();
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    firstname: '',
    lastname: '',
    date_of_birth: '',
    npi_number: '',
  });
  const [errors, setErrors] = useState<Partial<OnboardingData>>({});
  const [licenses, setLicenses] = useState<License[]>([]);
  const [currentLicense, setCurrentLicense] = useState<License>({
    license_type: '',
    license_number: '',
    issuing_state: '',
    issue_date: '',
    expiry_date: '',
  });
  const [licenseErrors, setLicenseErrors] = useState<Partial<License>>({});
  const [taxonomies, setTaxonomies] = useState<Taxonomy[]>([]);
  const [currentTaxonomy, setCurrentTaxonomy] = useState<Taxonomy>({
    taxonomy_code: '',
    description: '',
    is_primary: false,
  });
  const [taxonomyErrors, setTaxonomyErrors] = useState<Partial<Taxonomy>>({});

  const totalStages = 5;

  const validateStage = (stage: number): boolean => {
    const newErrors: Partial<OnboardingData> = {};

    if (stage === 1) {
      if (!formData.firstname.trim()) {
        newErrors.firstname = 'First name is required';
      }
      if (!formData.lastname.trim()) {
        newErrors.lastname = 'Last name is required';
      }
    }

    if (stage === 2) {
      if (!formData.date_of_birth) {
        newErrors.date_of_birth = 'Date of birth is required';
      } else {
        const birthDate = new Date(formData.date_of_birth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          newErrors.date_of_birth = 'You must be at least 18 years old';
        }
      }
    }

    if (stage === 3) {
      if (!formData.npi_number.trim()) {
        newErrors.npi_number = 'NPI number is required';
      } else if (!/^\d{10}$/.test(formData.npi_number)) {
        newErrors.npi_number = 'NPI must be exactly 10 digits';
      }
    }

    // Stage 4 validation handled separately (at least one license)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStage === 4) {
      // Stage 4: Require at least one license
      if (licenses.length === 0) {
        alert('Please add at least one license before continuing');
        return;
      }
      setCurrentStage(currentStage + 1);
    } else if (currentStage === 5) {
      // Stage 5: Require at least one taxonomy with one primary
      if (taxonomies.length === 0) {
        alert('Please add at least one taxonomy before continuing');
        return;
      }
      const hasPrimary = taxonomies.some(t => t.is_primary);
      if (!hasPrimary) {
        alert('Please mark one taxonomy as primary');
        return;
      }
      handleComplete();
    } else if (validateStage(currentStage)) {
      if (currentStage < totalStages) {
        setCurrentStage(currentStage + 1);
      } else {
        handleComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
      setErrors({});
    }
  };

  const handleComplete = () => {
    console.log('✅ Onboarding completed:', {
      email,
      role,
      firstname: formData.firstname,
      lastname: formData.lastname,
      date_of_birth: formData.date_of_birth,
      npi_number: formData.npi_number,
      licenses: licenses,
      taxonomies: taxonomies,
      mfa_enabled: true, // Default to true for security
    });

    // Auto-login after onboarding
    setTimeout(() => {
      login(email, role);
      onComplete?.();
    }, 1000);
  };

  const updateField = (field: keyof OnboardingData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const updateLicenseField = (field: keyof License, value: string) => {
    setCurrentLicense({ ...currentLicense, [field]: value });
    if (licenseErrors[field]) {
      setLicenseErrors({ ...licenseErrors, [field]: undefined });
    }
  };

  const validateLicense = (): boolean => {
    const errors: Partial<License> = {};
    if (!currentLicense.license_type.trim()) errors.license_type = 'License type is required';
    if (!currentLicense.license_number.trim()) errors.license_number = 'License number is required';
    if (!currentLicense.issuing_state.trim()) errors.issuing_state = 'Issuing state is required';
    if (!currentLicense.issue_date) errors.issue_date = 'Issue date is required';
    if (!currentLicense.expiry_date) errors.expiry_date = 'Expiry date is required';
    
    setLicenseErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addLicense = () => {
    if (validateLicense()) {
      setLicenses([...licenses, currentLicense]);
      setCurrentLicense({
        license_type: '',
        license_number: '',
        issuing_state: '',
        issue_date: '',
        expiry_date: '',
      });
      setLicenseErrors({});
    }
  };

  const removeLicense = (index: number) => {
    setLicenses(licenses.filter((_, i) => i !== index));
  };

  const updateTaxonomyField = (field: keyof Taxonomy, value: string | boolean) => {
    setCurrentTaxonomy({ ...currentTaxonomy, [field]: value });
    if (taxonomyErrors[field]) {
      setTaxonomyErrors({ ...taxonomyErrors, [field]: undefined });
    }
  };

  const validateTaxonomy = (): boolean => {
    const errors: Partial<Taxonomy> = {};
    if (!currentTaxonomy.taxonomy_code.trim()) errors.taxonomy_code = 'Taxonomy code is required';
    if (currentTaxonomy.taxonomy_code.length !== 10) errors.taxonomy_code = 'Must be exactly 10 characters';
    if (!currentTaxonomy.description.trim()) errors.description = 'Description is required';
    
    setTaxonomyErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addTaxonomy = () => {
    if (validateTaxonomy()) {
      // If this is marked as primary, unmark all others
      let updatedTaxonomies = taxonomies;
      if (currentTaxonomy.is_primary) {
        updatedTaxonomies = taxonomies.map(t => ({ ...t, is_primary: false }));
      }
      setTaxonomies([...updatedTaxonomies, currentTaxonomy]);
      setCurrentTaxonomy({
        taxonomy_code: '',
        description: '',
        is_primary: false,
      });
      setTaxonomyErrors({});
    }
  };

  const removeTaxonomy = (index: number) => {
    setTaxonomies(taxonomies.filter((_, i) => i !== index));
  };

  const togglePrimary = (index: number) => {
    setTaxonomies(taxonomies.map((t, i) => ({
      ...t,
      is_primary: i === index,
    })));
  };

  const getStageIcon = (stage: number) => {
    switch (stage) {
      case 1:
        return <User className="w-6 h-6" />;
      case 2:
        return <Calendar className="w-6 h-6" />;
      case 3:
        return <Badge className="w-6 h-6" />;
      case 4:
        return <FileText className="w-6 h-6" />;
      case 5:
        return <Stethoscope className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getStageTitle = (stage: number) => {
    switch (stage) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Date of Birth';
      case 3:
        return 'Professional Identity';
      case 4:
        return 'Professional Licenses';
      case 5:
        return 'Specialty Taxonomy';
      default:
        return '';
    }
  };

  const getStageDescription = (stage: number) => {
    switch (stage) {
      case 1:
        return 'Let\'s start with your name';
      case 2:
        return 'We need this for identity verification';
      case 3:
        return 'Enter your National Provider Identifier';
      case 4:
        return 'Add your professional licenses';
      case 5:
        return 'Add your specialty taxonomies';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Activity className="w-7 h-7 text-black" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-bold">OneUp</h1>
            </div>
          </div>

          <div className="w-full max-w-md aspect-square bg-zinc-900 rounded-2xl shadow-2xl p-4">
            <div className="w-full h-full bg-zinc-800 rounded-xl flex items-center justify-center">
              <div className="text-center">
                {getStageIcon(currentStage)}
                <p className="text-lg font-medium text-white mt-4">Step {currentStage} of {totalStages}</p>
                <p className="text-sm text-zinc-400 mt-2">{getStageTitle(currentStage)}</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-zinc-400 max-w-md">
            Complete your profile to get started
          </p>
        </div>
      </div>

      {/* Right Side - Onboarding Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold text-black">OneUp</h1>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStage} of {totalStages}</span>
              <span className="text-sm text-gray-500">{Math.round((currentStage / totalStages) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStage / totalStages) * 100}%` }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">{getStageTitle(currentStage)}</h2>
            <p className="text-zinc-600">{getStageDescription(currentStage)}</p>
            <p className="text-sm text-zinc-500 mt-2">Account: {email}</p>
          </div>

          {/* Stage 1: Name */}
          {currentStage === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstname" className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  id="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => updateField('firstname', e.target.value)}
                  placeholder="John"
                  className={`mt-1.5 ${errors.firstname ? 'border-red-500' : ''}`}
                />
                {errors.firstname && (
                  <p className="mt-1 text-xs text-red-600">{errors.firstname}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastname" className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => updateField('lastname', e.target.value)}
                  placeholder="Doe"
                  className={`mt-1.5 ${errors.lastname ? 'border-red-500' : ''}`}
                />
                {errors.lastname && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastname}</p>
                )}
              </div>
            </div>
          )}

          {/* Stage 2: Date of Birth */}
          {currentStage === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="date_of_birth" className="text-sm font-medium text-gray-700">
                  Date of Birth
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => updateField('date_of_birth', e.target.value)}
                  className={`mt-1.5 ${errors.date_of_birth ? 'border-red-500' : ''}`}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.date_of_birth && (
                  <p className="mt-1 text-xs text-red-600">{errors.date_of_birth}</p>
                )}
                <p className="mt-1 text-xs text-zinc-500">
                  Used for background checks & identity verification
                </p>
              </div>
            </div>
          )}

          {/* Stage 3: NPI Number */}
          {currentStage === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="npi_number" className="text-sm font-medium text-gray-700">
                  NPI Number
                </Label>
                <Input
                  id="npi_number"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.npi_number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                    updateField('npi_number', value);
                  }}
                  placeholder="1234567890"
                  className={`mt-1.5 ${errors.npi_number ? 'border-red-500' : ''}`}
                />
                {errors.npi_number && (
                  <p className="mt-1 text-xs text-red-600">{errors.npi_number}</p>
                )}
                <p className="mt-1 text-xs text-zinc-500">
                  National Provider Identifier - Must be exactly 10 digits
                </p>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                <p className="text-xs text-gray-700">
                  ℹ️ Your NPI number is used to verify your professional credentials
                </p>
              </div>
            </div>
          )}

          {/* Stage 4: Licenses */}
          {currentStage === 4 && (
            <div className="space-y-6">
              {/* License Form */}
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Add License</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="license_type" className="text-sm font-medium text-gray-700">
                      License Type
                    </Label>
                    <select
                      id="license_type"
                      value={currentLicense.license_type}
                      onChange={(e) => updateLicenseField('license_type', e.target.value)}
                      className={`mt-1.5 w-full px-3 py-2 border rounded-md text-sm ${
                        licenseErrors.license_type ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Type</option>
                      <option value="STATE">State License</option>
                      <option value="DEA">DEA</option>
                      <option value="CDS">CDS</option>
                      <option value="BOARD_CERT">Board Certification</option>
                    </select>
                    {licenseErrors.license_type && (
                      <p className="mt-1 text-xs text-red-600">{licenseErrors.license_type}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="license_number" className="text-sm font-medium text-gray-700">
                      License Number
                    </Label>
                    <Input
                      id="license_number"
                      type="text"
                      value={currentLicense.license_number}
                      onChange={(e) => updateLicenseField('license_number', e.target.value)}
                      placeholder="ABC123456"
                      className={`mt-1.5 ${licenseErrors.license_number ? 'border-red-500' : ''}`}
                    />
                    {licenseErrors.license_number && (
                      <p className="mt-1 text-xs text-red-600">{licenseErrors.license_number}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="issuing_state" className="text-sm font-medium text-gray-700">
                      Issuing State
                    </Label>
                    <Input
                      id="issuing_state"
                      type="text"
                      maxLength={2}
                      value={currentLicense.issuing_state}
                      onChange={(e) => updateLicenseField('issuing_state', e.target.value.toUpperCase())}
                      placeholder="CA"
                      className={`mt-1.5 ${licenseErrors.issuing_state ? 'border-red-500' : ''}`}
                    />
                    {licenseErrors.issuing_state && (
                      <p className="mt-1 text-xs text-red-600">{licenseErrors.issuing_state}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="issue_date" className="text-sm font-medium text-gray-700">
                      Issue Date
                    </Label>
                    <Input
                      id="issue_date"
                      type="date"
                      value={currentLicense.issue_date}
                      onChange={(e) => updateLicenseField('issue_date', e.target.value)}
                      className={`mt-1.5 ${licenseErrors.issue_date ? 'border-red-500' : ''}`}
                    />
                    {licenseErrors.issue_date && (
                      <p className="mt-1 text-xs text-red-600">{licenseErrors.issue_date}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="expiry_date" className="text-sm font-medium text-gray-700">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiry_date"
                      type="date"
                      value={currentLicense.expiry_date}
                      onChange={(e) => updateLicenseField('expiry_date', e.target.value)}
                      className={`mt-1.5 ${licenseErrors.expiry_date ? 'border-red-500' : ''}`}
                    />
                    {licenseErrors.expiry_date && (
                      <p className="mt-1 text-xs text-red-600">{licenseErrors.expiry_date}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={addLicense}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add License
                </Button>
              </div>

              {/* Added Licenses List */}
              {licenses.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 text-sm">Added Licenses ({licenses.length})</h3>
                  {licenses.map((license, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {license.license_type} - {license.license_number}
                        </p>
                        <p className="text-xs text-gray-600">
                          {license.issuing_state} | {license.issue_date} to {license.expiry_date}
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeLicense(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {licenses.length === 0 && (
                <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                  <p className="text-xs text-gray-700">
                    ℹ️ Please add at least one professional license to continue
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Stage 5: Taxonomies */}
          {currentStage === 5 && (
            <div className="space-y-6">
              {/* Taxonomy Form */}
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
                      onChange={(e) => updateTaxonomyField('taxonomy_code', e.target.value)}
                      placeholder="207Q00000X"
                      className={`mt-1.5 ${taxonomyErrors.taxonomy_code ? 'border-red-500' : ''}`}
                    />
                    {taxonomyErrors.taxonomy_code && (
                      <p className="mt-1 text-xs text-red-600">{taxonomyErrors.taxonomy_code}</p>
                    )}
                    <p className="mt-1 text-xs text-zinc-500">
                      10-character NUCC taxonomy code
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Description
                    </Label>
                    <Input
                      id="description"
                      type="text"
                      value={currentTaxonomy.description}
                      onChange={(e) => updateTaxonomyField('description', e.target.value)}
                      placeholder="e.g., Internal Medicine"
                      className={`mt-1.5 ${taxonomyErrors.description ? 'border-red-500' : ''}`}
                    />
                    {taxonomyErrors.description && (
                      <p className="mt-1 text-xs text-red-600">{taxonomyErrors.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_primary"
                      checked={currentTaxonomy.is_primary}
                      onChange={(e) => updateTaxonomyField('is_primary', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <Label htmlFor="is_primary" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Set as primary specialty
                    </Label>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={addTaxonomy}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Taxonomy
                </Button>
              </div>

              {/* Added Taxonomies List */}
              {taxonomies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 text-sm">Added Taxonomies ({taxonomies.length})</h3>
                  {taxonomies.map((taxonomy, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {taxonomy.taxonomy_code}
                          </p>
                          {taxonomy.is_primary && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-black text-white rounded">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {taxonomy.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!taxonomy.is_primary && (
                          <Button
                            type="button"
                            onClick={() => togglePrimary(index)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-black hover:bg-gray-100"
                          >
                            Set Primary
                          </Button>
                        )}
                        <Button
                          type="button"
                          onClick={() => removeTaxonomy(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {taxonomies.length === 0 && (
                <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                  <p className="text-xs text-gray-700">
                    ℹ️ Please add at least one taxonomy with one marked as primary
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {currentStage > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-black hover:bg-gray-800 text-white"
              size="lg"
            >
              {currentStage === totalStages ? 'Complete' : 'Next'}
              {currentStage < totalStages && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
