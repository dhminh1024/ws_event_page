import { HTMLAttributes, useEffect, useRef, useState, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { Popover, PopoverContent, PopoverTrigger } from "@atoms/popover";
import { forwardRef } from "react";
import { Input } from "@atoms/input";
import { removeAccents } from "@/lib/utils/common";

export type AutoCompleteProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  dataAutoComplete?: string[];
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  ({ className, dataAutoComplete = [], onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputText, setInputText] = useState<string>();
    const [open, setOpen] = useState(false);
    // const [itemSelected, setItemSelected] = useState<SelectItemType>();

    const handleSearch = (value: string) => {
      setInputText(value);
      onChange?.(value);
    };

    useEffect(() => {
      if(dataAutoComplete.length > 0) {
        setOpen(true);
      }
    }, [dataAutoComplete])
    

    return (
      <div className="relative">
        <Popover
          open={open}
          modal={true}
          onOpenChange={(open: boolean) => !disabled && setOpen(open)}
        >
          <PopoverTrigger>
            <Input
              className="w-full h-[16rem] md:h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem]"
              ref={inputRef}
              value={inputText}
              autoComplete="off"
              onChange={(e) => handleSearch(e.target.value)}
              {...props}
            />
          </PopoverTrigger>
          <PopoverContent
            // align={align}
            className={cn("w-full p-0")}
            style={{
              width:
                (inputRef?.current && inputRef?.current.offsetWidth) || 100,
            }}
          >
            <div className="flex flex-col">
              {dataAutoComplete.map((item) => {
                return (
                  <div
                    key={item}
                    className="flex justify-between text-left text-[22rem] border-hr-primary w-full rounded-[5rem] bg-white"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

AutoComplete.displayName = "AutoComplete";
