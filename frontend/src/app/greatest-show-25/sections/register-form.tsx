import {
  HTMLAttributes,
  useEffect,
  useId,
  useMemo,
  useRef,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useRegisterForm } from "../hooks/use-register-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@atoms/form";
import { Input } from "@atoms/input";
import { useLocales } from "@/core/hooks/use-locales";
import Typography from "@/app/happy-box/components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import parser from "html-react-parser";
import { PrimaryButton } from "../components/button";
import { LanguageSelector } from "../components/language-selector";
import { RadioGroup, RadioGroupItem } from "@atoms/radio-group";
import useCheckTicketsCount from "@/app/happy-run/api/use-check-tickets-count";
import useRegistration from "../api/use-registration";

export type RegisterFormProps = HTMLAttributes<HTMLDivElement>;

export const RegisterForm: FC<RegisterFormProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const { form } = useRegisterForm();
  const event = useEventPageContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputId = useId();
  const { submit: submitRegistration } = useRegistration();

  const groupOptions = useMemo(
    () => [
      {
        value: "primary",
        label: t("greatest_show_25.form.group_items.primary_students"),
      },
      {
        value: "secondary",
        label: t("greatest_show_25.form.group_items.secondary_students"),
      },
      {
        value: "parent_teacher_staff",
        label: t("greatest_show_25.form.group_items.parent_teacher_staff"),
      },
    ],
    [currentLanguage]
  );

  const entryCategories = useMemo(
    () => [
      {
        value: "singing",
        label: t("greatest_show_25.form.entry_categories.singing"),
      },
      {
        value: "dancing",
        label: t("greatest_show_25.form.entry_categories.dancing"),
      },
      {
        value: "instrument",
        label: t("greatest_show_25.form.entry_categories.instrument"),
      },
      {
        value: "talent",
        label: t("greatest_show_25.form.entry_categories.talent"),
      },
    ],
    [currentLanguage]
  );

  const entryCategory = form.watch("entry_category");

  useEffect(() => {
    if (entryCategory !== "instrument") {
      form.setValue("instrument_info", "");
      form.clearErrors("instrument_info");
    }
    if (entryCategory !== "talent") {
      form.setValue("talent_info", "");
      form.clearErrors("talent_info");
    }
  }, [entryCategory, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("register-form submission", data);
    try {
      await submitRegistration(data);
    } catch (error) {
      console.error("Registration submission error:", error);
    }
  });

  return (
    <div className={cn("mb-[40rem]", className)}>
      <section className="form-section px-[20rem] md:px-[8%]">
        <center className="mb-[30rem] md:mb-[40rem]">
          <Typography.Heading
            className="pt-[20rem] md:pt-[40rem] text-[20rem] md:text-[45rem] text-hr-blue leading-[1.2] uppercase font-ethnocentric font-normal"
            level={2}
          >
            {parser(t("greatest_show_25.form_heading"))}
          </Typography.Heading>
          <Typography.Heading
            className="pt-[20rem] md:pt-[40rem] text-[20rem] md:text-[45rem] text-hr-blue leading-[1.2] uppercase font-ethnocentric font-normal"
            level={2}
          >
            Đăng ký tham gia
          </Typography.Heading>
          <div className="flex items-center justify-center my-[20rem]">
            <span className="mr-[10rem] text-[10rem] md:text-[16rem] text-hr-primary">
              {t("common.language")}:
            </span>
            <LanguageSelector />
          </div>
          <Typography.Paragraph className="text-hr-blue text-[12rem] md:text-[20rem] font-semibold">
            <span>{t("greatest_show_25.form_description_1")}</span>
            <span className="ml-[5rem] block md:inline text-[14rem] md:text-[23rem] font-bold">
              WISers' Greatest Show 2025!
            </span>
          </Typography.Paragraph>

          <Typography.Paragraph className="text-hr-blue text-[12rem] md:text-[20rem] font-semibold mb-[20rem]">
            {t("greatest_show_25.form_description_2")}
          </Typography.Paragraph>
          <div className="bg-white inline-block mx-auto px-[10rem] md:px-[60rem] py-[5rem] md:py-[10rem] rounded-full">
            <Typography.Paragraph className="mb-0 text-hr-blue text-[10rem] md:text-[20rem] font-semibold leading-[1.2]">
              <span>{t("common.event_email")}: </span>
              <span>{event.variables.event_email?.value}</span>
            </Typography.Paragraph>
          </div>
        </center>
        {/* Register Information */}
        <div className="info-ticket-table mb-[20rem] md:mb-[30rem]">
          <Typography.Heading
            className="text-white rounded-t-[12rem] md:rounded-t-[30rem] bg-gs25-gradient inline-block px-[40rem] font-extrabold text-[10rem] md:text-[24rem] uppercase text-center py-[3rem] md:py-[10rem] mb-[20rem] md:mb-[30rem]"
            level={4}
          >
            {t("greatest_show_25.form.section_info_heading")}
          </Typography.Heading>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Group target*/}
            <section className="info-ticket-table mb-[30rem]">
              <Typography.Heading
                className="text-white rounded-t-[12rem] md:rounded-t-[30rem] bg-hr-blue font-extrabold text-[10rem] md:text-[24rem] uppercase text-center py-[3rem] md:py-[10rem] mb-[20rem] md:mb-[30rem]"
                level={4}
              >
                {t("greatest_show_25.form.section_1_heading")}
              </Typography.Heading>
              <div className="mb-[15rem]">
                <FormField
                  control={form.control}
                  name="entry_group"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          className="grid gap-[10rem] md:grid-cols-3"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {groupOptions.map((option) => {
                            const isActive = field.value === option.value;
                            return (
                              <label
                                key={option.value}
                                htmlFor={`entry_group-${option.value}`}
                                className="cursor-pointer"
                              >
                                <RadioGroupItem
                                  id={`entry_group-${option.value}`}
                                  value={option.value}
                                  className="sr-only"
                                />
                                <div
                                  className={cn(
                                    "rounded-[8rem] border border-hr-blue bg-white px-[15rem] py-[12rem] text-center text-hr-blue transition-[border,box-shadow,transform] duration-200 md:px-[20rem] md:py-[20rem]",
                                    {
                                      "border-hr-ember shadow-[0rem_0rem_0rem_2rem_rgba(231,99,48,0.15)]":
                                        isActive,
                                    }
                                  )}
                                >
                                  <span className="text-[10rem] md:text-[18rem] font-semibold">
                                    {option.label}
                                  </span>
                                </div>
                              </label>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            {/* Entry Infomation */}
            <section className="section-3 mt-[20rem] md:mt-[30rem]">
              <Typography.Heading
                className="text-white rounded-t-[12rem] md:rounded-t-[30rem] bg-[#21B0B2] shadow-[inset_0rem_-5rem_10rem_0rem_#1a8c8f] font-extrabold text-[10rem] md:text-[24rem] uppercase text-center py-[3rem] md:py-[10rem] mb-[10rem] md:mb-[20rem]"
                level={4}
              >
                {t("greatest_show_25.form.section_2_heading")}
              </Typography.Heading>

              <div className="grid gap-[15rem]">
                <FormField
                  control={form.control}
                  name="entry_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-[14rem] md:leading-[30rem]">
                        {t("greatest_show_25.form.entry_name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full h-[16rem] md:h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="entry_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-[14rem] md:leading-[30rem]">
                        {t("greatest_show_25.form.entry_category_label")}
                      </FormLabel>

                      <FormControl>
                        <RadioGroup
                          className="grid gap-[10rem] md:grid-cols-2"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {entryCategories.map((option) => {
                            const isActive = field.value === option.value;
                            return (
                              <label
                                key={option.value}
                                htmlFor={`entry-${option.value}`}
                                className="cursor-pointer"
                              >
                                <RadioGroupItem
                                  id={`entry-${option.value}`}
                                  value={option.value}
                                  className="sr-only"
                                />
                                <div
                                  className={cn(
                                    "rounded-[8rem] border border-hr-blue bg-white px-[15rem] py-[12rem] text-center text-hr-blue transition-[border,box-shadow,transform] duration-200 md:px-[20rem] md:py-[20rem]",
                                    isActive
                                      ? "border-hr-ember shadow-[0rem_0rem_0rem_2rem_rgba(231,99,48,0.15)]"
                                      : "hover:-translate-y-[2rem] hover:border-hr-ember"
                                  )}
                                >
                                  <span className="text-[10rem] md:text-[18rem] font-semibold">
                                    {option.label}
                                  </span>
                                </div>
                              </label>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                    </FormItem>
                  )}
                />

                {entryCategory === "instrument" && (
                  <FormField
                    control={form.control}
                    name="instrument_info"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-full h-[16rem] md:h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem]"
                            placeholder={t(
                              "greatest_show_25.form.entry_categories.instrument_placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                      </FormItem>
                    )}
                  />
                )}

                {entryCategory === "talent" && (
                  <FormField
                    control={form.control}
                    name="talent_info"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-full h-[16rem] md:h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem]"
                            placeholder={t(
                              "greatest_show_25.form.entry_categories.talent_placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="entry_participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-[14rem] md:leading-[30rem]">
                        {t("greatest_show_25.form.entry_participants_label")}
                      </FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full min-h-[80rem] md:min-h-[150rem] bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem] resize-y"
                          placeholder={t(
                            "greatest_show_25.form.entry_participants_placeholder"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="entry_file"
                  render={({ field }) => {
                    const handleClearFile = () => {
                      field.onChange(undefined);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    };
                    return (
                      <FormItem className="space-y-[10rem]">
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-[14rem] md:leading-[30rem]">
                          {t("greatest_show_25.form.entry_file_label")}
                        </FormLabel>

                        <FormControl>
                          <div>
                            <label
                              htmlFor={fileInputId}
                              className="inline-flex cursor-pointer items-center justify-center rounded-[5rem] border border-hr-blue bg-white px-[15rem] py-[10rem] text-[10rem] md:text-[16rem] font-semibold text-hr-blue transition-colors hover:border-hr-ember hover:text-hr-ember"
                            >
                              {t("greatest_show_25.form.entry_file_button")}
                            </label>
                            <input
                              id={fileInputId}
                              type="file"
                              accept="audio/mp3,video/mp4,video/quicktime,video/x-ms-wmv,video/x-msvideo"
                              ref={(node) => {
                                field.ref(node);
                                fileInputRef.current = node;
                              }}
                              name={field.name}
                              onBlur={field.onBlur}
                              className="hidden"
                              onChange={(event) =>
                                field.onChange(event.target.files?.[0])
                              }
                            />
                          </div>
                        </FormControl>
                        {field.value && (
                          <div className="flex items-center justify-between rounded-[5rem]  text-hr-blue">
                            <span
                              className="max-w-[70%] truncate text-[9rem] md:text-[16rem]"
                              title={field.value.name}
                            >
                              {field.value.name}
                            </span>
                            <button
                              type="button"
                              className="text-[9rem] md:text-[14rem] font-semibold text-hr-ember"
                              onClick={handleClearFile}
                            >
                              {}
                            </button>
                          </div>
                        )}
                        <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </section>
            {/* Contact Infomation */}
            <section className="section-3 mt-[20rem] md:mt-[30rem]">
              <Typography.Heading
                className="text-white rounded-t-[12rem] md:rounded-t-[30rem] bg-[#E76330] shadow-[inset_0rem_-5rem_10rem_0rem_#be5328] font-extrabold text-[10rem] md:text-[24rem] uppercase text-center py-[3rem] md:py-[10rem] mb-[10rem] md:mb-[20rem]"
                level={4}
              >
                {t("greatest_show_25.form.section_4_heading")}
              </Typography.Heading>
              <div className="">
                <div className="mb-[10rem]">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-[14rem] md:leading-[30rem]">
                          {t("greatest_show_25.form.full_name")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-[16rem] md:h-[30rem]  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem]"
                              {...field}
                              placeholder={t(
                                "greatest_show_25.form.full_name_placeholder"
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-[2%] md:gap-x-[25%] justify-between">
                  <FormField
                    control={form.control}
                    name={"mobile_number"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-[14rem] md:leading-[30rem]">
                          {t("greatest_show_25.form.mobile_number")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-[16rem] md:h-[30rem]  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem]"
                              {...field}
                              placeholder={t(
                                "greatest_show_25.form.mobile_number_placeholder"
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"email"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-[14rem] md:leading-[30rem]">
                          {t("greatest_show_25.form.email")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-[16rem] md:h-[30rem]  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem]"
                              {...field}
                              placeholder={t(
                                "greatest_show_25.form.email_placeholder"
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>
            <center className="mt-[20rem]">
              <PrimaryButton
                className={cn(
                  "text-[14rem] text-center md:text-[30rem] font-extrabold p-[20rem_30rem] md:p-[35rem_40rem] rounded-[10rem] mb-[10rem] flex items-center"
                )}
              >
                {t("greatest_show_25.buttons.register_now")}
              </PrimaryButton>
            </center>
          </form>
        </Form>
      </section>
    </div>
  );
};
