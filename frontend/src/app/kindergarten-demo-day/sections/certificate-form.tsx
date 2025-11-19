import { HTMLAttributes, type FC, useState } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import { Container } from "../components/container";
import { Heading, Text } from "../components/typography";
import { PrimaryButton } from "../components/button";
import { CertificateModal } from "../components/modals/certificate-modal";
import { useNavigate } from "react-router-dom";
import { EVENT_PAGES } from "@/config/event-pages";
import { Input } from "../components/input";

export type CertificateFormProps = HTMLAttributes<HTMLDivElement> & {};

export const CertificateForm: FC<CertificateFormProps> = ({ className }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentFullName: "",
    parentEmail: "",
    parentPhone: "",
    studentFullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.parentFullName.trim()) {
      newErrors.parentFullName = "Parent's full name is required";
    }

    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = "Please enter a valid email address";
    }

    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = "Phone number is required";
    }

    if (!formData.studentFullName.trim()) {
      newErrors.studentFullName = "Student's full name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const encodedName = encodeURIComponent(formData.studentFullName.trim());
      navigate(
        `/${EVENT_PAGES.KINDERGARTEN_DEMO_DAY.SITE_URL}/certificate/${encodedName}`
      );
    }
  };

  return (
    <div className={cn("", className)}>
      <form
        onSubmit={handleSubmit}
        className="space-y-[5rem] p-[10rem] mt-[5rem]"
      >
        {/* Parent's Full Name */}
        <div>
          <label
            htmlFor="parentFullName"
            className="text-kdd-text text-[14rem] text-[14rem]"
          >
            Parent's Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="parentFullName"
            type="text"
            value={formData.parentFullName}
            onChange={(e) => handleChange("parentFullName", e.target.value)}
            className={cn(
              "mt-[1.25rem] text-[14rem] height-[40rem]",
              errors.parentFullName && "border-red-500"
            )}
            placeholder="Enter parent's full name"
          />
          {errors.parentFullName && (
            <p className="text-red-500 text-[4.375rem] mt-[1.25rem]">
              {errors.parentFullName}
            </p>
          )}
        </div>

        {/* Parent's Email */}
        <div>
          <label htmlFor="parentEmail" className="text-kdd-text text-[14rem]">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="parentEmail"
            type="email"
            value={formData.parentEmail}
            onChange={(e) => handleChange("parentEmail", e.target.value)}
            className={cn(
              "mt-[1.25rem]",
              errors.parentEmail && "border-red-500"
            )}
            placeholder="Enter email address"
          />
          {errors.parentEmail && (
            <p className="text-red-500 text-[4.375rem] mt-[1.25rem]">
              {errors.parentEmail}
            </p>
          )}
        </div>

        {/* Parent's Phone */}
        <div>
          <label htmlFor="parentPhone" className="text-kdd-text text-[14rem]">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="parentPhone"
            type="tel"
            value={formData.parentPhone}
            onChange={(e) => handleChange("parentPhone", e.target.value)}
            className={cn(
              "mt-[1.25rem]",
              errors.parentPhone && "border-red-500"
            )}
            placeholder="Enter phone number"
          />
          {errors.parentPhone && (
            <p className="text-red-500 text-[4.375rem] mt-[1.25rem]">
              {errors.parentPhone}
            </p>
          )}
        </div>

        {/* Student's Full Name */}
        <div>
          <label
            htmlFor="studentFullName"
            className="text-kdd-text text-[14rem]"
          >
            Student's Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="studentFullName"
            type="text"
            value={formData.studentFullName}
            onChange={(e) => handleChange("studentFullName", e.target.value)}
            className={cn(
              "mt-[1.25rem]",
              errors.studentFullName && "border-red-500"
            )}
            placeholder="Enter student's full name"
          />
          {errors.studentFullName && (
            <p className="text-red-500 text-[4.375rem] mt-[1.25rem]">
              {errors.studentFullName}
            </p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-[5rem] pt-[5rem]">
          <PrimaryButton type="submit" className="flex-1" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
