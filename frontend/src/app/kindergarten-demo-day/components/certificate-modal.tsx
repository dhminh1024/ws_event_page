import React, { PropsWithChildren } from "react";
import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogTitle,
} from "@atoms/custom-dialog";
import { Input } from "@atoms/input";
import { Label } from "@atoms/label";
import { cn } from "@/core/utils/shadcn-utils";
import { Button } from "@atoms/button";
import { useEventVisit } from "../api/use-event-visit";
import { useSubmitRegistration } from "../api/use-submit-registration";
import { Combobox } from "@atoms/combobox";
import { useSearchParams } from "react-router-dom";
import { parseDate } from "@/core/utils/common";

import { useLocales } from "@/core/hooks/use-locales";

export type CertificateModalProps = PropsWithChildren & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const CertificateModal: React.FC<CertificateModalProps> = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
}) => {
  const { t } = useLocales();

  // Internal state management for uncontrolled usage
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange = controlledOnOpenChange || setInternalOpen;
  const [formData, setFormData] = React.useState({
    parentFullName: "",
    parentEmail: "",
    parentPhone: "",
    studentFullName: "",
    studentDateOfBirth: "",
    rating: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [hoveredStar, setHoveredStar] = React.useState<number>(0);
  const [dateDisplay, setDateDisplay] = React.useState<string>("");
  const eventName = searchParams.get("event") || undefined;
  const { eventVisit } = useEventVisit(eventName);
  const { submitRegistration, loading } = useSubmitRegistration();

  const studentList = eventVisit?.registered_students || [];

  // Convert student list to combobox format
  const studentOptions = React.useMemo(() => {
    return studentList.map((student) => ({
      label: student.student_full_name,
      value: student.student_full_name,
    }));
  }, [studentList]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleStudentSelect = (studentName: string) => {
    // Update student name
    handleChange("studentFullName", studentName);

    // // Clear date of birth when student changes
    // setDateDisplay("");
    // setFormData((prev) => ({ ...prev, studentDateOfBirth: "" }));

    // // Clear any existing DOB errors
    // if (errors.studentDateOfBirth) {
    //   setErrors((prev) => ({ ...prev, studentDateOfBirth: "" }));
    // }
  };

  const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Auto re-format date by dd/MM/yyyy on blur
    const parts = input.split(/\/|-|\./);
    let formatted = input;
    if (parts.length === 3) {
      let day = parts[0].padStart(2, "0").slice(0, 2);
      let month = parts[1].padStart(2, "0").slice(0, 2);
      let year = parts[2].padStart(4, "0").slice(0, 4);
      formatted = `${day}/${month}/${year}`;
      setDateDisplay(formatted);
      setFormData((prev) => ({
        ...prev,
        studentDateOfBirth: `${year}-${month}-${day}`,
      }));
    }
    // Auto add 10081998 -> 10/08/1998
    else if (/^\d{8}$/.test(input)) {
      let day = input.slice(0, 2);
      let month = input.slice(2, 4);
      let year = input.slice(4, 8);
      formatted = `${day}/${month}/${year}`;
      setDateDisplay(formatted);
      setFormData((prev) => ({
        ...prev,
        studentDateOfBirth: `${year}-${month}-${day}`,
      }));
    }

    // Validate with database
    // Validate against selected student's DOB
    if (formData.studentFullName) {
      const selectedStudent = studentList.find(
        (student) => student.student_full_name === formData.studentFullName
      );

      if (selectedStudent?.student_dob) {
        const studentDOB = selectedStudent.student_dob;
        console.log(
          parseDate(formatted, "dd/MM/yyyy").getTime(),
          parseDate(studentDOB, "yyyy-MM-dd").getTime()
        );

        if (
          parseDate(formatted, "dd/MM/yyyy").getTime() !==
          parseDate(studentDOB, "yyyy-MM-dd").getTime()
        ) {
          setErrors((prev) => ({
            ...prev,
            studentDateOfBirth: t("kindergarten_demo_day.error_dob_mismatch"),
          }));
        } else {
          // Clear error if date matches
          if (errors.studentDateOfBirth) {
            setErrors((prev) => ({ ...prev, studentDateOfBirth: "" }));
          }
        }
      } else {
        // Clear error if no DOB on record to verify against
        if (errors.studentDateOfBirth) {
          setErrors((prev) => ({ ...prev, studentDateOfBirth: "" }));
        }
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Format input as dd/mm/yyyy
    setDateDisplay(input);
    setFormData((prev) => ({ ...prev, studentDateOfBirth: input }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.parentFullName.trim()) {
      newErrors.parentFullName = t("kindergarten_demo_day.error_parent_name_required");
    }

    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = t("kindergarten_demo_day.error_email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = t("kindergarten_demo_day.error_email_invalid");
    }

    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = t("kindergarten_demo_day.error_phone_required");
    }

    if (!formData.studentFullName.trim()) {
      newErrors.studentFullName = t("kindergarten_demo_day.error_student_name_required");
    }

    if (!formData.studentDateOfBirth) {
      newErrors.studentDateOfBirth = t("kindergarten_demo_day.error_dob_required");
    } else {
      // Verify date of birth matches student record
      const selectedStudent = studentList.find(
        (student) => student.student_full_name === formData.studentFullName
      );

      if (selectedStudent?.student_dob) {
        if (formData.studentDateOfBirth !== selectedStudent.student_dob) {
          newErrors.studentDateOfBirth = t("kindergarten_demo_day.error_dob_mismatch");
        }
      }
    }

    if (formData.rating === 0) {
      newErrors.rating = t("kindergarten_demo_day.error_rating_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Focus the first field with error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const fieldMap: Record<string, string> = {
          studentFullName: "studentFullName",
          studentDateOfBirth: "studentDateOfBirth",
          parentFullName: "parentFullName",
          parentEmail: "parentEmail",
          parentPhone: "parentPhone",
          rating: "rating",
        };

        const fieldId = fieldMap[firstErrorField];
        if (fieldId) {
          // Small delay to ensure error state is rendered
          setTimeout(() => {
            const element = document.getElementById(fieldId);
            if (element) {
              element.focus();
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 100);
        }
      }
      return;
    }

    if (!eventName) {
      setErrors({ general: t("kindergarten_demo_day.error_event_not_found") });
      return;
    }

    try {
      const result = await submitRegistration({
        visit_event: eventName,
        student_full_name: formData.studentFullName,
        student_dob: formData.studentDateOfBirth,
        parent_full_name: formData.parentFullName,
        parent_email: formData.parentEmail,
        parent_phone_number: formData.parentPhone,
        rating: formData.rating,
      });

      if (result?.success && result.data?.certificate_url) {
        // Close modal
        onOpenChange?.(false);
        setSearchParams({
          event: eventName,
          certificate_token: result.data.certificate_token,
        });
      } else {
        setErrors({
          general:
            result?.message ||
            t("kindergarten_demo_day.error_registration_failed"),
        });
      }
    } catch (error) {
      console.error("Registration submission error:", error);
      setErrors({
        general: t("kindergarten_demo_day.error_unexpected"),
      });
    }
  };

  return (
    <>
      {/* Trigger */}
      <div onClick={() => onOpenChange?.(true)}>{children}</div>

      {/* Dialog */}
      <CustomDialog
        open={open || false}
        onOpenChange={onOpenChange || (() => {})}
        disableOutsideClick={true}
      >
        <CustomDialogContent
          className="w-full max-w-[768px] relative bg-white rounded-2xl border-0 shadow-2xl p-0 gap-0 overflow-hidden"
          hideCloseButton={false}
          onClose={() => onOpenChange?.(false)}
        >
          <div className="h-full flex flex-col">
            {/* Header Section */}
            <CustomDialogHeader className="bg-kdd-primary/10 p-4 md:p-8 space-y-2">
              <CustomDialogTitle className="text-xl md:text-3xl font-bold text-kdd-text text-center tracking-tight">
                {t("kindergarten_demo_day.modal_title")}
              </CustomDialogTitle>
              <p className="text-kdd-text-secondary text-center text-xs md:text-sm font-medium">
                {t("kindergarten_demo_day.modal_description")}
              </p>
            </CustomDialogHeader>

            <form onSubmit={handleSubmit} className="flex-1 ">
              <div className="flex-1 p-4 md:p-8 max-h-[65vh] overflow-x-hidden space-y-2">
                {/* Student Information Section */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-lg font-bold text-kdd-text pb-2 border-b border-gray-100">
                    {t("kindergarten_demo_day.section_student_info")}
                  </h3>

                  {/* Student's Full Name - Searchable Select */}
                  <div className="space-y-2">
                    <Label className="text-kdd-text font-semibold text-sm">
                      {t("kindergarten_demo_day.label_student_name")} <span className="text-destructive">*</span>
                    </Label>
                    {/* <Combobox options={studentOptions} /> */}
                    <Combobox
                      items={studentOptions}
                      value={formData.studentFullName}
                      onSelect={handleStudentSelect}
                      placeholder={t("kindergarten_demo_day.placeholder_student_name")}
                      searchPlaceholder={t("kindergarten_demo_day.placeholder_search")}
                      emptyContent={t("kindergarten_demo_day.empty_student")}
                      className={cn(
                        "h-12 w-full text-base border-gray-200 focus:border-kdd-primary rounded-lg transition-all duration-200 bg-slate-100 hover:bg-white",
                        errors.studentFullName &&
                          "border-kdd-primary bg-red-50/30"
                      )}
                    />
                    {errors.studentFullName && (
                      <p className="text-kdd-primary text-sm font-medium flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.studentFullName}
                      </p>
                    )}
                  </div>

                  {/* Student's Date of Birth */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="studentDateOfBirth"
                      className="text-kdd-text font-semibold text-sm"
                    >
                      {t("kindergarten_demo_day.label_student_dob")} <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {t("kindergarten_demo_day.label_dob_example")}
                    </p>
                    <Input
                      id="studentDateOfBirth"
                      type="text"
                      value={dateDisplay}
                      onChange={handleDateChange}
                      onBlur={handleBlurChange}
                      className={cn(
                        "h-12 text-base border-gray-200 focus:border-kdd-primary focus:ring-kdd-primary rounded-lg transition-all duration-200 bg-gray-50/50 focus:bg-white",
                        errors.studentDateOfBirth &&
                          "border-kdd-primary bg-red-50/30"
                      )}
                      placeholder={t("kindergarten_demo_day.placeholder_dob")}
                      maxLength={10}
                    />
                    {formData.studentFullName &&
                      formData.studentDateOfBirth &&
                      !errors.studentDateOfBirth &&
                      dateDisplay.length === 10 && (
                        <p className="text-green-600 text-xs flex items-center gap-1.5">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {t("kindergarten_demo_day.date_verified")}
                        </p>
                      )}
                    {errors.studentDateOfBirth && (
                      <p className="text-kdd-primary text-sm font-medium flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.studentDateOfBirth}
                      </p>
                    )}
                  </div>
                </div>

                {/* Parent Information Section */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-kdd-text pb-2 border-b border-gray-100">
                    {t("kindergarten_demo_day.section_parent_info")}
                  </h3>

                  {/* Parent's Full Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="parentFullName"
                      className="text-kdd-text font-semibold text-sm"
                    >
                      {t("kindergarten_demo_day.label_parent_name")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="parentFullName"
                      type="text"
                      value={formData.parentFullName}
                      onChange={(e) =>
                        handleChange("parentFullName", e.target.value)
                      }
                      className={cn(
                        "h-12 text-base border-gray-200 focus:border-kdd-primary focus:ring-kdd-primary rounded-lg transition-all duration-200 bg-gray-50/50 focus:bg-white",
                        errors.parentFullName &&
                          "border-kdd-primary bg-red-50/30"
                      )}
                      placeholder={t("kindergarten_demo_day.placeholder_parent_name")}
                    />
                    {errors.parentFullName && (
                      <p className="text-kdd-primary text-sm font-medium flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.parentFullName}
                      </p>
                    )}
                  </div>

                  {/* Parent's Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="parentEmail"
                      className="text-kdd-text font-semibold text-sm"
                    >
                      {t("kindergarten_demo_day.label_parent_email")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) =>
                        handleChange("parentEmail", e.target.value)
                      }
                      className={cn(
                        "h-12 text-base border-gray-200 focus:border-kdd-primary focus:ring-kdd-primary rounded-lg transition-all duration-200 bg-gray-50/50 focus:bg-white",
                        errors.parentEmail && "border-kdd-primary bg-red-50/30"
                      )}
                      placeholder={t("kindergarten_demo_day.placeholder_parent_email")}
                    />
                    {errors.parentEmail && (
                      <p className="text-kdd-primary text-sm font-medium flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.parentEmail}
                      </p>
                    )}
                  </div>

                  {/* Parent's Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="parentPhone"
                      className="text-kdd-text font-semibold text-sm"
                    >
                      {t("kindergarten_demo_day.label_parent_phone")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) =>
                        handleChange("parentPhone", e.target.value)
                      }
                      className={cn(
                        "h-12 text-base border-gray-200 focus:border-kdd-primary focus:ring-kdd-primary rounded-lg transition-all duration-200 bg-gray-50/50 focus:bg-white",
                        errors.parentPhone && "border-kdd-primary bg-red-50/30"
                      )}
                      placeholder={t("kindergarten_demo_day.placeholder_parent_phone")}
                    />
                    {errors.parentPhone && (
                      <p className="text-kdd-primary text-sm font-medium flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.parentPhone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating Section */}
                <div className="space-y-5 pt-2">
                  {/* Rating Stars */}
                  <div className="space-y-3">
                    <Label className="text-kdd-text font-semibold text-sm">
                      {t("kindergarten_demo_day.label_rating")}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex justify-center gap-4 py-4">
                      {[
                        { value: 1, emoji: "😢", label: t("kindergarten_demo_day.rating_poor") },
                        { value: 2, emoji: "😕", label: t("kindergarten_demo_day.rating_fair") },
                        { value: 3, emoji: "😊", label: t("kindergarten_demo_day.rating_good") },
                        { value: 4, emoji: "😍", label: t("kindergarten_demo_day.rating_great") },
                        { value: 5, emoji: "🤩", label: t("kindergarten_demo_day.rating_amazing") },
                      ].map((rating) => {
                        const isActive = rating.value === formData.rating;
                        const isHovered = rating.value === hoveredStar;
                        return (
                          <button
                            key={rating.value}
                            type="button"
                            onClick={() => {
                              handleChange("rating", rating.value.toString());
                              setFormData((prev) => ({
                                ...prev,
                                rating: rating.value,
                              }));
                            }}
                            onMouseEnter={() => setHoveredStar(rating.value)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className={cn(
                              "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-kdd-primary focus:ring-offset-2",
                              isActive
                                ? "bg-kdd-primary/10 scale-110 -translate-y-1"
                                : "hover:bg-gray-100 hover:scale-105"
                            )}
                            aria-label={`Rate ${rating.label}`}
                          >
                            <span
                              className={cn(
                                "text-2xl leading-none transition-all duration-200",
                                isActive || isHovered
                                  ? "scale-110"
                                  : "scale-100 grayscale opacity-40"
                              )}
                            >
                              {rating.emoji}
                            </span>
                            <span
                              className={cn(
                                "text-xs font-semibold transition-colors duration-200",
                                isActive
                                  ? "text-kdd-primary"
                                  : isHovered
                                  ? "text-kdd-text"
                                  : "text-kdd-text-secondary"
                              )}
                            >
                              {rating.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.rating && (
                      <p className="text-kdd-primary text-sm font-medium flex items-center gap-1.5 justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.rating}
                      </p>
                    )}
                  </div>
                </div>

                {/* General Error Message */}
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm font-medium flex items-start gap-2">
                      <svg
                        className="w-5 h-5 shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{errors.general}</span>
                    </p>
                  </div>
                )}
              </div>
              {/* Submit Button */}
              <div className="pt-6 p-4 md:p-8 pt-0!">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 text-base font-bold bg-kdd-primary hover:bg-kdd-primary-hover text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("kindergarten_demo_day.button_submitting")}
                    </span>
                  ) : (
                    t("kindergarten_demo_day.button_submit")
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange?.(false)}
                  className="w-full h-14 text-base font-medium text-kdd-text-secondary hover:text-kdd-text rounded-xl transition-all duration-200 mt-3"
                >
                  {t("kindergarten_demo_day.button_cancel")}
                </Button>
              </div>
            </form>

            {/* Form Section */}
          </div>
        </CustomDialogContent>
      </CustomDialog>
    </>
  );
};
