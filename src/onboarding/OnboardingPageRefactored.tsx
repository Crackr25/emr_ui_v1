import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowLeft,
  User,
  Badge,
  FileText,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  PersonalInfoForm,
  NPIForm,
  LicenseForm,
  LicenseList,
  TaxonomyForm,
  TaxonomyList,
  OnboardingHero,
  OnboardingProgress,
  type License,
  type Taxonomy,
} from "./index";

interface OnboardingData {
  firstname: string;
  lastname: string;
  date_of_birth: string;
  npi_number: string;
}

interface OnboardingPageProps {
  email: string;
  role: "doctor" | "nurse" | "admin";
  onComplete?: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  email,
  role,
  onComplete,
}) => {
  const { login } = useAuth();
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    firstname: "",
    lastname: "",
    date_of_birth: "",
    npi_number: "",
  });
  const [errors, setErrors] = useState<Partial<OnboardingData>>({});
  const [licenses, setLicenses] = useState<License[]>([]);
  const [currentLicense, setCurrentLicense] = useState<License>({
    license_type: "",
    license_number: "",
    issuing_state: "",
    issue_date: "",
    expiry_date: "",
    image_file: null,
    image_preview: "",
  });
  const [licenseErrors, setLicenseErrors] = useState<Partial<License>>({});
  const [expandedLicenseIndex, setExpandedLicenseIndex] = useState<
    number | null
  >(null);
  const [taxonomies, setTaxonomies] = useState<Taxonomy[]>([]);
  const [currentTaxonomy, setCurrentTaxonomy] = useState<Taxonomy>({
    taxonomy_code: "",
    description: "",
    is_primary: false,
  });
  const [taxonomyErrors, setTaxonomyErrors] = useState<Partial<Taxonomy>>({});
  const [expandedTaxonomyIndex, setExpandedTaxonomyIndex] = useState<
    number | null
  >(null);

  const totalStages = 4;

  const validateStage = (stage: number): boolean => {
    const newErrors: Partial<OnboardingData> = {};

    if (stage === 1) {
      if (!formData.firstname.trim()) {
        newErrors.firstname = "First name is required";
      }
      if (!formData.lastname.trim()) {
        newErrors.lastname = "Last name is required";
      }
      if (!formData.date_of_birth) {
        newErrors.date_of_birth = "Date of birth is required";
      } else {
        const birthDate = new Date(formData.date_of_birth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          newErrors.date_of_birth = "You must be at least 18 years old";
        }
      }
    }

    if (stage === 2) {
      if (!formData.npi_number.trim()) {
        newErrors.npi_number = "NPI number is required";
      } else if (!/^\d{10}$/.test(formData.npi_number)) {
        newErrors.npi_number = "NPI must be exactly 10 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStage === 3) {
      if (licenses.length === 0) {
        alert("Please add at least one license before continuing");
        return;
      }
      setCurrentStage(currentStage + 1);
    } else if (currentStage === 4) {
      if (taxonomies.length === 0) {
        alert("Please add at least one taxonomy before continuing");
        return;
      }
      const hasPrimary = taxonomies.some((t) => t.is_primary);
      if (!hasPrimary) {
        alert("Please mark one taxonomy as primary");
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
    console.log("✅ Onboarding completed:", {
      email,
      role,
      ...formData,
      licenses,
      taxonomies,
      mfa_enabled: true,
    });

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
    if (!currentLicense.license_type.trim())
      errors.license_type = "License type is required";
    if (!currentLicense.license_number.trim())
      errors.license_number = "License number is required";
    if (!currentLicense.issuing_state.trim())
      errors.issuing_state = "Issuing state is required";
    if (!currentLicense.issue_date)
      errors.issue_date = "Issue date is required";
    if (!currentLicense.expiry_date)
      errors.expiry_date = "Expiry date is required";

    setLicenseErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addLicense = () => {
    if (validateLicense()) {
      setLicenses([...licenses, currentLicense]);
      setCurrentLicense({
        license_type: "",
        license_number: "",
        issuing_state: "",
        issue_date: "",
        expiry_date: "",
        image_file: null,
        image_preview: "",
      });
      setLicenseErrors({});
    }
  };

  const handleLicenseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentLicense({
          ...currentLicense,
          image_file: file,
          image_preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file");
    }
  };

  const removeLicenseImage = () => {
    setCurrentLicense({
      ...currentLicense,
      image_file: null,
      image_preview: "",
    });
  };

  const removeLicense = (index: number) => {
    setLicenses(licenses.filter((_, i) => i !== index));
    if (expandedLicenseIndex === index) {
      setExpandedLicenseIndex(null);
    }
  };

  const toggleLicenseExpand = (index: number) => {
    setExpandedLicenseIndex(expandedLicenseIndex === index ? null : index);
  };

  const updateTaxonomyField = (
    field: keyof Taxonomy,
    value: string | boolean,
  ) => {
    setCurrentTaxonomy({ ...currentTaxonomy, [field]: value });
    if (taxonomyErrors[field]) {
      setTaxonomyErrors({ ...taxonomyErrors, [field]: undefined });
    }
  };

  const validateTaxonomy = (): boolean => {
    const errors: Partial<Taxonomy> = {};
    if (!currentTaxonomy.taxonomy_code.trim())
      errors.taxonomy_code = "Taxonomy code is required";
    if (currentTaxonomy.taxonomy_code.length !== 10)
      errors.taxonomy_code = "Must be exactly 10 characters";
    if (!currentTaxonomy.description.trim())
      errors.description = "Description is required";

    setTaxonomyErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addTaxonomy = () => {
    if (validateTaxonomy()) {
      let updatedTaxonomies = taxonomies;
      if (currentTaxonomy.is_primary) {
        updatedTaxonomies = taxonomies.map((t) => ({
          ...t,
          is_primary: false,
        }));
      }
      setTaxonomies([...updatedTaxonomies, currentTaxonomy]);
      setCurrentTaxonomy({
        taxonomy_code: "",
        description: "",
        is_primary: false,
      });
      setTaxonomyErrors({});
    }
  };

  const removeTaxonomy = (index: number) => {
    setTaxonomies(taxonomies.filter((_, i) => i !== index));
    if (expandedTaxonomyIndex === index) {
      setExpandedTaxonomyIndex(null);
    }
  };

  const toggleTaxonomyExpand = (index: number) => {
    setExpandedTaxonomyIndex(expandedTaxonomyIndex === index ? null : index);
  };

  const togglePrimary = (index: number) => {
    setTaxonomies(
      taxonomies.map((t, i) => ({
        ...t,
        is_primary: i === index,
      })),
    );
  };

  const getStageIcon = (stage: number) => {
    switch (stage) {
      case 1:
        return <User className="w-6 h-6" />;
      case 2:
        return <Badge className="w-6 h-6" />;
      case 3:
        return <FileText className="w-6 h-6" />;
      case 4:
        return <Stethoscope className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getStageTitle = (stage: number) => {
    switch (stage) {
      case 1:
        return "Personal Information";
      case 2:
        return "Professional Identity";
      case 3:
        return "Professional Licenses";
      case 4:
        return "Specialty Taxonomy";
      default:
        return "";
    }
  };

  const getStageDescription = (stage: number) => {
    switch (stage) {
      case 1:
        return "Let's start with your basic information";
      case 2:
        return "Enter your National Provider Identifier";
      case 3:
        return "Add your professional licenses";
      case 4:
        return "Add your specialty taxonomies";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <OnboardingHero
        currentStage={currentStage}
        totalStages={totalStages}
        stageIcon={getStageIcon(currentStage)}
        stageTitle={getStageTitle(currentStage)}
      />

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
          <OnboardingProgress
            currentStage={currentStage}
            totalStages={totalStages}
          />

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">
              {getStageTitle(currentStage)}
            </h2>
            <p className="text-zinc-600">{getStageDescription(currentStage)}</p>
            <p className="text-sm text-zinc-500 mt-2">Account: {email}</p>
          </div>

          {/* Stage 1: Personal Information */}
          {currentStage === 1 && (
            <PersonalInfoForm
              formData={formData}
              errors={errors}
              onFieldChange={(field, value) =>
                updateField(field as keyof OnboardingData, value)
              }
            />
          )}

          {/* Stage 2: NPI Number */}
          {currentStage === 2 && (
            <NPIForm
              npiNumber={formData.npi_number}
              error={errors.npi_number}
              onNPIChange={(value) => updateField("npi_number", value)}
            />
          )}

          {/* Stage 3: Licenses */}
          {currentStage === 3 && (
            <div className="space-y-6">
              <LicenseForm
                currentLicense={currentLicense}
                errors={licenseErrors}
                onFieldChange={updateLicenseField}
                onImageUpload={handleLicenseImageUpload}
                onImageRemove={removeLicenseImage}
                onAddLicense={addLicense}
              />
              <LicenseList
                licenses={licenses}
                expandedIndex={expandedLicenseIndex}
                onToggleExpand={toggleLicenseExpand}
                onRemove={removeLicense}
              />
            </div>
          )}

          {/* Stage 4: Taxonomies */}
          {currentStage === 4 && (
            <div className="space-y-6">
              <TaxonomyForm
                currentTaxonomy={currentTaxonomy}
                errors={taxonomyErrors}
                onFieldChange={updateTaxonomyField}
                onAddTaxonomy={addTaxonomy}
              />
              <TaxonomyList
                taxonomies={taxonomies}
                expandedIndex={expandedTaxonomyIndex}
                onToggleExpand={toggleTaxonomyExpand}
                onTogglePrimary={togglePrimary}
                onRemove={removeTaxonomy}
              />
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
              {currentStage === totalStages ? "Complete" : "Next"}
              {currentStage < totalStages && (
                <ArrowRight className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
