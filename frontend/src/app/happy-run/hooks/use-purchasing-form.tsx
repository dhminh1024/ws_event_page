import { useLocales } from "@/core/hooks/use-locales";

import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { zodResolver } from "@hookform/resolvers/zod";
import { FrappeError } from "frappe-react-sdk";
import { has, size } from "lodash";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCheckUserByCode from "../api/use-check-user-by-code";
import { log } from "node:console";

export const usePurchasingForm = () => {
  const { t, currentLanguage } = useLocales();
  const [error, setError] = useState<FrappeError | null>(null);
  const { getInfo } = useCheckUserByCode();

  const validationSchema = z.object({
    primary_runners: z
      .array(
        z.object({
          code: z
            .string()
            .min(1, t("happy_run.form.user_code_required"))
            .refine(
              async (code) => {
                if (!code) return true;
                console.log("CODE", code);
                try {
                  await getInfo({
                    wellspring_code: code,
                  });
                  return true;
                } catch (error) {
                  console.log("INVALID");

                  return false;
                }
              },
              { message: t("happy_run.form.user_code_invalid") }
            ),
          full_name: z.string(),
          department: z.string(),
          ticket_class: z
            .string()
            .min(1, t("happy_run.form.ticket_class_required")),
          distance: z
            .string()
            .min(1, t("happy_run.form.ticket_distance_required")),
          size: z.string().min(1, t("happy_run.form.shirt_size_required")),
          bib: z.string().optional(),
        })
      )
      .superRefine((items, ctx) => {
        const hashMap: Record<string, number> = {};
        items.map((item, index) => {
          const code = item.code.trim().toLowerCase();

          hashMap[code] = hashMap[code] ? hashMap[code] + 1 : 1;
          if (hashMap[code] > 1) {
            ctx.addIssue({
              code: "custom",
              message: t("happy_run.form.user_code_duplicate"),
              path: [`${index}.code`],
            });
          }
        });
        // const hashMap = items.reduce(
        //   (prev: Record<string, boolean>, item) => {
        //     if (item.code && item.full_name)
        //       prev[item.code.trim().toLowerCase()] = true;
        //     return prev;
        //   },
        //   {}
        // );

        // if (
        //   Object.keys(hashMap).length !==
        //   items.filter((i) => i.code && i.full_name).length
        // ) {
        //   // return false;

        // }
        // return true;
      }),
    guardian_runners: z.array(
      z.object({
        full_name: z.string(),
        ticket_class: z
          .string()
          .min(1, t("happy_run.form.ticket_class_required")),
        distance: z
          .string()
          .min(1, t("happy_run.form.ticket_distance_required")),
        size: z.string().min(1, t("happy_run.form.shirt_size_required")),
        bib: z.string().optional(),
      })
    ),
    full_name: z
      .string({
        required_error: t("happy_run.form.full_name_required"),
      })
      .min(1, t("happy_run.form.full_name_required")),
    mobile_number: z
      .string({
        required_error: t("happy_run.form.mobile_number_required"),
      })
      .min(1, t("happy_run.form.mobile_number_required")),
    email: z
      .string({ required_error: t("happy_run.form.email_required") })
      .min(1, t("happy_run.form.email_required"))
      .email(t("happy_run.form.email_invalid")),
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      primary_runners: [
        {
          code: "",
          ticket_class: "",
          distance: "",
          size: "",
        },
      ],
      guardian_runners: [],
      full_name: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: any) => {
    try {
      //   console.log(typeof login);
      //   const res = await login(data.wellspringCode);
      return Promise.resolve(true);
    } catch (error: any) {
      setError(error);
      return Promise.reject(error);
    }
  };

  const reset = () => {
    setError(null);
    form.reset();
  };

  return {
    form,
    error,
    handleSubmit,
    reset,
  };
};
