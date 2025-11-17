import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@atoms/dialog";
import { Input } from "@atoms/input";
import { Label } from "@atoms/label";
import { PrimaryButton, SecondaryButton } from "../button";
import { cn } from "@/core/utils/shadcn-utils";

export type CertificateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    parentFullName: string;
    parentEmail: string;
    parentPhone: string;
    studentFullName: string;
  }) => void;
  loading?: boolean;
};

export const CertificateModal: React.FC<CertificateModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = React.useState({
    parentFullName: "",
    parentEmail: "",
    parentPhone: "",
    studentFullName: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

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
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1024px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[20rem] font-bold text-kdd-primary text-center">
            Certificate Request
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-[5rem] p-[10rem] mt-[5rem]"
        >
          {/* Parent's Full Name */}
          <div>
            <Label
              htmlFor="parentFullName"
              className="text-kdd-text text-[14rem] text-[14rem]"
            >
              Parent's Full Name <span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="parentEmail" className="text-kdd-text text-[14rem]">
              Email <span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="parentPhone" className="text-kdd-text text-[14rem]">
              Phone Number <span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="studentFullName" className="text-kdd-text text-[14rem]">
              Student's Full Name <span className="text-red-500">*</span>
            </Label>
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
      </DialogContent>
    </Dialog>
  );
};
