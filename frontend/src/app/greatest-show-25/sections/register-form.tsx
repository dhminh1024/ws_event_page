import {
  HTMLAttributes,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
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
import { PrimaryButton, SecondaryButton } from "../components/button";
import { LanguageSelector } from "../components/language-selector";
import { RadioGroup, RadioGroupItem } from "@atoms/radio-group";
import useCheckTicketsCount from "@/app/happy-run/api/use-check-tickets-count";
import useRegistration from "../api/use-registration";
import { Heading } from "../components/heading";
import { Schedule } from "./schedule";
import TableAImage from "@greatest-show-25/assets/images/table-a.png";
import TableBImage from "@greatest-show-25/assets/images/table-b.png";
import TableCImage from "@greatest-show-25/assets/images/table-c.png";
import RegisterHeading from "@greatest-show-25/assets/images/register-heading.png";
import RegisterFooterImage from "@greatest-show-25/assets/images/register-footer.png";
import { RegistrationSuccessModal } from "../components/registration-success-modal";
import { useNavigate } from "react-router-dom";

export type RegisterFormProps = HTMLAttributes<HTMLDivElement>;

export const RegisterForm: FC<RegisterFormProps> = ({ className }) => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const { form } = useRegisterForm();
  const event = useEventPageContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputId = useId();
  const { submit: submitRegistration } = useRegistration();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const groupOptions = useMemo(
    () => [
      {
        value: "primary",
        label: t("greatest_show_25.form.group_items.primary_students"),
        heading: t(
          "greatest_show_25.form.group_items.primary_students_heading"
        ),
        description: t(
          "greatest_show_25.form.group_items.primary_students_description"
        ),
        image: TableAImage,
      },
      {
        value: "secondary",
        label: t("greatest_show_25.form.group_items.secondary_students"),
        heading: t(
          "greatest_show_25.form.group_items.secondary_students_heading"
        ),
        description: t(
          "greatest_show_25.form.group_items.secondary_students_description"
        ),
        image: TableBImage,
      },
      {
        value: "parent_teacher_staff",
        label: t("greatest_show_25.form.group_items.parent_teacher_staff"),
        heading: t(
          "greatest_show_25.form.group_items.parent_teacher_staff_heading"
        ),
        description: t(
          "greatest_show_25.form.group_items.parent_teacher_staff_description"
        ),
        image: TableCImage,
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
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Registration submission error:", error);
    }
  });

  return (
    <div className={cn("", className)}>
      <section className="form-section px-80 md:px-[8%]">
        <center className="mb-120 md:mb-160">
          {/* Heading */}
          <Typography.Heading
            className="pt-80 md:pt-160 text-[20rem] md:text-[55rem]  leading-[1.2] uppercase font-ethnocentric font-normal bg-gs25-gradient-4 bg-clip-text text-transparent"
            level={2}
          >
            {parser(t("greatest_show_25.form_heading"))}
          </Typography.Heading>
          <img
            className="w-[95%] mt-[20rem] md:w-[70%]"
            src={RegisterHeading}
            alt="Register Heading"
          />
          {/* Description */}
          <div className="flex items-center justify-center my-[30rem_10rem] md:my-80">
            <span className="mr-40 text-[10rem] md:text-[16rem] text-hr-primary">
              {t("common.language")}:
            </span>
            <LanguageSelector />
          </div>
          <Typography.Paragraph className="mb-0 text-[12rem] md:text-[20rem]">
            <span>{t("greatest_show_25.form_description_1")}</span>
            <span className="ml-20 block md:inline text-[14rem] md:text-[23rem] font-bold">
              WISers' Greatest Show 2025!
            </span>
          </Typography.Paragraph>
          <Typography.Paragraph className=" text-[12rem] md:text-[20rem] mb-80">
            {t("greatest_show_25.form_description_2")}
          </Typography.Paragraph>
          {/* Contact */}
          <div className="bg-gs25-gradient-3 p-[1.5rem] md:p-[3rem] inline-block rounded-full">
            <div className="bg-linear-to-b from-gs25-primary to-gs25-secondary inline-block mx-auto px-[35rem] md:px-240 py-20 md:py-40 rounded-full text-white">
              <Typography.Paragraph className="mb-0  text-[12rem] md:text-[20rem] font-semibold leading-[1.2] flex flex-col md:flex-row">
                <span>{t("common.event_email")}: </span>
                <span>{event.variables.event_email?.value}</span>
              </Typography.Paragraph>
            </div>
          </div>
        </center>
        {/* Register Information */}
        <div className="info-ticket-table mb-80 md:mb-120">
          <center>
            <Heading className="">
              {t("greatest_show_25.form.section_info_heading")}
            </Heading>
          </center>
          <div className="py-[40rem]">
            <Schedule />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Group target*/}
            <section className="info-ticket-table mb-120 px-[20rem]">
              <center>
                <Heading className="mb-[30rem] md:mb-[60rem]">
                  {t("greatest_show_25.form.section_1_heading")}
                </Heading>
              </center>
              <div className="mb-60">
                <FormField
                  control={form.control}
                  name="entry_group"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          className="grid gap-40 md:grid-cols-3"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {groupOptions.map((option) => {
                            return (
                              <label
                                key={option.value}
                                htmlFor={`entry_group-${option.value}`}
                                className={cn(
                                  "cursor-pointer flex flex-col justify-between border-[2rem] md:border-[3rem] border-transparent rounded-[10rem] md:rounded-[25rem] p-[8rem] md:p-[20rem]",
                                  {
                                    " border-gs25-primary":
                                      field.value === option.value,
                                  }
                                )}
                              >
                                <div className="flex flex-row md:flex-col items-start gap-x-[10rem]">
                                  <img
                                    className="w-[50%] md:w-full"
                                    src={option.image}
                                    alt={option.label}
                                  />
                                  <div className="flex flex-1 flex-col justify-start md:justify-center">
                                    <Typography.Paragraph className=" text-gs25-primary text-[14rem] uppercase md:text-[30rem] font-extrabold mb-10 md:mb-40">
                                      {option.heading}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph className=" text-gs25-secondary text-[10rem] md:text-[20rem] font-medium mb-40">
                                      {parser(option.description)}
                                    </Typography.Paragraph>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center mt-[-12rem] md:mt-[20rem] ml-[60rem] md:ml-0">
                                  <input
                                    id={`entry_group-${option.value}`}
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() =>
                                      field.onChange(option.value)
                                    }
                                    className="sr-only peer"
                                  />
                                  <div
                                    className={cn(
                                      "inline-flex items-center justify-center rounded-full border-2 mr-20 md:mr-40 w-[14rem] h-[14rem] md:w-[30rem] md:h-[30rem]  transition-colors duration-200",
                                      "border-white border-[2.5rem] md:border-[5rem] bg-white",
                                      "peer-checked:bg-gs25-gradient-2"
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "rounded-full transition-colors duration-200 w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem]",
                                        "bg-transparent peer-checked:bg-hr-ember"
                                      )}
                                    />
                                  </div>
                                  <span className="text-[10rem] md:text-[20rem] text-gs25-secondary font-semibold">
                                    {t("common.select")}
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
            <section className="section-3 mt-80 md:mt-[60rem]">
              <center>
                <Heading className="md:mb-[40rem]">
                  {t("greatest_show_25.form.section_2_heading")}
                </Heading>
              </center>
              <div className="grid gap-60">
                <FormField
                  control={form.control}
                  name="entry_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap  font-bold leading-56 md:leading-120">
                        {t("greatest_show_25.form.entry_name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full h-64 md:h-120 bg-white border-gs25-secondary rounded-[5rem] text-[8rem] md:text-[16rem]  p-[10rem_5rem] md:py-80 md:px-40"
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
                      <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap  font-bold leading-56 md:leading-120">
                        {t("greatest_show_25.form.entry_category_label")}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="grid gap-[10rem] md:gap-[20rem] md:grid-cols-2 my-[10rem]"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {entryCategories.map((option) => {
                            return (
                              <label
                                key={option.value}
                                htmlFor={`entry-${option.value}`}
                                className="cursor-pointer flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-start">
                                  <input
                                    id={`entry-${option.value}`}
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() =>
                                      field.onChange(option.value)
                                    }
                                    className="sr-only peer"
                                  />
                                  <div
                                    className={cn(
                                      "inline-flex items-center justify-center rounded-full border-2 mr-30 md:mr-40 w-[10rem] h-[10rem] md:w-[20rem] md:h-[20rem]  transition-colors duration-200",
                                      "border-white border-[2rem] md:border-[5rem] bg-white",
                                      "peer-checked:bg-gs25-gradient-2"
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "rounded-full transition-colors duration-200 w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem]",
                                        "bg-transparent peer-checked:bg-hr-ember"
                                      )}
                                    />
                                  </div>
                                  <span className="text-[10rem] md:text-[16rem] text-gs25-secondary font-semibold">
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
                            className="w-full h-64 md:h-120 bg-white border-gs25-secondary rounded-[5rem] text-[8rem] md:text-[16rem]  p-[10rem_5rem] md:py-80 md:px-40"
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
                            className="w-full h-64 md:h-120 bg-white border-gs25-secondary rounded-[5rem] text-[8rem] md:text-[16rem]  p-[10rem_5rem] md:py-80 md:px-40"
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
                      <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap  font-bold leading-56 md:leading-120">
                        {t("greatest_show_25.form.entry_participants_label")}
                      </FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full border-gs25-secondary min-h-320 md:min-h-600 bg-white border-[1rem] rounded-[5rem] text-[8rem] md:text-[16rem]  p-[10rem_5rem] md:py-80 md:px-40 resize-y"
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
                      <FormItem className="space-y-40">
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap  font-bold leading-56 md:leading-120">
                          {t("greatest_show_25.form.entry_file_label")}
                        </FormLabel>

                        <FormControl>
                          <div>
                            <label htmlFor={fileInputId}>
                              <SecondaryButton
                                className={cn(
                                  "text-[10rem] mt-[5rem] bg-transparent text-center md:text-[23rem] font-base italic p-[10rem_15rem] md:p-[30rem_30rem] md:rounded-[13rem] mb-40 flex items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                                )}
                              >
                                {t("greatest_show_25.form.entry_file_button")}
                              </SecondaryButton>
                            </label>
                            {/* <label
                              htmlFor={fileInputId}
                              className="inline-flex cursor-pointer items-center justify-center rounded-[5rem] border border-gs25-secondary bg-white px-60 py-40 text-[10rem] md:text-[16rem] font-semibold  transition-colors hover:border-hr-ember hover:text-hr-ember"
                            >
                              {t("greatest_show_25.form.entry_file_button")}
                            </label> */}
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
                          <div className="flex items-center justify-between rounded-[5rem]  ">
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
            <section className="section-3 mt-80 md:mt-120">
              <center>
                <Heading>
                  {t("greatest_show_25.form.section_4_heading")}
                </Heading>
                <Typography.Paragraph className="text-gs25-secondary text-[12rem] md:text-[20rem] font-semibold mt-40 mb-80">
                  {parser(t("greatest_show_25.form.section_4_desc_1"))}
                </Typography.Paragraph>
              </center>
              <div className="">
                <div className="mb-40">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap  font-bold leading-56 md:leading-120">
                          {t("greatest_show_25.form.full_name")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-64 md:h-120  bg-white border-gs25-secondary rounded-[5rem] text-[8rem] md:text-[16rem]  p-[10rem_5rem] md:py-80 md:px-40"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[2%] gap-y-[10rem] md:gap-x-[25%] justify-between">
                  <FormField
                    control={form.control}
                    name={"mobile_number"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap  font-bold leading-56 md:leading-120">
                          {t("greatest_show_25.form.mobile_number")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-64 md:h-120  bg-white border-gs25-secondary rounded-[5rem] text-[8rem] md:text-[16rem]  p-[10rem_5rem] md:py-80 md:px-40"
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
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap  font-bold leading-56 md:leading-120">
                          {t("greatest_show_25.form.email")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-64 md:h-120  bg-white border-gs25-secondary rounded-[5rem] text-[8rem] md:text-[16rem]  p-[10rem_5rem] md:py-80 md:px-40"
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
            <section className="section-3 mt-80 md:mt-[60rem]">
              <center>
                <Heading className="text-center md:mb-[60rem]">
                  {t("greatest_show_25.form.footer_heading")}
                </Heading>
              </center>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60rem]">
                <div className="flex flex-col gap-x-[30rem]">
                  <Typography.Paragraph className="text-[10rem] md:text-[26rem] font-medium mb-40 md:mb-0">
                    {parser(t("greatest_show_25.form.footer_note_1"))}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-[10rem] md:text-[26rem] font-medium">
                    {parser(t("greatest_show_25.form.footer_note_2"))}
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-col gap-x-[30rem]">
                  <Typography.Paragraph className="text-[10rem] md:text-[26rem] font-medium mb-40 md:mb-0">
                    {parser(t("greatest_show_25.form.footer_note_3"))}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-[10rem] md:text-[26rem] font-medium">
                    {parser(t("greatest_show_25.form.footer_note_4"))}
                  </Typography.Paragraph>
                </div>
              </div>
            </section>
            <center className="mt-[20rem] md:mt-[80rem]">
              <PrimaryButton
                className={cn(
                  "text-[14rem] bg-transparent text-center md:text-[45rem] font-black p-[20rem_30rem] md:p-[45rem_70rem] md:rounded-[20rem] mb-40 flex items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                )}
              >
                {t("greatest_show_25.buttons.finish")}
              </PrimaryButton>
            </center>
          </form>
        </Form>
      </section>
      <img src={RegisterFooterImage} className="md:mt-[-250rem]" alt="" />
      <RegistrationSuccessModal
        open={showSuccessModal}
        onConfirm={() => {
          // Redirect to home page use React-router
          navigate("/greatest-show-25");
        }}
        onClosed={() => setShowSuccessModal(false)}
      />
    </div>
  );
};
