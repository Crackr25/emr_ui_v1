import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patientData: PatientFormData) => void;
}

export interface PatientFormData {
  first_name: string;
  middle_name: string;
  last_name: string;
  preferred_name: string;
  date_of_birth: string;
  ssn: string;
  sex_at_birth: 'male' | 'female' | 'other';
  marital_status: 'single' | 'married' | 'divorced' | 'widowed' | 'separated' | 'domestic_partnership';
  primary_lang: string;
  is_interpreter: boolean;
  // Address fields
  address_type?: 'Home' | 'Mailing';
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  // Contact Info fields
  primary_phone?: string;
  primary_type?: 'mobile' | 'home';
  secondary_phone?: string;
  email?: string;
  pref_method?: 'Phone' | 'Text' | 'Email Portal';
  // Insurance fields
  insurance_name?: string;
  contact_person?: string;
  phone_number?: string;
  insurance_email?: string;
  // Policy fields
  policy_number?: string;
  group_num?: string;
  policy_priority?: 'Primary' | 'Secondary' | 'Tertiary';
  policy_holder_name?: string;
  relationship?: 'self' | 'spouse' | 'parent' | 'other';
  relationship_other?: string;
  // Metadata fields
  pcp_name?: string;
  pcp_clinic?: string;
  sec_name?: string;
  sec_clinic?: string;
  pharmacy_name?: string;
  emergency_name?: string;
  emergency_tel?: string;
  adv_directive?: boolean;
  poa_name?: string;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onAddPatient,
}) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<PatientFormData>({
    first_name: '',
    middle_name: '',
    last_name: '',
    preferred_name: '',
    date_of_birth: '',
    ssn: '',
    sex_at_birth: 'other',
    marital_status: 'single',
    primary_lang: 'English',
    is_interpreter: false,
    address_type: 'Home',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    primary_phone: '',
    primary_type: 'mobile',
    secondary_phone: '',
    email: '',
    pref_method: 'Phone',
    insurance_name: '',
    contact_person: '',
    phone_number: '',
    insurance_email: '',
    policy_number: '',
    group_num: '',
    policy_priority: 'Primary',
    policy_holder_name: '',
    relationship: 'self',
    relationship_other: '',
    pcp_name: '',
    pcp_clinic: '',
    sec_name: '',
    sec_clinic: '',
    pharmacy_name: '',
    emergency_name: '',
    emergency_tel: '',
    adv_directive: false,
    poa_name: '',
  });

  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isInsuranceExpanded, setIsInsuranceExpanded] = useState(false);
  const [isPolicyExpanded, setIsPolicyExpanded] = useState(false);
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);

  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormData, string>>>({});

  const handleInputChange = (field: keyof PatientFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PatientFormData, string>> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required';
    }
    if (!formData.ssn.trim()) {
      newErrors.ssn = 'SSN is required';
    } else if (!/^\d{3}-?\d{2}-?\d{4}$/.test(formData.ssn)) {
      newErrors.ssn = 'Invalid SSN format (XXX-XX-XXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddPatient(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      first_name: '',
      middle_name: '',
      last_name: '',
      preferred_name: '',
      date_of_birth: '',
      ssn: '',
      sex_at_birth: 'other',
      marital_status: 'single',
      primary_lang: 'English',
      is_interpreter: false,
      address_type: 'Home',
      street: '',
      city: '',
      state: '',
      zip_code: '',
      primary_phone: '',
      primary_type: 'mobile',
      secondary_phone: '',
      email: '',
      pref_method: 'Phone',
      insurance_name: '',
      contact_person: '',
      phone_number: '',
      insurance_email: '',
      policy_number: '',
      group_num: '',
      policy_priority: 'Primary',
      policy_holder_name: '',
      relationship: 'self',
      relationship_other: '',
      pcp_name: '',
      pcp_clinic: '',
      sec_name: '',
      sec_clinic: '',
      pharmacy_name: '',
      emergency_name: '',
      emergency_tel: '',
      adv_directive: false,
      poa_name: '',
    });
    setErrors({});
    setIsAddressExpanded(false);
    setIsContactExpanded(false);
    setIsInsuranceExpanded(false);
    setIsPolicyExpanded(false);
    setIsMetadataExpanded(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-lg shadow-xl ${
          theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b rounded-t-lg ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Add New Patient
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className={`p-1 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-400 hover:text-gray-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form - Scrollable Content */}
        <form onSubmit={handleSubmit} className="px-6 py-4 overflow-y-auto flex-1 rounded-b-lg">
          <div className="space-y-4">
            {/* Legal Name Section */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Legal Name <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="first_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${errors.first_name ? 'border-red-500' : ''}`}
                    placeholder="John"
                  />
                  {errors.first_name && (
                    <p className="text-xs text-red-500 mt-1">{errors.first_name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="middle_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    Middle Name
                  </Label>
                  <Input
                    id="middle_name"
                    value={formData.middle_name}
                    onChange={(e) => handleInputChange('middle_name', e.target.value)}
                    className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                    placeholder="Michael"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${errors.last_name ? 'border-red-500' : ''}`}
                    placeholder="Doe"
                  />
                  {errors.last_name && (
                    <p className="text-xs text-red-500 mt-1">{errors.last_name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Preferred Name */}
            <div>
              <Label htmlFor="preferred_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Preferred Name
              </Label>
              <Input
                id="preferred_name"
                value={formData.preferred_name}
                onChange={(e) => handleInputChange('preferred_name', e.target.value)}
                className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="Patient's chosen name"
              />
            </div>

            {/* Date of Birth & SSN */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date_of_birth" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                  className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${errors.date_of_birth ? 'border-red-500' : ''}`}
                />
                {errors.date_of_birth && (
                  <p className="text-xs text-red-500 mt-1">{errors.date_of_birth}</p>
                )}
              </div>
              <div>
                <Label htmlFor="ssn" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                  Social Security Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ssn"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange('ssn', e.target.value)}
                  className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'} ${errors.ssn ? 'border-red-500' : ''}`}
                  placeholder="XXX-XX-XXXX"
                  maxLength={11}
                />
                {errors.ssn && (
                  <p className="text-xs text-red-500 mt-1">{errors.ssn}</p>
                )}
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Encrypted for HIPAA compliance
                </p>
              </div>
            </div>

            {/* Biological Sex */}
            <div>
              <Label htmlFor="sex_at_birth" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Biological Sex
              </Label>
              <Select
                value={formData.sex_at_birth}
                onValueChange={(value) => handleInputChange('sex_at_birth', value)}
              >
                <SelectTrigger
                  className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Marital Status */}
            <div>
              <Label htmlFor="marital_status" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Marital Status
              </Label>
              <Select
                value={formData.marital_status}
                onValueChange={(value) => handleInputChange('marital_status', value)}
              >
                <SelectTrigger
                  className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                  <SelectItem value="separated">Separated</SelectItem>
                  <SelectItem value="domestic_partnership">Domestic Partnership</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Primary Language */}
            <div>
              <Label htmlFor="primary_lang" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Primary Language
              </Label>
              <Input
                id="primary_lang"
                value={formData.primary_lang}
                onChange={(e) => handleInputChange('primary_lang', e.target.value)}
                className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="English"
              />
            </div>

            {/* Interpreter Required */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_interpreter"
                checked={formData.is_interpreter}
                onCheckedChange={(checked) => handleInputChange('is_interpreter', checked as boolean)}
                className={theme === 'dark' ? 'border-zinc-700' : 'border-gray-300'}
              />
              <Label
                htmlFor="is_interpreter"
                className={`text-sm cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
              >
                Interpreter Required
              </Label>
            </div>

            {/* Address Section - Collapsible */}
            <div className={`border rounded-lg ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => setIsAddressExpanded(!isAddressExpanded)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'}`}
              >
                <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Address (Optional)
                </h3>
                {isAddressExpanded ? (
                  <ChevronUp className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                )}
              </button>

              {isAddressExpanded && (
                <div className={`px-4 pb-4 space-y-3 border-t ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                  {/* Address Type */}
                  <div className="pt-3">
                    <Label htmlFor="address_type" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Address Type
                    </Label>
                    <Select
                      value={formData.address_type}
                      onValueChange={(value) => handleInputChange('address_type', value)}
                    >
                      <SelectTrigger
                        className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Mailing">Mailing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Street Address */}
                  <div>
                    <Label htmlFor="street" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Street Address
                    </Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="123 Main St"
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>

                  {/* City */}
                  <div>
                    <Label htmlFor="city" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="City of residence"
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>

                  {/* State & Zip Code */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="state" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                        State
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="CA"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip_code" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                        Zip/Postal Code
                      </Label>
                      <Input
                        id="zip_code"
                        value={formData.zip_code}
                        onChange={(e) => handleInputChange('zip_code', e.target.value)}
                        className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="90210"
                      />
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Should be encrypted
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information Section - Collapsible */}
            <div className={`border rounded-lg ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => setIsContactExpanded(!isContactExpanded)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'}`}
              >
                <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Contact Information (Optional)
                </h3>
                {isContactExpanded ? (
                  <ChevronUp className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                )}
              </button>

              {isContactExpanded && (
                <div className={`px-4 pb-4 space-y-3 border-t ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                  {/* Primary Phone */}
                  <div className="pt-3">
                    <Label htmlFor="primary_phone" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Primary Phone
                    </Label>
                    <Input
                      id="primary_phone"
                      value={formData.primary_phone}
                      onChange={(e) => handleInputChange('primary_phone', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Digits only"
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>

                  {/* Primary Type */}
                  <div>
                    <Label htmlFor="primary_type" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Primary Phone Type
                    </Label>
                    <Select
                      value={formData.primary_type}
                      onValueChange={(value) => handleInputChange('primary_type', value)}
                    >
                      <SelectTrigger
                        className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>

                  {/* Secondary Phone */}
                  <div>
                    <Label htmlFor="secondary_phone" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Secondary Phone
                    </Label>
                    <Input
                      id="secondary_phone"
                      value={formData.secondary_phone}
                      onChange={(e) => handleInputChange('secondary_phone', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Alternative phone number"
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="patient@example.com"
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>

                  {/* Preferred Method */}
                  <div>
                    <Label htmlFor="pref_method" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Preferred Contact Method
                    </Label>
                    <Select
                      value={formData.pref_method}
                      onValueChange={(value) => handleInputChange('pref_method', value)}
                    >
                      <SelectTrigger
                        className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                        <SelectItem value="Phone">Phone</SelectItem>
                        <SelectItem value="Text">Text</SelectItem>
                        <SelectItem value="Email Portal">Email Portal</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Insurance Carriers Section - Collapsible */}
            <div className={`border rounded-lg ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => setIsInsuranceExpanded(!isInsuranceExpanded)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'}`}
              >
                <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Insurance Carriers (Optional)
                </h3>
                {isInsuranceExpanded ? (
                  <ChevronUp className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                )}
              </button>

              {isInsuranceExpanded && (
                <div className={`px-4 pb-4 space-y-3 border-t ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                  {/* Insurance Name */}
                  <div className="pt-3">
                    <Label htmlFor="insurance_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Insurance Name
                    </Label>
                    <Input
                      id="insurance_name"
                      value={formData.insurance_name}
                      onChange={(e) => handleInputChange('insurance_name', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Insurance provider name"
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <Label htmlFor="contact_person" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Contact Person
                    </Label>
                    <Input
                      id="contact_person"
                      value={formData.contact_person}
                      onChange={(e) => handleInputChange('contact_person', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Contact person name"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phone_number" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Phone Number
                    </Label>
                    <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Insurance phone number"
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="insurance_email" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Email Address
                    </Label>
                    <Input
                      id="insurance_email"
                      type="email"
                      value={formData.insurance_email}
                      onChange={(e) => handleInputChange('insurance_email', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="insurance@example.com"
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Should be encrypted
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Patient Policies Section - Collapsible */}
            <div className={`border rounded-lg ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => setIsPolicyExpanded(!isPolicyExpanded)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'}`}
              >
                <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Patient Policies (Optional)
                </h3>
                {isPolicyExpanded ? (
                  <ChevronUp className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                )}
              </button>

              {isPolicyExpanded && (
                <div className={`px-4 pb-4 space-y-3 border-t ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                  {/* Policy Number */}
                  <div className="pt-3">
                    <Label htmlFor="policy_number" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Policy/Medicare Number
                    </Label>
                    <Input
                      id="policy_number"
                      value={formData.policy_number}
                      onChange={(e) => handleInputChange('policy_number', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Policy or Medicare number"
                    />
                  </div>

                  {/* Group Number */}
                  <div>
                    <Label htmlFor="group_num" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Group Number
                    </Label>
                    <Input
                      id="group_num"
                      value={formData.group_num}
                      onChange={(e) => handleInputChange('group_num', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Group number"
                    />
                  </div>

                  {/* Policy Priority */}
                  <div>
                    <Label htmlFor="policy_priority" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Policy Priority
                    </Label>
                    <Select
                      value={formData.policy_priority}
                      onValueChange={(value) => handleInputChange('policy_priority', value)}
                    >
                      <SelectTrigger
                        className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                        <SelectItem value="Primary">Primary</SelectItem>
                        <SelectItem value="Secondary">Secondary</SelectItem>
                        <SelectItem value="Tertiary">Tertiary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Policy Holder Name */}
                  <div>
                    <Label htmlFor="policy_holder_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Policy Holder Name
                    </Label>
                    <Input
                      id="policy_holder_name"
                      value={formData.policy_holder_name}
                      onChange={(e) => handleInputChange('policy_holder_name', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Name of policy holder"
                    />
                  </div>

                  {/* Relationship */}
                  <div>
                    <Label htmlFor="relationship" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Relationship to Patient
                    </Label>
                    <Select
                      value={formData.relationship}
                      onValueChange={(value) => handleInputChange('relationship', value)}
                    >
                      <SelectTrigger
                        className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}>
                        <SelectItem value="self">Self</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Relationship Other - Only show if "other" is selected */}
                  {formData.relationship === 'other' && (
                    <div>
                      <Label htmlFor="relationship_other" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                        Specify Relationship
                      </Label>
                      <Input
                        id="relationship_other"
                        value={formData.relationship_other}
                        onChange={(e) => handleInputChange('relationship_other', e.target.value)}
                        className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="Specify other relationship"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Patient Metadata Section - Collapsible */}
            <div className={`border rounded-lg ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'}`}
              >
                <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Patient Metadata (Optional)
                </h3>
                {isMetadataExpanded ? (
                  <ChevronUp className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                )}
              </button>

              {isMetadataExpanded && (
                <div className={`px-4 pb-4 space-y-3 border-t ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                  {/* Primary Care Provider */}
                  <div className="pt-3">
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
                      Primary Care Provider
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="pcp_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                          Provider Name
                        </Label>
                        <Input
                          id="pcp_name"
                          value={formData.pcp_name}
                          onChange={(e) => handleInputChange('pcp_name', e.target.value)}
                          className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Dr. Smith"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pcp_clinic" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                          Practice Name
                        </Label>
                        <Input
                          id="pcp_clinic"
                          value={formData.pcp_clinic}
                          onChange={(e) => handleInputChange('pcp_clinic', e.target.value)}
                          className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Medical Center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Care Provider */}
                  <div>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
                      Secondary Care Provider
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="sec_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                          Provider Name
                        </Label>
                        <Input
                          id="sec_name"
                          value={formData.sec_name}
                          onChange={(e) => handleInputChange('sec_name', e.target.value)}
                          className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Dr. Jones"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sec_clinic" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                          Practice Name
                        </Label>
                        <Input
                          id="sec_clinic"
                          value={formData.sec_clinic}
                          onChange={(e) => handleInputChange('sec_clinic', e.target.value)}
                          className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Specialty Clinic"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pharmacy */}
                  <div>
                    <Label htmlFor="pharmacy_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Preferred Pharmacy
                    </Label>
                    <Input
                      id="pharmacy_name"
                      value={formData.pharmacy_name}
                      onChange={(e) => handleInputChange('pharmacy_name', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Pharmacy name"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
                      Emergency Contact
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="emergency_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                          Contact Name
                        </Label>
                        <Input
                          id="emergency_name"
                          value={formData.emergency_name}
                          onChange={(e) => handleInputChange('emergency_name', e.target.value)}
                          className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Emergency contact"
                        />
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                          Should be encrypted
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="emergency_tel" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                          Emergency Phone
                        </Label>
                        <Input
                          id="emergency_tel"
                          value={formData.emergency_tel}
                          onChange={(e) => handleInputChange('emergency_tel', e.target.value)}
                          className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Phone number"
                        />
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                          Should be encrypted
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Advance Directive */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="adv_directive"
                      checked={formData.adv_directive}
                      onCheckedChange={(checked) => handleInputChange('adv_directive', checked as boolean)}
                      className={theme === 'dark' ? 'border-zinc-700' : 'border-gray-300'}
                    />
                    <Label
                      htmlFor="adv_directive"
                      className={`text-sm cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                    >
                      Document on file flag (Advance Directive)
                    </Label>
                  </div>

                  {/* Power of Attorney */}
                  <div>
                    <Label htmlFor="poa_name" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                      Healthcare Proxy Name (POA)
                    </Label>
                    <Input
                      id="poa_name"
                      value={formData.poa_name}
                      onChange={(e) => handleInputChange('poa_name', e.target.value)}
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Power of Attorney name"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className={`${
                theme === 'dark'
                  ? 'border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700'
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${
                theme === 'dark'
                  ? 'bg-white hover:bg-zinc-200 text-black'
                  : 'bg-black hover:bg-gray-800 text-white'
              }`}
            >
              Add Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
