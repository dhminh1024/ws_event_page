import { HTMLAttributes, useState, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useFieldArray } from "react-hook-form";
import { usePurchasingForm } from "../hooks/use-purchasing-form";
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
import { Button } from "@atoms/button";
import { useLocales } from "@/core/hooks/use-locales";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@atoms/select";
import {
  shirtSizes,
  ticket_classes,
  ticket_distance,
} from "../data-static/ticket";
import { Check, ChevronDown, Loader2, Trash, X } from "lucide-react";
import Typography from "@/app/happy-box/components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { cleanPath } from "@/lib/utils/common";
import { FRAPPE_APIS } from "../api/api.config";
import useCheckUserByCode from "../api/use-check-user-by-code";
import {
  OrderConfirmModal,
  OrderData,
} from "../components/order-confirm-modal";
import { useHRSettings } from "../context/use-settings";
import { PaymentSuccessModal } from "../components/payment-success-modal";
import parser from "html-react-parser";
import { PrimaryButton } from "../components/button";
import { LanguageSelector } from "../components/language-selector";

export type PurchasingFormProps = HTMLAttributes<HTMLDivElement> & {};

const PrimaryDefaultInfo = {
  code: "",
  full_name: "",
  department: "",
  ticket_class: "",
  distance: "",
  size: "",
  bib: "",
};

const GuardianDefaultInfo = {
  full_name: "",
  ticket_class: "",
  distance: "",
  size: "",
  bib: "",
};

export const PurchasingForm: FC<PurchasingFormProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const { settings } = useHRSettings();
  const { form } = usePurchasingForm();
  const { getInfo } = useCheckUserByCode();
  const [isAgreed, setIsAgreed] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    qr_code: string;
    order_name: string;
  }>({
    qr_code: "",
    order_name: "",
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const {
    fields: primaryFields,
    append: appendPrimary,
    remove: removePrimary,
  } = useFieldArray({
    name: "primary_runners",
    control: form.control,
  });
  const {
    fields: guardianFields,
    append: appendGuardian,
    remove: removeGuardian,
  } = useFieldArray({
    name: "guardian_runners",
    control: form.control,
  });
  const event = useEventPageContext();

  // console.log("ERROR", form.formState.errors);

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    if (!settings?.wellbeing_ticket_price && !settings?.happy_run_ticket_price)
      return;
    const tickets = [...data.primary_runners, ...data.guardian_runners].map(
      (i: any) => ({
        wellspring_code: i.code?.toUpperCase() || null,
        full_name: i.full_name,
        ticket_type: i.ticket_class,
        distance: i.distance,
        shirt_size: i.size,
        bib: i.bib || "",
        price:
          i.ticket_class === "Well-being"
            ? settings.wellbeing_ticket_price
            : settings.happy_run_ticket_price,
      })
    );
    const orderData = {
      full_name: data.full_name,
      email: data.email,
      mobile_number: data.mobile_number,
      tickets,
    };
    setOrderData(orderData);
    if (isAgreed) setOpenConfirmModal(true);
  });

  const handlePayment = async (qr_code: string, order_name: string) => {
    console.log(order_name);
    setPaymentData({ qr_code, order_name });
    setOpenSuccessModal(true);
  };

  const handleOrderSuccess = () => {
    setOpenSuccessModal(false);
    form.reset();
  };

  const handleAddPrimaryPerson = () => {
    appendPrimary(PrimaryDefaultInfo);
  };

  const handleAddCompanionPerson = () => {
    appendGuardian(GuardianDefaultInfo);
  };

  const clearUserField = (index: number) => {
    form.setValue(`primary_runners.${index}.full_name`, "");
    form.setValue(`primary_runners.${index}.department`, "");
  };

  const handleCheckUser = async (index: number, value: string) => {
    const code = value.trim().toLowerCase();

    if (code) {
      try {
        const data = await getInfo({
          wellspring_code: code,
        });
        form.setValue(
          `primary_runners.${index}.full_name`,
          data.message.person.full_name
        );
        form.setValue(
          `primary_runners.${index}.department`,
          data.message.person.school_class_title ||
            data.message.person.department
        );
      } catch (error) {
        console.log("Error", error);
        clearUserField(index);
      }
    } else {
      clearUserField(index);
    }
  };

  const handleChangeBIB = (index: number, type: string, value: string) => {
    if (type === "primary")
      form.setValue(`primary_runners.${index}.bib`, value);
    if (type === "guardian")
      form.setValue(`guardian_runners.${index}.bib`, value);
  };

  return (
    <div className={cn("mb-160", className)}>
      <section
        className="form-section px-80 md:px-[8%]"
        hidden={orderData && !isAgreed}
      >
        <center className="mb-120 md:mb-160">
          <Typography.Heading
            className="pt-80 md:pt-160 text-[20rem] md:text-[45rem] text-hr-blue leading-[1.2] font-extrabold"
            level={2}
          >
            {parser(t("happy_run.form_heading"))}
          </Typography.Heading>
          <div className="flex items-center justify-center my-80">
            <span className="mr-40 text-[16rem]">
              {t("common.language")}:
            </span>
            <LanguageSelector />
          </div>
          <Typography.Paragraph className="text-hr-blue text-[12rem] md:text-[20rem] font-semibold">
            <span>{t("happy_run.form_description_1")}</span>
            <span className="ml-20 block md:inline text-[14rem] md:text-[23rem] font-black uppercase">
              {/* {parser(event.variables.event_name?.value || "")} */}
              Happy Run 2025 <br className="block md:hidden" /> "Set Your Pace -
              Embrace Wellness"
            </span>
          </Typography.Paragraph>

          <Typography.Paragraph className="text-hr-blue text-[12rem] md:text-[20rem] font-semibold mb-80">
            {t("happy_run.form_description_2")}
          </Typography.Paragraph>
          <div className="bg-white inline-block mx-auto px-40 md:px-240 py-20 md:py-40 rounded-full">
            <Typography.Paragraph className="mb-0 text-hr-blue text-[10rem] md:text-[20rem] font-semibold leading-[1.2]">
              <span>{t("common.event_email")}: </span>
              <span>{event.variables.event_email?.value}</span>
            </Typography.Paragraph>
          </div>
        </center>
        {/* Info ticket */}
        <div className="info-ticket-table mb-80 md:mb-120">
          <Typography.Heading
            className="text-white rounded-t-[12rem] md:rounded-t-[30rem] bg-hr-blue font-extrabold text-[10rem] md:text-[24rem] uppercase text-center py-12 md:py-40 mb-80 md:mb-120"
            level={4}
          >
            {t("happy_run.form.section_1_heading")}
          </Typography.Heading>
          <img
            src={
              event.variables?.[`info_ticket_table_${currentLanguage}`]?.value
            }
            alt="info ticket"
          />
          <Typography.Paragraph className="mt-40 md:mt-120 text-center text-hr-blue text-[10rem] md:text-[18rem]">
            {
              event.variables?.[`info_ticket_table_desc_${currentLanguage}`]
                ?.value
            }
          </Typography.Paragraph>
          <img
            className="mt-40 md:mt-120"
            src={
              event.variables?.[`tshirt_size_table_${currentLanguage}`]?.value
            }
            alt="tshirt size"
          />
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            {/* Info Student/Teacher/Staff */}
            <div className="info-ticket-table mb-120">
              <Typography.Heading
                className="text-white rounded-t-[12rem] md:rounded-t-[30rem] bg-[#F6C607] shadow-[inset_0rem_-5rem_10rem_0rem_#EDA41D] font-extrabold text-[10rem] md:text-[24rem] uppercase text-center py-12 md:py-40 mb-80"
                level={4}
              >
                {t("happy_run.form.section_2_heading")}
              </Typography.Heading>
              <Typography.Paragraph className="text-hr-ember text-[10rem] md:text-[16rem]">
                {t("happy_run.form.young_user_warning")}
              </Typography.Paragraph>
              <div className="section-1">
                {primaryFields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`primary_runners.${index}`}
                    render={({ field }) => (
                      <div className="grid grid-cols-3 md:grid-cols-[repeat(6,1fr)_auto] items-start gap-[5rem_5rem] md:gap-40 mx-auto mb-40">
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.user_code")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="w-full h-64 md:h-120 pr-60! md:pr-140! bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-80 md:px-40 uppercase"
                                {...form.register(
                                  `primary_runners.${index}.code`
                                )}
                                onBlur={(e) =>
                                  handleCheckUser(index, e.target.value)
                                }
                                onChange={(e) => {
                                  field.onChange({
                                    ...field.value,
                                    code: e.target.value,
                                  });
                                }}
                              />
                              {!form.formState.errors.primary_runners?.[index]
                                ?.code &&
                                form.watch("primary_runners")?.[index]
                                  ?.full_name && (
                                  <Check className="text-status-success w-48 md:w-104 absolute top-0 bottom-0 right-20 m-auto" />
                                )}
                              {form.formState.errors.primary_runners?.[index]
                                ?.code && (
                                <X className="text-status-danger w-48 md:w-104 absolute top-0 bottom-0 right-20 m-auto" />
                              )}
                            </div>
                          </FormControl>
                          <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                            {parser(
                              form.formState.errors.primary_runners?.[index]
                                ?.code?.message || ""
                            )}
                          </Typography.Paragraph>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.full_name")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Input
                              className="w-full h-64 md:h-120 bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-80 md:px-40"
                              {...form.register(
                                `primary_runners.${index}.full_name`
                              )}
                              readOnly
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.class_department")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Input
                              className="w-full h-64 md:h-120 bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-80 md:px-[10rem"
                              {...form.register(
                                `primary_runners.${index}.department`
                              )}
                              readOnly
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.ticket_class")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Select
                              {...form.register(
                                `primary_runners.${index}.ticket_class`
                              )}
                              value={field.value.ticket_class}
                              onValueChange={(value) => {
                                const oldValues = form.watch(
                                  `primary_runners.${index}`
                                );
                                field.onChange({
                                  ...oldValues,
                                  ticket_class: value,
                                });
                              }}
                            >
                              <SelectTrigger className="h-64 md:h-120 p-[10rem_5rem] md:py-80 md:px-40 w-full  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem]">
                                <SelectValue
                                  className="flex-1"
                                  placeholder={t(
                                    "happy_run.form.ticket_class_placeholder"
                                  )}
                                />
                              </SelectTrigger>
                              <SelectContent className="max-h-none bg-white">
                                {ticket_classes.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    className=" text-[8rem] md:text-[16rem] p-20 md:p-40 bg-white! hover:bg-slate-200! text-hr-blue! cursor-pointer"
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                            {
                              form.formState.errors.primary_runners?.[index]
                                ?.ticket_class?.message
                            }
                          </Typography.Paragraph>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.ticket_distance")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Select
                              {...form.register(
                                `primary_runners.${index}.distance`
                              )}
                              value={field.value.distance}
                              onValueChange={(value) => {
                                const oldValues = form.watch(
                                  `primary_runners.${index}`
                                );
                                field.onChange({
                                  ...oldValues,
                                  distance: value,
                                });
                              }}
                            >
                              <SelectTrigger className="h-64 md:h-120 p-[10rem_5rem] md:py-80 md:px-40 w-full  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem]">
                                <SelectValue
                                  className="flex-1"
                                  placeholder={t(
                                    "happy_run.form.ticket_distance_placeholder"
                                  )}
                                />
                              </SelectTrigger>
                              <SelectContent className="max-h-none bg-white">
                                {ticket_distance.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    className=" text-[8rem] md:text-[16rem] p-20 md:p-40 bg-white! hover:bg-slate-200! text-hr-blue! cursor-pointer"
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                            {
                              form.formState.errors.primary_runners?.[index]
                                ?.distance?.message
                            }
                          </Typography.Paragraph>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.shirt_size")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Select
                              {...form.register(
                                `primary_runners.${index}.size`
                              )}
                              value={field.value.size}
                              onValueChange={(value) => {
                                const oldValues = form.watch(
                                  `primary_runners.${index}`
                                );
                                field.onChange({
                                  ...oldValues,
                                  size: value,
                                });
                              }}
                            >
                              <SelectTrigger className="h-64 md:h-120 p-[10rem_5rem] md:py-80 md:px-40 w-full  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem]">
                                <SelectValue
                                  className="flex-1"
                                  placeholder={t(
                                    "happy_run.form.shirt_size_placeholder"
                                  )}
                                />
                              </SelectTrigger>
                              <SelectContent className="max-h-none bg-white">
                                {shirtSizes.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    className=" text-[8rem] md:text-[16rem] p-20 md:p-40 bg-white! hover:bg-slate-200! text-hr-blue! cursor-pointer"
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                            {
                              form.formState.errors.primary_runners?.[index]
                                ?.size?.message
                            }
                          </Typography.Paragraph>
                        </FormItem>
                        <button
                          type="button"
                          className="col-span-3 md:col-span-1 disabled:opacity-20 inline-block mt-20 md:mt-120 p-20 md:p-32 border-status-danger border-[1rem] rounded-[5rem]  hover:bg-status-danger/5"
                          onClick={() => index > 0 && removePrimary(index)}
                          disabled={index === 0}
                        >
                          <Trash className="mx-auto w-40 h-40 md:w-[24rem] md:h-96 text-status-danger cursor-pointer" />
                        </button>
                      </div>
                    )}
                  />
                ))}
                <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                  {form.formState.errors.primary_runners?.["root"]?.message}
                </Typography.Paragraph>
                <Button
                  type="button"
                  className="text-[10rem] md:text-[18rem] p-40 md:p-72 rounded-[3rem] md:rounded-[8rem] bg-linear-to-b from-[#1F7777] to-[#009181] italic"
                  onClick={handleAddPrimaryPerson}
                >
                  {t("happy_run.buttons.add_person")}
                </Button>
              </div>
            </div>
            {/* Info Parents/Guadiants */}
            <div className="info-ticket-table mb-120">
              <Typography.Heading
                className="text-white rounded-t-[12rem] md:rounded-t-[30rem] bg-[#C4D03D] shadow-[inset_0rem_-5rem_10rem_0rem_#aec22e] font-extrabold text-[10rem] md:text-[24rem] uppercase text-center py-12 md:py-40 mb-40 md:mb-80"
                level={4}
              >
                {t("happy_run.form.section_3_heading")}
              </Typography.Heading>
              <div className="section-2">
                {guardianFields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`guardian_runners.${index}`}
                    render={({ field }) => (
                      <div className="grid grid-cols-3 md:grid-cols-[repeat(6,1fr)_auto] gap-[5rem_5rem] md:gap-40 mx-auto mb-40">
                        <FormItem className="col-span-3">
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.full_name")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Input
                              className="w-full h-64 md:h-120 bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-80 md:px-40"
                              {...form.register(
                                `guardian_runners.${index}.full_name`
                              )}
                            />
                          </FormControl>
                          <FormMessage className="text-[8rem] md:text-[14rem] text-status-danger" />
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.ticket_class")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Select
                              {...form.register(
                                `guardian_runners.${index}.ticket_class`
                              )}
                              value={field.value.ticket_class}
                              onValueChange={(value) =>
                                field.onChange({
                                  ...field.value,
                                  ticket_class: value,
                                })
                              }
                            >
                              <SelectTrigger className="h-64 md:h-120 p-[10rem_5rem] md:py-80 md:px-40 w-full  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem]">
                                <SelectValue
                                  className="flex-1"
                                  placeholder={t(
                                    "happy_run.form.ticket_class_placeholder"
                                  )}
                                />
                              </SelectTrigger>
                              <SelectContent className="max-h-none bg-white">
                                {ticket_classes.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    className=" text-[8rem] md:text-[16rem] p-20 md:p-40 bg-white! hover:bg-slate-200! text-hr-blue! cursor-pointer"
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                            {
                              form.formState.errors.guardian_runners?.[index]
                                ?.ticket_class?.message
                            }
                          </Typography.Paragraph>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.ticket_distance")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Select
                              {...form.register(
                                `guardian_runners.${index}.distance`
                              )}
                              value={field.value.distance}
                              onValueChange={(value) =>
                                field.onChange({
                                  ...field.value,
                                  distance: value,
                                })
                              }
                            >
                              <SelectTrigger className="h-64 md:h-120 p-[10rem_5rem] md:py-80 md:px-40 w-full  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem]">
                                <SelectValue
                                  className="flex-1"
                                  placeholder={t(
                                    "happy_run.form.ticket_distance_placeholder"
                                  )}
                                />
                              </SelectTrigger>
                              <SelectContent className="max-h-none bg-white">
                                {ticket_distance.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    className=" text-[8rem] md:text-[16rem] p-20 md:p-40 bg-white! hover:bg-slate-200! text-hr-blue! cursor-pointer"
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                            {
                              form.formState.errors.guardian_runners?.[index]
                                ?.distance?.message
                            }
                          </Typography.Paragraph>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                            {t("happy_run.form.shirt_size")}
                          </FormLabel>
                          <FormDescription />
                          <FormControl>
                            <Select
                              {...form.register(
                                `guardian_runners.${index}.size`
                              )}
                              value={field.value.size}
                              onValueChange={(value) =>
                                field.onChange({
                                  ...field.value,
                                  size: value,
                                })
                              }
                            >
                              <SelectTrigger className="h-64 md:h-120 p-[10rem_5rem] md:py-80 md:px-40 w-full  bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem]">
                                <SelectValue
                                  className="flex-1"
                                  placeholder={t(
                                    "happy_run.form.shirt_size_placeholder"
                                  )}
                                />
                              </SelectTrigger>
                              <SelectContent className="max-h-none bg-white">
                                {shirtSizes.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    className=" text-[8rem] md:text-[16rem] p-20 md:p-40 bg-white! hover:bg-slate-200! text-hr-blue! cursor-pointer"
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                            {
                              form.formState.errors.guardian_runners?.[index]
                                ?.size?.message
                            }
                          </Typography.Paragraph>
                        </FormItem>
                        <button
                          type="button"
                          className="col-span-3 md:col-span-1 inline-block mt-20 md:mt-120 p-20 md:p-32 border-status-danger border-[1rem] rounded-[5rem]  hover:bg-status-danger/5"
                          onClick={() => removeGuardian(index)}
                        >
                          <Trash className="mx-auto w-40 h-40 md:w-[24rem] md:h-96 text-status-danger cursor-pointer" />
                        </button>
                      </div>
                    )}
                  />
                ))}
                {guardianFields.length === 0 && (
                  <Typography.Paragraph className="text-[8rem] md:text-[16rem] italic mb-40! text-hr-blue">
                    {t("happy_run.form.empty_companion")}
                  </Typography.Paragraph>
                )}
                <Button
                  type="button"
                  className="text-[10rem] md:text-[18rem] p-40 md:p-72 rounded-[3rem] md:rounded-[8rem] bg-linear-to-b from-[#1F7777] to-[#009181] italic"
                  onClick={handleAddCompanionPerson}
                >
                  {t("happy_run.buttons.add_person")}
                </Button>
              </div>
            </div>
            {/* Contact Infomation */}
            <div className="section-3 mt-80 md:mt-120">
              <Typography.Heading
                className="text-white rounded-t-[12rem] md:rounded-t-[30rem] bg-[#E76330] shadow-[inset_0rem_-5rem_10rem_0rem_#be5328] font-extrabold text-[10rem] md:text-[24rem] uppercase text-center py-12 md:py-40 mb-40 md:mb-80"
                level={4}
              >
                {t("happy_run.form.section_4_heading")}
              </Typography.Heading>
              <Typography.Paragraph className="text-[10rem] md:text-[16rem] text-hr-ember">
                {t("happy_run.form.section_4_desc_1")}
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[10rem] md:text-[16rem] text-hr-ember">
                {t("happy_run.form.section_4_desc_2")}
              </Typography.Paragraph>
              <div className="">
                <div className="mb-40">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                          {t("happy_run.form.full_name")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-64 md:h-120 bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-80 md:px-40"
                              {...field}
                              placeholder={t(
                                "happy_run.form.full_name_placeholder"
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
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                          {t("happy_run.form.mobile_number")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-64 md:h-120 bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-80 md:px-40"
                              {...field}
                              placeholder={t(
                                "happy_run.form.mobile_number_placeholder"
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
                        <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                          {t("happy_run.form.email")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-64 md:h-120 bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-80 md:px-40"
                              {...field}
                              placeholder={t(
                                "happy_run.form.email_placeholder"
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
            </div>
            <div className="section-4 mt-40 md:mt-120">
              <FormLabel className="text-[9rem] md:text-[17rem] whitespace-nowrap text-hr-blue font-bold leading-56 md:leading-120">
                {t("happy_run.form.content_bib")}
              </FormLabel>
              <FormDescription className="text-[9rem] md:text-[16rem] italic mb-20! md:mb-40! text-hr-blue">
                {t("happy_run.form.content_bib_desc")}
              </FormDescription>
              <div className="relative border-hr-blue border-[1rem] rounded-[5rem] bg-white min-h-320 md:min-h-720 p-20 md:p-80">
                {[
                  ...form
                    .watch("primary_runners")
                    .map((item, index) => ({
                      ...item,
                      type: "primary",
                      index,
                    }))
                    .filter(
                      (i) => i.full_name && i.ticket_class === "Well-being"
                    ),
                  ...form
                    .watch("guardian_runners")
                    .map((item, index) => ({
                      ...item,
                      type: "guardian",
                      index,
                    }))
                    .filter(
                      (i) => i.full_name && i.ticket_class === "Well-being"
                    ),
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-x-20">
                    <Typography.Text className="text-[8rem] md:text-[18rem] text-hr-blue italic">
                      {`${index + 1}. ${item.full_name} -`}
                    </Typography.Text>
                    <div className="flex gap-x-40 items-end">
                      <Input
                        placeholder={t(
                          "happy_run.form.content_bib_placeholder"
                        )}
                        className="flex-1 h-72 md:h-120 text-hr-blue italic text-[8rem] md:text-[18rem] border-b-[1rem] border-b-hr-blue border-l-0! border-r-0! border-t-0!"
                        onChange={(e) =>
                          handleChangeBIB(item.index, item.type, e.target.value)
                        }
                      />
                      <Typography.Paragraph className="text-[8rem] md:text-[14rem] text-status-danger">
                        {
                          form.formState.errors?.[
                            item.type === "primary"
                              ? "primary_runners"
                              : "guardian_runners"
                          ]?.[item.index]?.bib?.message
                        }
                      </Typography.Paragraph>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <center className="mt-80">
              <PrimaryButton
                className={cn(
                  "text-[14rem] text-center md:text-[30rem] font-extrabold p-[20rem_30rem] md:p-[35rem_40rem] rounded-[10rem] mb-40 flex items-center"
                )}
              >
                {t("happy_run.buttons.register_now")}
              </PrimaryButton>
            </center>
          </form>
        </Form>
      </section>
      <PolicySection
        hidden={!orderData || isAgreed}
        onFinish={() => {
          setIsAgreed(true);
          setOpenConfirmModal(true);
        }}
        onCancel={() => {
          setIsAgreed(false);
          setOrderData(undefined);
        }}
      />
      <OrderConfirmModal
        orderData={orderData}
        open={openConfirmModal}
        onConfirm={(qr, order_name) => handlePayment(qr, order_name)}
        onClosed={() => setOpenConfirmModal(false)}
      />
      <PaymentSuccessModal
        codeUrl={paymentData?.qr_code}
        orderName={paymentData?.order_name}
        open={openSuccessModal}
        onClosed={handleOrderSuccess}
      />
    </div>
  );
};

type PolicySectionProps = HTMLAttributes<HTMLDivElement> & {
  onFinish?: () => void;
  onCancel?: () => void;
};

export const PolicySection = ({
  hidden,
  onFinish,
  onCancel,
}: PolicySectionProps) => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  return (
    <div className="bg-hr-background" hidden={hidden}>
      <center className="mb-20 px-80">
        <Typography.Heading
          className="py-80 md:py-160 text-[20rem] md:text-[45rem] text-hr-blue leading-[1.2] font-extrabold"
          level={2}
        >
          {parser(t("happy_run.form.policy_heading"))}
        </Typography.Heading>

        <Typography.Paragraph className="mb-40 w-[90%] md:w-[85%] text-[8rem] md:text-[18rem] text-hr-blue text-justify md:text-center">
          {
            event.variables?.[
              currentLanguage === "en" ? "policy_note_en" : "policy_note_vn"
            ]?.value
          }
        </Typography.Paragraph>
        <div className="bg-white w-[90%] border-hr-blue border-[1rem] p-60 md:p-80 rounded-[5rem] mb-80 text-[10rem]! max-h-1200 md:max-h-2000 overflow-x-hidden md:text-[18rem]! text-left">
          {parser(
            event.variables?.[
              currentLanguage === "en"
                ? "policy_content_en"
                : "policy_content_vn"
            ]?.value || ""
          )}
        </div>
        <div className="flex md:flex-row flex-col-reverse gap-x-160 justify-center">
          <button
            type="button"
            onClick={onCancel}
            // disabled={isRequesting}
            className={cn(
              "text-[14rem] text-center md:text-[20rem] px-80 py-40 rounded-[5rem] mb-40 flex items-center border-hr-ember border-[1rem] text-hr-ember"
            )}
          >
            {t("happy_run.buttons.not_agree")}
          </button>
          <button
            type="button"
            onClick={onFinish}
            // disabled={isRequesting}
            className={cn(
              "text-[14rem] text-center md:text-[20rem] px-80 py-40 rounded-[5rem] mb-40 flex items-center bg-hr-ember text-white"
            )}
          >
            {t("happy_run.buttons.agree")}
          </button>
        </div>
      </center>
    </div>
  );
};
