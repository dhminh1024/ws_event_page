import { HTMLAttributes, type FC } from "react";
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
import { ChevronDown } from "lucide-react";

export type PurchasingFormProps = HTMLAttributes<HTMLDivElement> & {};

export const PurchasingForm: FC<PurchasingFormProps> = ({ className }) => {
  const { t } = useLocales();
  const { form } = usePurchasingForm();
  const { fields, append } = useFieldArray({
    name: "runners",
    control: form.control,
  });

    console.log(form.formState.errors);

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  const handleAddField = () => {
    append({
      code: "",
      full_name: "",
      department: "",
      ticket_class: "",
      distance: "",
      size: "",
    });
  };

  return (
    <div className={cn("", className)}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`runners.${index}`}
              render={({ field }) => (
                <div className="grid grid-cols-6 gap-[20rem] mx-auto mb-[10rem]">
                  <FormItem>
                    <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                      {t("happy_run.form.user_code")}
                    </FormLabel>
                    <FormDescription />
                    <FormControl>
                      <Input
                        className="w-full h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem] uppercase"
                        {...form.register(`runners.${index}.code`)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                      {t("happy_run.form.full_name")}
                    </FormLabel>
                    <FormDescription />
                    <FormControl>
                      <Input
                        className="w-full h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem]"
                        {...form.register(`runners.${index}.full_name`)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                      {t("happy_run.form.class_department")}
                    </FormLabel>
                    <FormDescription />
                    <FormControl>
                      <Input
                        className="w-full h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[16rem] text-hr-blue py-[20rem] px-[10rem]"
                        {...form.register(`runners.${index}.department`)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                      {t("happy_run.form.ticket_class")}
                    </FormLabel>
                    <FormDescription />
                    <FormControl>
                      <Select
                        {...form.register(`runners.${index}.ticket_class`)}
                      >
                        <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
                          <SelectValue
                            className="flex-1"
                            placeholder={t("happy_run.form.ticket_class_placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent className="max-h-none bg-white">
                          {ticket_classes.map((item) => (
                            <SelectItem
                              className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                              value={item.value}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[14rem]"/>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                      {t("happy_run.form.ticket_distance")}
                    </FormLabel>
                    <FormDescription />
                    <FormControl>
                      <Select {...form.register(`runners.${index}.distance`)}>
                        <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
                          <SelectValue
                            className="flex-1"
                            placeholder="Select item"
                          />
                        </SelectTrigger>
                        <SelectContent className="max-h-none bg-white">
                          {ticket_distance.map((item) => (
                            <SelectItem
                              className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                              value={item.value}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-[16rem] text-hr-blue font-bold leading-[40rem]">
                      {t("happy_run.form.shirt_size")}
                    </FormLabel>
                    <FormDescription />
                    <FormControl>
                      <Select {...form.register(`runners.${index}.size`)}>
                        <SelectTrigger className="h-[30rem] py-[20rem] px-[10rem] w-full  bg-white border-hr-blue rounded-[5rem] text-[16rem]">
                          <SelectValue
                            className="flex-1"
                            placeholder="Select item"
                          />
                        </SelectTrigger>
                        <SelectContent className="max-h-none bg-white">
                          {shirtSizes.map((item) => (
                            <SelectItem
                              className=" text-[12rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-hr-blue cursor-pointer"
                              value={item.value}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          ))}
          <Button
            className="text-[18rem] p-[18rem] rounded-[8rem] bg-gradient-to-b from-[#1F7777] to-[#009181] italic"
            onClick={handleAddField}
          >
            {t("happy_run.buttons.add_person")}
          </Button>
          <center className="mt-[20rem]">
            <Button type="submit" className="text-[40rem] p-[20rem] h-[30rem]">
              Submit
            </Button>
          </center>
        </form>
      </Form>
    </div>
  );
};
