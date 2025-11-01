import { useLocales } from "@/core/hooks/use-locales";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ENTRY_CATEGORY_VALUES = [
  "singing",
  "dancing",
  "instrument",
  "talent",
] as const;

export type EntryCategory = (typeof ENTRY_CATEGORY_VALUES)[number];

const MAX_ENTRY_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const useRegisterForm = () => {
  const { t } = useLocales();

  const schema = z
    .object({
      entry_group: z
        .string()
        .trim()
        .min(1, t("greatest_show_25.form.group_required")),
      entry_name: z
        .string()
        .trim()
        .min(1, t("greatest_show_25.form.entry_name_required")),
      entry_category: z
        .string()
        .trim()
        .min(1, t("greatest_show_25.form.entry_category_required")),
      instrumental_info: z.string().trim().optional(),
      talent_info: z.string().trim().optional(),
      entry_participants: z
        .array(z.string().trim().min(1, "Name is required"))
        .min(1, t("greatest_show_25.form.entry_participants_required"))
        .max(25, t("greatest_show_25.form.entry_participants_max"))
        .refine(
          (participants) => participants.some((p) => p.trim().length > 0),
          t("greatest_show_25.form.entry_participants_required")
        ),
      entry_file: z
        .any()
        .refine((file) => {
          if (!file || typeof File === "undefined" || !(file instanceof File)) {
            return true;
          }
          return file instanceof File;
        }, t("greatest_show_25.form.entry_file_invalid"))
        .refine((file) => {
          if (!file || typeof File === "undefined" || !(file instanceof File)) {
            return true;
          }
          return file.size <= MAX_ENTRY_FILE_SIZE;
        }, t("greatest_show_25.form.entry_file_too_large")),
      full_name: z
        .string()
        .trim()
        .min(1, t("greatest_show_25.form.full_name_required")),
      mobile_number: z
        .string()
        .trim()
        .min(1, t("greatest_show_25.form.mobile_number_required")),
      email: z
        .string()
        .trim()
        .min(1, t("greatest_show_25.form.email_required"))
        .email(t("greatest_show_25.form.email_invalid")),
    })
    .superRefine((data, ctx) => {
      if (
        data.entry_category === "instrument" &&
        !data.instrumental_info?.trim()
      ) {
        ctx.addIssue({
          code: "custom",
          message: t("greatest_show_25.form.instrument_info_required"),
          path: ["instrumental_info"],
        });
      }

      if (data.entry_category === "talent" && !data.talent_info?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: t("greatest_show_25.form.entry_talent_required"),
          path: ["talent_info"],
        });
      }
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      entry_group: "",
      entry_name: "",
      entry_category: "",
      instrumental_info: "",
      talent_info: "",
      entry_participants: [""],
      entry_file: undefined,
      full_name: "",
      mobile_number: "",
      email: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return { form };
};
