import { useLocales } from "@/core/hooks/use-locales";

import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { zodResolver } from "@hookform/resolvers/zod";
import { FrappeError } from "frappe-react-sdk";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const useSignInForm = () => {
  const { t, currentLanguage } = useLocales();
  const [error, setError] = useState<FrappeError | null>(null);
  const { login } = useAuthWSCode();

  const validationSchema = useMemo(
    () =>
      z.object({
        wellspringCode: z
          .string()
          .trim()
          .min(1, { message: t("components.inputs.email.err_required") }),
      }),
    [t]
  );

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      wellspringCode: "",
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      console.log(typeof login)
      const res = await login(data.wellspringCode);
      return Promise.resolve(res);
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
