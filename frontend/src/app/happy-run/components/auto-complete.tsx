import {
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { Popover, PopoverContent, PopoverTrigger } from "@atoms/popover";
import { forwardRef } from "react";
import { Input } from "@atoms/input";
import { useLocales } from "@/core/hooks/use-locales";

export type AutoCompleteProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  readOnly?: boolean;
  value?: string;
  dataAutoComplete?: string[];
  onSelectValue?: (value: string) => void;
  onChange?: (value: string) => void;
};

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      className,
      dataAutoComplete = [],
      onChange,
      onSelectValue,
      readOnly,
      value,
      ...props
    },
    ref
  ) => {
    const { t } = useLocales();
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputText, setInputText] = useState<string>();
    const [open, setOpen] = useState(false);

    const handleSearch = (value: string) => {
      setInputText(value);
      onChange?.(value);
    };

    const handleBlur = () => {
      setOpen(false);
    };

    const handleSelected = (value: string) => {
      setInputText(value);
      onSelectValue?.(value);
    };

    useEffect(() => {
      // console.log(dataAutoComplete,inputRef.current,document.activeElement);

      if (inputRef.current === document.activeElement) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, [dataAutoComplete]);

    useEffect(() => {
      console.log(value);

      setInputText(value);
    }, [value]);

    return (
      <div className="relative">
        <Input
          className="w-full h-[16rem] md:h-[30rem] bg-white border-hr-blue rounded-[5rem] text-[8rem] md:text-[16rem] text-hr-blue p-[10rem_5rem] md:py-[20rem] md:px-[10rem]"
          ref={inputRef}
          value={inputText}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={handleBlur}
          autoComplete="off"
          readOnly={readOnly}
        />
        <Popover
          open={open}
          render
          onOpenChange={(isOpen: boolean) => setOpen(isOpen)}
        >
          <PopoverTrigger asChild>
            <button className="absolute bottom-0 left-0 w-full h-[40rem] z-[-1]"></button>
          </PopoverTrigger>
          <PopoverContent
            forceMount
            onOpenAutoFocus={(e: any) => e.preventDefault()}
            onCloseAutoFocus={(e: any) => e.preventDefault()}
            // align={align}
            className={cn("w-full p-0 bg-white")}
            style={{
              width:
                (inputRef?.current && inputRef?.current.offsetWidth) || 100,
            }}
          >
            <div className="flex flex-col overflow-x-hidden max-h-[30vh]">
              {dataAutoComplete.map((item) => {
                return (
                  <div
                    key={item}
                    className="flex justify-between text-hr-primary text-left p-[5rem_10rem] text-[8rem] md:text-[14rem] border-hr-primary w-full rounded-[5rem] bg-white hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleSelected(item)}
                  >
                    {item}
                  </div>
                );
              })}
              {dataAutoComplete.length === 0 && (
                <div className="text-hr-primary text-left p-[5rem_10rem] text-[8rem] md:text-[14rem] border-hr-primary w-full rounded-[5rem] bg-white">
                 {t("common.search_empty")}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

AutoComplete.displayName = "AutoComplete";
