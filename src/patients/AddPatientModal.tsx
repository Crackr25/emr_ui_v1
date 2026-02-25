import React, { useState } from "react";
import { X, Upload, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patientData: PatientFormData) => void;
}

export interface AddressEntry {
  address_type: "Home" | "Mailing";
  street: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface PatientFormData {
  // Core — Step 1
  first_name: string;
  middle_name: string;
  last_name: string;
  preferred_name: string;
  date_of_birth: string;
  ssn: string;
  sex_at_birth: "male" | "female" | "other";
  marital_status:
    | "single"
    | "married"
    | "divorced"
    | "widowed"
    | "separated"
    | "domestic_partnership";
  primary_lang: string;
  is_interpreter: boolean;
  assign_to?: string;
  medical_record?: string;
  set?: string;
  referral_stage: "Pending" | "Processed" | "Hold";
  referral_files?: File[];
  // Address — Step 2
  addresses?: AddressEntry[];
  // Contact — Step 2
  primary_phone?: string;
  primary_type?: "mobile" | "home";
  secondary_phone?: string;
  email?: string;
  pref_method?: "Phone" | "Text" | "Email Portal";
  // Insurance — Step 2
  insurance_name?: string;
  contact_person?: string;
  phone_number?: string;
  insurance_email?: string;
  // Policy — Step 2
  policy_number?: string;
  group_num?: string;
  policy_priority?: "Primary" | "Secondary" | "Tertiary";
  policy_holder_name?: string;
  relationship?: "self" | "spouse" | "parent" | "other";
  relationship_other?: string;
  // Metadata — Step 2
  pcp_name?: string;
  pcp_clinic?: string;
  sec_name?: string;
  sec_clinic?: string;
  pharmacy_name?: string;
  emergency_name?: string;
  emergency_tel?: string;
  adv_directive?: boolean;
  poa_name?: string;
  // Task — Step 3
  task_title?: string;
  task_description?: string;
  task_assign_to?: string;
  task_name?: string;
  task_type?: string;
  task_status?: string;
  start_date?: string;
  duration_days?: number;
  end_date?: string;
  oasis_date?: string;
  completed_date?: string;
  oasis_file?: File;
}

const EMPTY_FORM: PatientFormData = {
  first_name: "",
  middle_name: "",
  last_name: "",
  preferred_name: "",
  date_of_birth: "",
  ssn: "",
  sex_at_birth: "other",
  marital_status: "single",
  primary_lang: "English",
  is_interpreter: false,
  assign_to: "Unassigned",
  medical_record: "",
  set: "",
  referral_stage: "Pending",
  addresses: [],
  primary_phone: "",
  primary_type: "mobile",
  secondary_phone: "",
  email: "",
  pref_method: "Phone",
  insurance_name: "",
  contact_person: "",
  phone_number: "",
  insurance_email: "",
  policy_number: "",
  group_num: "",
  policy_priority: "Primary",
  policy_holder_name: "",
  relationship: "self",
  relationship_other: "",
  pcp_name: "",
  pcp_clinic: "",
  sec_name: "",
  sec_clinic: "",
  pharmacy_name: "",
  emergency_name: "",
  emergency_tel: "",
  adv_directive: false,
  poa_name: "",
  task_title: "",
  task_description: "",
  task_assign_to: "Unassigned",
  task_name: "",
  task_type: "",
  task_status: "Assigned",
  start_date: new Date().toISOString().split("T")[0],
  duration_days: 1,
  end_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  oasis_date: "",
  completed_date: "",
};

const STEPS = [
  { num: 1, label: "Patient Information", sub: "Core patient details" },
  { num: 2, label: "Additional Details", sub: "Optional — skip anytime" },
  { num: 3, label: "Create Task", sub: "Optionally create a task" },
];

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onAddPatient,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PatientFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PatientFormData, string>>
  >({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [oasisFile, setOasisFile] = useState<File | null>(null);

  // Accordion state — Step 2
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isInsuranceExpanded, setIsInsuranceExpanded] = useState(false);
  const [isPolicyExpanded, setIsPolicyExpanded] = useState(false);
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);

  // --- Style helpers ---
  const inputCls = (extra = "") =>
    `mt-1 ${isDark ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" : "bg-white border-gray-300"} ${extra}`;
  const labelCls = isDark ? "text-zinc-300" : "text-gray-700";
  const selectContentCls = isDark
    ? "bg-zinc-800 border-zinc-700 text-zinc-100"
    : "bg-white";
  const selectItemCls = isDark
    ? "text-zinc-100 focus:bg-zinc-700 focus:text-white"
    : "";
  const selectTriggerCls = `mt-1 ${isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`;
  const hintCls = `text-xs mt-1 ${isDark ? "text-zinc-500" : "text-gray-400"}`;

  const handleInputChange = (
    field: keyof PatientFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const EMPTY_ADDRESS: AddressEntry = {
    address_type: "Home",
    street: "",
    city: "",
    state: "",
    zip_code: "",
  };

  const handleAddAddress = () =>
    setFormData((prev) => ({
      ...prev,
      addresses: [...(prev.addresses ?? []), { ...EMPTY_ADDRESS }],
    }));

  const handleAddressChange = (
    idx: number,
    field: keyof AddressEntry,
    value: string,
  ) =>
    setFormData((prev) => {
      const updated = [...(prev.addresses ?? [])];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, addresses: updated };
    });

  const handleRemoveAddress = (idx: number) =>
    setFormData((prev) => ({
      ...prev,
      addresses: (prev.addresses ?? []).filter((_, i) => i !== idx),
    }));

  const handleDurationChange = (value: string) => {
    const duration = parseInt(value) || 1;
    const startDate = new Date(formData.start_date || Date.now());
    const endDate = new Date(startDate.getTime() + duration * 86400000);
    setFormData((prev) => ({
      ...prev,
      duration_days: duration,
      end_date: endDate.toISOString().split("T")[0],
    }));
  };

  const handleStartDateChange = (value: string) => {
    const duration = formData.duration_days || 1;
    const endDate = new Date(new Date(value).getTime() + duration * 86400000);
    setFormData((prev) => ({
      ...prev,
      start_date: value,
      end_date: endDate.toISOString().split("T")[0],
    }));
  };

  const validateStep1 = (): boolean => {
    const errs: Partial<Record<keyof PatientFormData, string>> = {};
    if (!formData.first_name.trim()) errs.first_name = "First name is required";
    if (!formData.last_name.trim()) errs.last_name = "Last name is required";
    if (!formData.date_of_birth)
      errs.date_of_birth = "Date of birth is required";
    if (!formData.ssn.trim()) {
      errs.ssn = "SSN is required";
    } else if (!/^\d{3}-?\d{2}-?\d{4}$/.test(formData.ssn)) {
      errs.ssn = "Invalid SSN format (XXX-XX-XXXX)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleClose = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setCurrentStep(1);
    setSelectedFiles([]);
    setOasisFile(null);
    setIsAddressExpanded(false);
    setIsContactExpanded(false);
    setIsInsuranceExpanded(false);
    setIsPolicyExpanded(false);
    setIsMetadataExpanded(false);
    onClose();
  };

  const handleContinue = () => {
    if (currentStep === 1 && !validateStep1()) return;
    setCurrentStep((s) => s + 1);
  };

  const handleCreatePatientOnly = () => {
    if (currentStep === 1 && !validateStep1()) return;
    onAddPatient({ ...formData, referral_files: selectedFiles });
    handleClose();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onAddPatient({
      ...formData,
      referral_files: selectedFiles,
      oasis_file: oasisFile ?? undefined,
    });
    handleClose();
  };

  if (!isOpen) return null;

  // Reusable accordion wrapper
  const Accordion = ({
    title,
    expanded,
    toggle,
    children,
  }: {
    title: string;
    expanded: boolean;
    toggle: () => void;
    children: React.ReactNode;
  }) => (
    <div
      className={`border rounded-lg ${isDark ? "border-zinc-700" : "border-gray-200"}`}
    >
      <button
        type="button"
        onClick={toggle}
        className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${isDark ? "hover:bg-zinc-800" : "hover:bg-gray-50"}`}
      >
        <span
          className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </span>
        {expanded ? (
          <ChevronUp
            className={`w-4 h-4 ${isDark ? "text-zinc-400" : "text-gray-500"}`}
          />
        ) : (
          <ChevronDown
            className={`w-4 h-4 ${isDark ? "text-zinc-400" : "text-gray-500"}`}
          />
        )}
      </button>
      {expanded && (
        <div
          className={`px-4 pb-4 space-y-3 border-t ${isDark ? "border-zinc-700" : "border-gray-200"}`}
        >
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-lg shadow-xl ${isDark ? "bg-zinc-900" : "bg-white"}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-zinc-800" : "border-gray-200"}`}
        >
          <h2
            className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            New Patient
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className={`p-1 rounded-lg transition-colors ${isDark ? "hover:bg-zinc-800 text-zinc-400 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-900"}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicators */}
        <div
          className={`flex items-center px-6 py-3 border-b ${isDark ? "border-zinc-800" : "border-gray-100"}`}
        >
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex items-center gap-2.5 shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === step.num
                      ? "bg-blue-600 text-white"
                      : currentStep > step.num
                        ? "bg-green-600 text-white"
                        : isDark
                          ? "bg-zinc-700 text-zinc-400"
                          : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.num ? "✓" : step.num}
                </div>
                <div>
                  <div
                    className={`text-xs font-semibold leading-tight ${currentStep === step.num ? "text-blue-600" : isDark ? "text-zinc-400" : "text-gray-500"}`}
                  >
                    {step.label}
                  </div>
                  <div
                    className={`text-[10px] leading-tight ${isDark ? "text-zinc-600" : "text-gray-400"}`}
                  >
                    {step.sub}
                  </div>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 ${currentStep > idx + 1 ? "bg-green-500" : isDark ? "bg-zinc-700" : "bg-gray-200"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5"
        >
          {/* ══ STEP 1: Core Patient Info ══ */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Legal Name */}
              <div>
                <h3
                  className={`text-sm font-semibold mb-3 ${isDark ? "text-zinc-200" : "text-gray-800"}`}
                >
                  Legal Name <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className={labelCls}>
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.first_name}
                      onChange={(e) =>
                        handleInputChange("first_name", e.target.value)
                      }
                      className={inputCls(
                        errors.first_name ? "border-red-500" : "",
                      )}
                      placeholder="John"
                    />
                    {errors.first_name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.first_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className={labelCls}>Middle Name</Label>
                    <Input
                      value={formData.middle_name}
                      onChange={(e) =>
                        handleInputChange("middle_name", e.target.value)
                      }
                      className={inputCls()}
                      placeholder="Michael"
                    />
                  </div>
                  <div>
                    <Label className={labelCls}>
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.last_name}
                      onChange={(e) =>
                        handleInputChange("last_name", e.target.value)
                      }
                      className={inputCls(
                        errors.last_name ? "border-red-500" : "",
                      )}
                      placeholder="Doe"
                    />
                    {errors.last_name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preferred Name */}
              <div>
                <Label className={labelCls}>Preferred Name</Label>
                <Input
                  value={formData.preferred_name}
                  onChange={(e) =>
                    handleInputChange("preferred_name", e.target.value)
                  }
                  className={inputCls()}
                  placeholder="Patient's chosen name"
                />
              </div>

              {/* DOB + SSN */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className={labelCls}>
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) =>
                      handleInputChange("date_of_birth", e.target.value)
                    }
                    className={inputCls(
                      errors.date_of_birth ? "border-red-500" : "",
                    )}
                  />
                  {errors.date_of_birth && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.date_of_birth}
                    </p>
                  )}
                </div>
                <div>
                  <Label className={labelCls}>
                    Social Security Number{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={formData.ssn}
                    onChange={(e) => handleInputChange("ssn", e.target.value)}
                    className={inputCls(errors.ssn ? "border-red-500" : "")}
                    placeholder="XXX-XX-XXXX"
                    maxLength={11}
                  />
                  {errors.ssn && (
                    <p className="text-xs text-red-500 mt-1">{errors.ssn}</p>
                  )}
                  <p className={hintCls}>Encrypted for HIPAA compliance</p>
                </div>
              </div>

              {/* Sex + Marital Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className={labelCls}>Biological Sex</Label>
                  <Select
                    value={formData.sex_at_birth}
                    onValueChange={(v) => handleInputChange("sex_at_birth", v)}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem className={selectItemCls} value="male">
                        Male
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="female">
                        Female
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={labelCls}>Marital Status</Label>
                  <Select
                    value={formData.marital_status}
                    onValueChange={(v) =>
                      handleInputChange("marital_status", v)
                    }
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem className={selectItemCls} value="single">
                        Single
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="married">
                        Married
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="divorced">
                        Divorced
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="widowed">
                        Widowed
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="separated">
                        Separated
                      </SelectItem>
                      <SelectItem
                        className={selectItemCls}
                        value="domestic_partnership"
                      >
                        Domestic Partnership
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Language + Interpreter */}
              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <Label className={labelCls}>Primary Language</Label>
                  <Input
                    value={formData.primary_lang}
                    onChange={(e) =>
                      handleInputChange("primary_lang", e.target.value)
                    }
                    className={inputCls()}
                    placeholder="English"
                  />
                </div>
                <div className="flex items-center gap-2 pb-1">
                  <Checkbox
                    id="is_interpreter"
                    checked={formData.is_interpreter}
                    onCheckedChange={(c) =>
                      handleInputChange("is_interpreter", c as boolean)
                    }
                    className={isDark ? "border-zinc-600" : "border-gray-300"}
                  />
                  <Label
                    htmlFor="is_interpreter"
                    className={`text-sm cursor-pointer ${labelCls}`}
                  >
                    Interpreter Required
                  </Label>
                </div>
              </div>

              {/* Assign to + MRN + Set */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className={labelCls}>Assign to</Label>
                  <Select
                    value={formData.assign_to}
                    onValueChange={(v) => handleInputChange("assign_to", v)}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem className={selectItemCls} value="Unassigned">
                        Unassigned
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Dr. Smith">
                        Dr. Smith
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Dr. Johnson">
                        Dr. Johnson
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Nurse Davis">
                        Nurse Davis
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={labelCls}>Medical Record (MRN)</Label>
                  <Input
                    value={formData.medical_record}
                    onChange={(e) =>
                      handleInputChange("medical_record", e.target.value)
                    }
                    className={inputCls()}
                    placeholder="Enter MRN (optional)"
                  />
                </div>
                <div>
                  <Label className={labelCls}>Set</Label>
                  <Select
                    value={formData.set}
                    onValueChange={(v) => handleInputChange("set", v)}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue placeholder="Select a set" />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem className={selectItemCls} value="Set A">
                        Set A
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Set B">
                        Set B
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Set C">
                        Set C
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Referral Stage */}
              <div>
                <Label className={labelCls}>Referral Stage</Label>
                <Select
                  value={formData.referral_stage}
                  onValueChange={(v) =>
                    handleInputChange(
                      "referral_stage",
                      v as PatientFormData["referral_stage"],
                    )
                  }
                >
                  <SelectTrigger className={selectTriggerCls}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          formData.referral_stage === "Pending"
                            ? "bg-yellow-500"
                            : formData.referral_stage === "Processed"
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                      />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className={selectContentCls}>
                    <SelectItem className={selectItemCls} value="Pending">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem className={selectItemCls} value="Processed">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Processed
                      </div>
                    </SelectItem>
                    <SelectItem className={selectItemCls} value="Hold">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        Hold
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Referral Files */}
              <div>
                <Label className={labelCls}>Referrals (Optional)</Label>
                <label
                  htmlFor="referral_files"
                  className={`mt-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    isDark
                      ? "border-zinc-700 hover:border-zinc-500 bg-zinc-800"
                      : "border-gray-300 hover:border-gray-400 bg-gray-50"
                  }`}
                >
                  <Upload
                    className={`w-4 h-4 ${isDark ? "text-zinc-400" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-500"}`}
                  >
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : "Choose Files"}
                  </span>
                </label>
                <input
                  id="referral_files"
                  type="file"
                  multiple
                  onChange={(e) =>
                    e.target.files &&
                    setSelectedFiles(Array.from(e.target.files))
                  }
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* ══ STEP 2: Additional Details ══ */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <p
                className={`text-xs mb-3 ${isDark ? "text-zinc-500" : "text-gray-400"}`}
              >
                All sections below are optional. Expand what you need or skip to
                the next step.
              </p>

              {/* Address */}
              <Accordion
                title="Address (Optional)"
                expanded={isAddressExpanded}
                toggle={() => setIsAddressExpanded(!isAddressExpanded)}
              >
                <div className="pt-3 space-y-4">
                  {(formData.addresses ?? []).length === 0 && (
                    <p
                      className={`text-xs ${isDark ? "text-zinc-500" : "text-gray-400"}`}
                    >
                      No addresses added yet.
                    </p>
                  )}
                  {(formData.addresses ?? []).map((addr, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-lg border p-3 space-y-3 ${isDark ? "border-zinc-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}
                    >
                      {/* Card header */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-zinc-400" : "text-gray-500"}`}
                        >
                          Address {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAddress(idx)}
                          className={`p-1 rounded hover:bg-red-500/10 text-red-400 hover:text-red-600 transition-colors`}
                          aria-label="Remove address"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Address Type */}
                      <div>
                        <Label className={labelCls}>Address Type</Label>
                        <Select
                          value={addr.address_type}
                          onValueChange={(v) =>
                            handleAddressChange(
                              idx,
                              "address_type",
                              v as AddressEntry["address_type"],
                            )
                          }
                        >
                          <SelectTrigger className={selectTriggerCls}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={selectContentCls}>
                            <SelectItem className={selectItemCls} value="Home">
                              Home
                            </SelectItem>
                            <SelectItem
                              className={selectItemCls}
                              value="Mailing"
                            >
                              Mailing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Street */}
                      <div>
                        <Label className={labelCls}>Street Address</Label>
                        <Input
                          value={addr.street}
                          onChange={(e) =>
                            handleAddressChange(idx, "street", e.target.value)
                          }
                          className={inputCls()}
                          placeholder="123 Main St"
                        />
                        <p className={hintCls}>Encrypted at rest</p>
                      </div>

                      {/* City */}
                      <div>
                        <Label className={labelCls}>City</Label>
                        <Input
                          value={addr.city}
                          onChange={(e) =>
                            handleAddressChange(idx, "city", e.target.value)
                          }
                          className={inputCls()}
                          placeholder="City"
                        />
                      </div>

                      {/* State + Zip */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className={labelCls}>State</Label>
                          <Input
                            value={addr.state}
                            onChange={(e) =>
                              handleAddressChange(idx, "state", e.target.value)
                            }
                            className={inputCls()}
                            placeholder="CA"
                            maxLength={2}
                          />
                        </div>
                        <div>
                          <Label className={labelCls}>Zip / Postal Code</Label>
                          <Input
                            value={addr.zip_code}
                            onChange={(e) =>
                              handleAddressChange(
                                idx,
                                "zip_code",
                                e.target.value,
                              )
                            }
                            className={inputCls()}
                            placeholder="90210"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add address button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddAddress}
                    className={`flex items-center gap-1.5 w-full justify-center ${isDark ? "bg-zinc-900 border-zinc-600 text-zinc-300 hover:bg-zinc-800" : ""}`}
                  >
                    <Plus size={14} />
                    Add Address
                  </Button>
                </div>
              </Accordion>

              {/* Contact Information */}
              <Accordion
                title="Contact Information (Optional)"
                expanded={isContactExpanded}
                toggle={() => setIsContactExpanded(!isContactExpanded)}
              >
                <div className="pt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className={labelCls}>Primary Phone</Label>
                      <Input
                        value={formData.primary_phone}
                        onChange={(e) =>
                          handleInputChange("primary_phone", e.target.value)
                        }
                        className={inputCls()}
                        placeholder="Digits only"
                      />
                      <p className={hintCls}>Encrypted at rest</p>
                    </div>
                    <div>
                      <Label className={labelCls}>Phone Type</Label>
                      <Select
                        value={formData.primary_type}
                        onValueChange={(v) =>
                          handleInputChange("primary_type", v)
                        }
                      >
                        <SelectTrigger className={selectTriggerCls}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={selectContentCls}>
                          <SelectItem className={selectItemCls} value="mobile">
                            Mobile
                          </SelectItem>
                          <SelectItem className={selectItemCls} value="home">
                            Home
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className={labelCls}>Secondary Phone</Label>
                    <Input
                      value={formData.secondary_phone}
                      onChange={(e) =>
                        handleInputChange("secondary_phone", e.target.value)
                      }
                      className={inputCls()}
                      placeholder="Alternative phone number"
                    />
                    <p className={hintCls}>Encrypted at rest</p>
                  </div>
                  <div>
                    <Label className={labelCls}>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={inputCls()}
                      placeholder="patient@example.com"
                    />
                    <p className={hintCls}>Encrypted at rest</p>
                  </div>
                  <div>
                    <Label className={labelCls}>Preferred Contact Method</Label>
                    <Select
                      value={formData.pref_method}
                      onValueChange={(v) => handleInputChange("pref_method", v)}
                    >
                      <SelectTrigger className={selectTriggerCls}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentCls}>
                        <SelectItem className={selectItemCls} value="Phone">
                          Phone
                        </SelectItem>
                        <SelectItem className={selectItemCls} value="Text">
                          Text
                        </SelectItem>
                        <SelectItem
                          className={selectItemCls}
                          value="Email Portal"
                        >
                          Email Portal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Accordion>

              {/* Insurance Carriers */}
              <Accordion
                title="Insurance Carriers (Optional)"
                expanded={isInsuranceExpanded}
                toggle={() => setIsInsuranceExpanded(!isInsuranceExpanded)}
              >
                <div className="pt-3 space-y-3">
                  <div>
                    <Label className={labelCls}>Insurance Name</Label>
                    <Input
                      value={formData.insurance_name}
                      onChange={(e) =>
                        handleInputChange("insurance_name", e.target.value)
                      }
                      className={inputCls()}
                      placeholder="Insurance provider name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className={labelCls}>Contact Person</Label>
                      <Input
                        value={formData.contact_person}
                        onChange={(e) =>
                          handleInputChange("contact_person", e.target.value)
                        }
                        className={inputCls()}
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <Label className={labelCls}>Phone Number</Label>
                      <Input
                        value={formData.phone_number}
                        onChange={(e) =>
                          handleInputChange("phone_number", e.target.value)
                        }
                        className={inputCls()}
                        placeholder="Insurance phone"
                      />
                      <p className={hintCls}>Encrypted at rest</p>
                    </div>
                  </div>
                  <div>
                    <Label className={labelCls}>Email Address</Label>
                    <Input
                      type="email"
                      value={formData.insurance_email}
                      onChange={(e) =>
                        handleInputChange("insurance_email", e.target.value)
                      }
                      className={inputCls()}
                      placeholder="insurance@example.com"
                    />
                  </div>
                </div>
              </Accordion>

              {/* Patient Policies */}
              <Accordion
                title="Patient Policies (Optional)"
                expanded={isPolicyExpanded}
                toggle={() => setIsPolicyExpanded(!isPolicyExpanded)}
              >
                <div className="pt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className={labelCls}>
                        Policy / Medicare Number
                      </Label>
                      <Input
                        value={formData.policy_number}
                        onChange={(e) =>
                          handleInputChange("policy_number", e.target.value)
                        }
                        className={inputCls()}
                        placeholder="Policy number"
                      />
                    </div>
                    <div>
                      <Label className={labelCls}>Group Number</Label>
                      <Input
                        value={formData.group_num}
                        onChange={(e) =>
                          handleInputChange("group_num", e.target.value)
                        }
                        className={inputCls()}
                        placeholder="Group number"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className={labelCls}>Policy Priority</Label>
                    <Select
                      value={formData.policy_priority}
                      onValueChange={(v) =>
                        handleInputChange("policy_priority", v)
                      }
                    >
                      <SelectTrigger className={selectTriggerCls}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentCls}>
                        <SelectItem className={selectItemCls} value="Primary">
                          Primary
                        </SelectItem>
                        <SelectItem className={selectItemCls} value="Secondary">
                          Secondary
                        </SelectItem>
                        <SelectItem className={selectItemCls} value="Tertiary">
                          Tertiary
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={labelCls}>Policy Holder Name</Label>
                    <Input
                      value={formData.policy_holder_name}
                      onChange={(e) =>
                        handleInputChange("policy_holder_name", e.target.value)
                      }
                      className={inputCls()}
                      placeholder="Name of policy holder"
                    />
                  </div>
                  <div>
                    <Label className={labelCls}>Relationship to Patient</Label>
                    <Select
                      value={formData.relationship}
                      onValueChange={(v) =>
                        handleInputChange("relationship", v)
                      }
                    >
                      <SelectTrigger className={selectTriggerCls}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentCls}>
                        <SelectItem className={selectItemCls} value="self">
                          Self
                        </SelectItem>
                        <SelectItem className={selectItemCls} value="spouse">
                          Spouse
                        </SelectItem>
                        <SelectItem className={selectItemCls} value="parent">
                          Parent
                        </SelectItem>
                        <SelectItem className={selectItemCls} value="other">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.relationship === "other" && (
                    <div>
                      <Label className={labelCls}>Specify Relationship</Label>
                      <Input
                        value={formData.relationship_other}
                        onChange={(e) =>
                          handleInputChange(
                            "relationship_other",
                            e.target.value,
                          )
                        }
                        className={inputCls()}
                        placeholder="Specify other relationship"
                      />
                    </div>
                  )}
                </div>
              </Accordion>

              {/* Providers, Emergency Contact & Legal */}
              <Accordion
                title="Providers, Emergency Contact & Legal (Optional)"
                expanded={isMetadataExpanded}
                toggle={() => setIsMetadataExpanded(!isMetadataExpanded)}
              >
                <div className="pt-3 space-y-4">
                  {/* PCP */}
                  <div>
                    <p
                      className={`text-xs font-semibold mb-2 ${isDark ? "text-zinc-400" : "text-gray-500"}`}
                    >
                      Primary Care Provider
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className={labelCls}>Provider Name</Label>
                        <Input
                          value={formData.pcp_name}
                          onChange={(e) =>
                            handleInputChange("pcp_name", e.target.value)
                          }
                          className={inputCls()}
                          placeholder="Dr. Smith"
                        />
                      </div>
                      <div>
                        <Label className={labelCls}>Practice Name</Label>
                        <Input
                          value={formData.pcp_clinic}
                          onChange={(e) =>
                            handleInputChange("pcp_clinic", e.target.value)
                          }
                          className={inputCls()}
                          placeholder="Medical Center"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Secondary Provider */}
                  <div>
                    <p
                      className={`text-xs font-semibold mb-2 ${isDark ? "text-zinc-400" : "text-gray-500"}`}
                    >
                      Secondary Care Provider
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className={labelCls}>Provider Name</Label>
                        <Input
                          value={formData.sec_name}
                          onChange={(e) =>
                            handleInputChange("sec_name", e.target.value)
                          }
                          className={inputCls()}
                          placeholder="Dr. Jones"
                        />
                      </div>
                      <div>
                        <Label className={labelCls}>Practice Name</Label>
                        <Input
                          value={formData.sec_clinic}
                          onChange={(e) =>
                            handleInputChange("sec_clinic", e.target.value)
                          }
                          className={inputCls()}
                          placeholder="Specialty Clinic"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Pharmacy */}
                  <div>
                    <Label className={labelCls}>Preferred Pharmacy</Label>
                    <Input
                      value={formData.pharmacy_name}
                      onChange={(e) =>
                        handleInputChange("pharmacy_name", e.target.value)
                      }
                      className={inputCls()}
                      placeholder="Pharmacy name"
                    />
                  </div>
                  {/* Emergency Contact */}
                  <div>
                    <p
                      className={`text-xs font-semibold mb-2 ${isDark ? "text-zinc-400" : "text-gray-500"}`}
                    >
                      Emergency Contact
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className={labelCls}>Contact Name</Label>
                        <Input
                          value={formData.emergency_name}
                          onChange={(e) =>
                            handleInputChange("emergency_name", e.target.value)
                          }
                          className={inputCls()}
                          placeholder="Emergency contact"
                        />
                        <p className={hintCls}>Encrypted at rest</p>
                      </div>
                      <div>
                        <Label className={labelCls}>Emergency Phone</Label>
                        <Input
                          value={formData.emergency_tel}
                          onChange={(e) =>
                            handleInputChange("emergency_tel", e.target.value)
                          }
                          className={inputCls()}
                          placeholder="Phone number"
                        />
                        <p className={hintCls}>Encrypted at rest</p>
                      </div>
                    </div>
                  </div>
                  {/* Advance Directive */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="adv_directive"
                      checked={formData.adv_directive}
                      onCheckedChange={(c) =>
                        handleInputChange("adv_directive", c as boolean)
                      }
                      className={isDark ? "border-zinc-600" : "border-gray-300"}
                    />
                    <Label
                      htmlFor="adv_directive"
                      className={`text-sm cursor-pointer ${labelCls}`}
                    >
                      Advance Directive on file
                    </Label>
                  </div>
                  {/* POA */}
                  <div>
                    <Label className={labelCls}>
                      Healthcare Proxy / POA Name
                    </Label>
                    <Input
                      value={formData.poa_name}
                      onChange={(e) =>
                        handleInputChange("poa_name", e.target.value)
                      }
                      className={inputCls()}
                      placeholder="Power of Attorney name"
                    />
                  </div>
                </div>
              </Accordion>
            </div>
          )}

          {/* ══ STEP 3: Create Task ══ */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <p
                className={`text-xs mb-2 ${isDark ? "text-zinc-500" : "text-gray-400"}`}
              >
                Optionally create a task for this patient. You can also skip and
                create the patient without a task.
              </p>

              {/* Task Title + Description */}
              <div>
                <Label className={labelCls}>Task Title</Label>
                <Input
                  value={formData.task_title}
                  onChange={(e) =>
                    handleInputChange("task_title", e.target.value)
                  }
                  className={inputCls()}
                  placeholder="Short task name"
                />
              </div>
              <div>
                <Label className={labelCls}>Task Description</Label>
                <Input
                  value={formData.task_description}
                  onChange={(e) =>
                    handleInputChange("task_description", e.target.value)
                  }
                  className={inputCls()}
                  placeholder="Describe the task"
                />
              </div>

              {/* Assign + Task Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className={labelCls}>
                    Assign to <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.task_assign_to}
                    onValueChange={(v) =>
                      handleInputChange("task_assign_to", v)
                    }
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem className={selectItemCls} value="Unassigned">
                        Unassigned
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Dr. Smith">
                        Dr. Smith
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Dr. Johnson">
                        Dr. Johnson
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Nurse Davis">
                        Nurse Davis
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={labelCls}>
                    Task <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.task_name}
                    onValueChange={(v) => handleInputChange("task_name", v)}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue placeholder="Select task" />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem
                        className={selectItemCls}
                        value="Initial Assessment"
                      >
                        Initial Assessment
                      </SelectItem>
                      <SelectItem
                        className={selectItemCls}
                        value="Follow-up Visit"
                      >
                        Follow-up Visit
                      </SelectItem>
                      <SelectItem
                        className={selectItemCls}
                        value="OASIS Completion"
                      >
                        OASIS Completion
                      </SelectItem>
                      <SelectItem
                        className={selectItemCls}
                        value="Care Plan Review"
                      >
                        Care Plan Review
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Task Type + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className={labelCls}>
                    Task Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.task_type}
                    onValueChange={(v) => handleInputChange("task_type", v)}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem className={selectItemCls} value="Assessment">
                        Assessment
                      </SelectItem>
                      <SelectItem
                        className={selectItemCls}
                        value="Documentation"
                      >
                        Documentation
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Visit">
                        Visit
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Review">
                        Review
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={labelCls}>
                    Status <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.task_status}
                    onValueChange={(v) => handleInputChange("task_status", v)}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem className={selectItemCls} value="Assigned">
                        Assigned
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="In Progress">
                        In Progress
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="Completed">
                        Completed
                      </SelectItem>
                      <SelectItem className={selectItemCls} value="On Hold">
                        On Hold
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start Date + Duration + End Date */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className={labelCls}>
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className={inputCls()}
                  />
                </div>
                <div>
                  <Label className={labelCls}>
                    Duration (Days) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.duration_days}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    className={inputCls()}
                  />
                </div>
                <div>
                  <Label className={labelCls}>End Date</Label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    readOnly
                    className={inputCls()}
                  />
                </div>
              </div>

              {/* OASIS Date + Completed Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className={labelCls}>
                    OASIS Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.oasis_date}
                    onChange={(e) =>
                      handleInputChange("oasis_date", e.target.value)
                    }
                    className={inputCls()}
                  />
                </div>
                <div>
                  <Label className={labelCls}>Completed Date</Label>
                  <Input
                    type="date"
                    value={formData.completed_date}
                    onChange={(e) =>
                      handleInputChange("completed_date", e.target.value)
                    }
                    className={inputCls()}
                  />
                </div>
              </div>

              {/* OASIS File */}
              <div>
                <Label className={labelCls}>OASIS File</Label>
                <label
                  htmlFor="oasis_file"
                  className={`mt-1 flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg cursor-pointer transition-colors ${
                    isDark
                      ? "border-zinc-700 hover:border-zinc-500 bg-zinc-800"
                      : "border-gray-300 hover:border-gray-400 bg-gray-50"
                  }`}
                >
                  <Upload
                    className={`w-4 h-4 ${isDark ? "text-zinc-400" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-500"}`}
                  >
                    {oasisFile ? oasisFile.name : "Upload OASIS file"}
                  </span>
                </label>
                <input
                  id="oasis_file"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setOasisFile(e.target.files[0]);
                  }}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-t ${isDark ? "border-zinc-800" : "border-gray-200"}`}
        >
          {/* Left — Back / Cancel */}
          <div>
            {currentStep === 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className={
                  isDark
                    ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    : ""
                }
              >
                Cancel
              </Button>
            )}
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((s) => s - 1)}
                className={
                  isDark
                    ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    : ""
                }
              >
                ← Back
              </Button>
            )}
          </div>

          {/* Right — actions */}
          <div className="flex gap-2">
            {/* Step 1: Create Patient Only */}
            {currentStep === 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCreatePatientOnly}
                className={
                  isDark
                    ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    : ""
                }
              >
                Create Patient Only
              </Button>
            )}
            {/* Step 2: Skip for now */}
            {currentStep === 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(3)}
                className={
                  isDark
                    ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    : ""
                }
              >
                Skip for now
              </Button>
            )}
            {/* Step 3: Create Patient Only (no task) */}
            {currentStep === 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCreatePatientOnly}
                className={
                  isDark
                    ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    : ""
                }
              >
                Create Patient Only
              </Button>
            )}
            {/* Steps 1 & 2: Continue */}
            {currentStep < 3 && (
              <Button
                type="button"
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue →
              </Button>
            )}
            {/* Step 3: Create with Task */}
            {currentStep === 3 && (
              <Button
                type="button"
                onClick={() => handleSubmit()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Patient & Task
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
