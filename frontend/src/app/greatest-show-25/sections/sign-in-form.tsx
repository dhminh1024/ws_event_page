import clsx from "clsx";
import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@atoms/form";
import { Input } from "@atoms/input";
import { Button } from "@atoms/button";
import { Loader2 } from "lucide-react";
import AlertStatus, { AlertContentType } from "@molecules/alert-status";
import { Link } from "react-router-dom";
import { InputPassword } from "@molecules/input-password";
import { useSignInForm } from "../hooks/use-sign-in-form";
import { useLocales } from "@/core/hooks/use-locales";

type Props = HTMLAttributes<HTMLDivElement> & {};

const SignInForm = forwardRef<HTMLFormElement, Props>(({ className }, ref) => {
  const { t } = useLocales();
  const [alert, setAlert] = useState<AlertContentType>();

  const { form, error, handleSubmit } = useSignInForm();

  // useEffect(() => {
  //   if (error?.message) {
  //     setAlert({
  //       type: 'error',
  //       message: 'Something wrong!',
  //       desc: error.message,
  //     })
  //   }
  // }, [JSON.stringify(error)])

  return (
    <div className={clsx("max-w-full", className)}>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="wellspringCode"
            render={({ field, formState: { isSubmitting } }) => (
              <FormItem>
                <FormLabel
                  htmlFor="input-wellspring-code"
                  className="text-white"
                >
                  {t("components.inputs.email.label")}
                  <span className="ml-0.5 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-wellspring-code"
                    className="border-white/20  text-white"
                    disabled={isSubmitting}
                    autoCapitalize="none"
                    placeholder={t("components.inputs.email.placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <p className="text-destructive">
              {t("components.notification.sign_in_failed.description")}
            </p>
          )}

          <Button
            className="bg-brand-orange font-bold  uppercase text-white hover:bg-brand-orange/90"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {t("components.buttons.sign_in")}
          </Button>
        </form>
      </Form>
    </div>
  );
});

export default SignInForm;
