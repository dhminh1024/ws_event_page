import { useLocales } from "@/core/hooks/use-locales";

import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { zodResolver } from "@hookform/resolvers/zod";
import { FrappeError } from "frappe-react-sdk";
import { size } from "lodash";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";



export const usePurchasingForm = () => {
  const { t, currentLanguage } = useLocales();
  const [error, setError] = useState<FrappeError | null>(null);

  const validationSchema = z.object({
    runners: z.array(
      z.object({
        code: z.string(),
        full_name: z.string(),
        department: z.string(),
        ticket_class: z.string().min(1),
        distance: z.string(),
        size: z.string(),
      })
    ),
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      runners: [
        {
          code: "",
          ticket_class: "",
          distance: "",
          size: "",
        },
      ],
    },
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
