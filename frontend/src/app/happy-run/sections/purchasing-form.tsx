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
import { Check, ChevronDown, Trash, X } from "lucide-react";
import Typography from "@/app/happy-box/components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { cleanPath } from "@/lib/utils/common";
import { FRAPPE_APIS } from "../api/api.config";
import useCheckUserByCode from "../api/use-check-user-by-code";
import {
  OrderConfirmModal,
  OrderItemDetail,
} from "../components/order-confirm-modal";

export type PurchasingFormProps = HTMLAttributes<HTMLDivElement> & {};

const PrimaryDefaultInfo = {
  code: "",
  full_name: "",
  department: "",
  ticket_class: "",
  distance: "",
  size: "",
};

const GuardianDefaultInfo = {
  full_name: "",
  ticket_class: "",
  distance: "",
  size: "",
};

export const PurchasingForm: FC<PurchasingFormProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const { form } = usePurchasingForm();
  const { getInfo } = useCheckUserByCode();
  const [orderData, setOrderData] = useState<OrderItemDetail[]>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

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

  console.log("ERROR", form.formState.errors);

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    const primaryTickets = [
      ...data.primary_runners,
      ...data.guardian_runners,
    ].map<OrderItemDetail>((i:any) => ({
      name: `${i.full_name} ${i.code ? `(${i.code})` : ""}`,
      ticket_class: i.ticket_class,
      distance: i.distance,
      size: i.size,
      bib: i.bib,
      price: 499000,
    }));

    setOrderData([...primaryTickets]);
    setOpenConfirmModal(true);
  });

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
    }
  };

  const handleChangeBIB = (index: number, type: string, value: string) => {
    if (type === "primary")
      form.setValue(`primary_runners.${index}.bib`, value);
    if (type === "guardian")
      form.setValue(`guardian_runners.${index}.bib`, value);
  };

  return (
    <div className={cn("mb-[40rem]", className)}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          {/* Info Student/Teacher/Staff */}
          <div className="info-ticket-table mb-[30rem]">
            <Typography.Heading
              className="text-white rounded-t-[30rem] bg-[#F6C607] shadow-[inset_0rem_-5rem_10rem_0rem_#EDA41D] font-extrabold text-[24rem] uppercase text-center py-[10rem] mb-[20rem]"
              level={4}
            >
              {
                event.variables?.[
                  currentLanguage === "vn"
                    ? "info_primary_user_heading_vn"
                    : "info_primary_user_heading_en"
                ]?.value
              }
            </Typography.Heading>
            <div className="section-1">
              {primaryFields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`primary_runners.${index}`}
                  render={({ field }) => (
                    <div className="grid grid-cols-[repeat(6,1fr)_auto] items-start gap-[10rem] mx-auto mb-[10rem]">
                      <FormItem>
                        <FormLabel className="text-[16rem] whitespace-nowrap text-hr-blue font-bold leading-[40rem]">
                          {t("happy_run.form.user_code")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full h-[30rem] !pr-[35rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem] uppercase"
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
                                <Check className="text-status-success w-[26rem] absolute top-0 bottom-0 right-[5rem] m-auto" />
                              )}
                            {form.formState.errors.primary_runners?.[index]
                              ?.code && (
                              <X className="text-status-danger w-[26rem] absolute top-0 bottom-0 right-[5rem] m-auto" />
                            )}
                          </div>
                        </FormControl>
                        <Typography.Paragraph className="text-[14rem] text-status-danger">
                          {
                            form.formState.errors.primary_runners?.[index]?.code
                              ?.message
                          }
                        </Typography.Paragraph>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                          {t("happy_run.form.full_name")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <Input
                            className="w-full h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem]"
                            {...form.register(
                              `primary_runners.${index}.full_name`
                            )}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                          {t("happy_run.form.class_department")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <Input
                            className="w-full h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem]"
                            {...form.register(
                              `primary_runners.${index}.department`
                            )}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
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
                            <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
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
                                  className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Typography.Paragraph className="text-[14rem] text-status-danger">
                          {
                            form.formState.errors.primary_runners?.[index]
                              ?.ticket_class?.message
                          }
                        </Typography.Paragraph>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
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
                            <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
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
                                  className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Typography.Paragraph className="text-[14rem] text-status-danger">
                          {
                            form.formState.errors.primary_runners?.[index]
                              ?.distance?.message
                          }
                        </Typography.Paragraph>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                          {t("happy_run.form.shirt_size")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <Select
                            {...form.register(`primary_runners.${index}.size`)}
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
                            <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
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
                                  className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Typography.Paragraph className="text-[14rem] text-status-danger">
                          {
                            form.formState.errors.primary_runners?.[index]?.size
                              ?.message
                          }
                        </Typography.Paragraph>
                      </FormItem>
                      <button
                        type="button"
                        className="mt-[40rem] p-[8rem] border-status-danger border-[1rem] rounded-[5rem] inline-block hover:bg-status-danger/5"
                        onClick={() => removePrimary(index)}
                      >
                        <Trash className="w-[24rem] h-[24rem] text-status-danger cursor-pointer" />
                      </button>
                    </div>
                  )}
                />
              ))}
              <Typography.Paragraph className="text-[14rem] text-status-danger">
                {form.formState.errors.primary_runners?.["root"]?.message}
              </Typography.Paragraph>
              <Button
                type="button"
                className="text-[18rem] p-[18rem] rounded-[8rem] bg-gradient-to-b from-[#1F7777] to-[#009181] italic"
                onClick={handleAddPrimaryPerson}
              >
                {t("happy_run.buttons.add_person")}
              </Button>
            </div>
          </div>
          {/* Info Parents/Guadiants */}
          <div className="info-ticket-table mb-[30rem]">
            <Typography.Heading
              className="text-white rounded-t-[30rem] bg-[#C4D03D] shadow-[inset_0rem_-5rem_10rem_0rem_#aec22e] font-extrabold text-[24rem] uppercase text-center py-[10rem] mb-[20rem]"
              level={4}
            >
              {
                event.variables?.[
                  currentLanguage === "vn"
                    ? "info_guardian_user_heading_vn"
                    : "info_guardian_user_heading_en"
                ]?.value
              }
            </Typography.Heading>
            <div className="section-2">
              {guardianFields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`guardian_runners.${index}`}
                  render={({ field }) => (
                    <div className="grid grid-cols-[repeat(6,1fr)_auto] gap-[10rem] mx-auto mb-[10rem]">
                      <FormItem className="col-span-3">
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                          {t("happy_run.form.full_name")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <Input
                            className="w-full h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem]"
                            {...form.register(
                              `guardian_runners.${index}.full_name`
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-[14rem] text-status-danger" />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
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
                            <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
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
                                  className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Typography.Paragraph className="text-[14rem] text-status-danger">
                          {
                            form.formState.errors.guardian_runners?.[index]
                              ?.ticket_class?.message
                          }
                        </Typography.Paragraph>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
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
                            <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
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
                                  className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Typography.Paragraph className="text-[14rem] text-status-danger">
                          {
                            form.formState.errors.guardian_runners?.[index]
                              ?.distance?.message
                          }
                        </Typography.Paragraph>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                          {t("happy_run.form.shirt_size")}
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <Select
                            {...form.register(`guardian_runners.${index}.size`)}
                            value={field.value.size}
                            onValueChange={(value) =>
                              field.onChange({
                                ...field.value,
                                size: value,
                              })
                            }
                          >
                            <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
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
                                  className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Typography.Paragraph className="text-[14rem] text-status-danger">
                          {
                            form.formState.errors.guardian_runners?.[index]
                              ?.size?.message
                          }
                        </Typography.Paragraph>
                      </FormItem>
                      <button
                        type="button"
                        className="mt-[40rem] p-[8rem] border-status-danger border-[1rem] rounded-[5rem] inline-block hover:bg-status-danger/5"
                        onClick={() => removeGuardian(index)}
                      >
                        <Trash className="w-[24rem] h-[24rem]  text-status-danger cursor-pointer" />
                      </button>
                    </div>
                  )}
                />
              ))}
              {guardianFields.length === 0 && (
                <Typography.Paragraph className="text-[16rem] italic !mb-[10rem] text-hr-blue">
                  {t("happy_run.form.empty_companion")}
                </Typography.Paragraph>
              )}
              <Button
                type="button"
                className="text-[18rem] p-[18rem] rounded-[8rem] bg-gradient-to-b from-[#1F7777] to-[#009181] italic"
                onClick={handleAddCompanionPerson}
              >
                {t("happy_run.buttons.add_person")}
              </Button>
            </div>
            <div className="section-3 mt-[30rem]">
              <div className="mb-[10rem]">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[30rem]">
                        {t("happy_run.form.full_name")}
                      </FormLabel>
                      <FormDescription className="text-[16rem] italic !mb-[10rem] text-hr-blue">
                        {t("happy_run.form.full_name_desc")}
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="w-full h-[30rem] !pr-[35rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem] "
                            {...field}
                            placeholder={t(
                              "happy_run.form.full_name_placeholder"
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[14rem] text-status-danger" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-[30%] justify-between">
                <FormField
                  control={form.control}
                  name={"mobile_number"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[30rem]">
                        {t("happy_run.form.mobile_number")}
                      </FormLabel>
                      <FormDescription className="text-[16rem] italic !mb-[10rem] text-hr-blue">
                        {t("happy_run.form.mobile_number_desc")}
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="w-full  h-[30rem] !pr-[35rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem] "
                            {...field}
                            placeholder={t(
                              "happy_run.form.mobile_number_placeholder"
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[14rem] text-status-danger" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"email"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[30rem]">
                        {t("happy_run.form.email")}
                      </FormLabel>
                      <FormDescription className="text-[16rem] italic !mb-[10rem] text-hr-blue">
                        {t("happy_run.form.email_desc")}
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="w-full  h-[30rem] !pr-[35rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem] "
                            {...field}
                            placeholder={t("happy_run.form.email_placeholder")}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[14rem] text-status-danger" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="section-4 mt-[30rem]">
              <div className="relative border-hr-blue border-[1rem] rounded-[5rem] bg-white min-h-[180rem] p-[20rem]">
                {[
                  ...form
                    .watch("primary_runners")
                    .map((item, index) => ({ ...item, type: "primary", index }))
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
                  <div className="flex items-center gap-x-[5rem]">
                    <Typography.Text className="text-[18rem] text-hr-blue/60 italic">
                      {`${index + 1}. ${item.full_name} -`}
                    </Typography.Text>
                    <Input
                      placeholder={t("happy_run.form.content_bib_placeholder")}
                      className="flex-1 h-[30rem] text-hr-blue/60 italic text-[18rem] border-b-[1rem] border-b-hr-blue !border-l-0 !border-r-0 !border-t-0"
                      onChange={(e) =>
                        handleChangeBIB(item.index, item.type, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <center className="mt-[20rem]">
            <Button type="submit" className="text-[40rem] p-[30rem] ">
              {t("happy_run.buttons.register_now")}
            </Button>
          </center>
        </form>
      </Form>
      <OrderConfirmModal orderData={orderData} open={openConfirmModal} />
    </div>
  );
};
