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

export type PurchasingFormProps = HTMLAttributes<HTMLDivElement> & {};

export const PurchasingForm: FC<PurchasingFormProps> = ({ className }) => {
  const { form } = usePurchasingForm();
  const { fields, append } = useFieldArray({
    name: "runners",
    control: form.control,
  });

//   console.log(fields);

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  const handleAddField = () => {
    append({
      full_name: "",
      size: "",
    })
  }

  return (
    <div className={cn("py-[20rem]", className)}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`runners.${index}`}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-[20rem] max-w-[500rem] mx-auto my-[10rem]">
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormDescription />
                    <FormControl>
                      <Input
                        className="w-full h-[30rem] text-[30rem] py-[20rem]  text-center"
                        {...form.register(`runners.${index}.full_name`)}

                        // {...form.register(`stops.${index}.city`)}
                        // defaultValue={field.name}
                       
                        // onBlur={(e) => field.onBlur(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormDescription />
                    <FormControl>
                      <Input
                        className="w-full h-[30rem] text-[30rem] py-[20rem] text-center"
                        {...form.register(`runners.${index}.size`)}
                       
                        // defaultValue={field.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          ))}
          <center className="mt-[20rem]">
            <Button className="text-[40rem] p-[20rem] h-[30rem]" onClick={handleAddField}>
              + Add Field
            </Button>
          </center>
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
