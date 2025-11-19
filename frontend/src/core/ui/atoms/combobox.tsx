import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@atoms/command";
import { Popover, PopoverContent, PopoverTrigger } from "@atoms/popover";
import { Button } from "@atoms/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { removeAccents } from "@/lib/utils/common";
import { Input } from "./input";

export type SelectItemType = {
  heading?: string;
  children?: SelectItemType[];
  label?: string;
  value?: string;
};

export type GroupItemType = {
  heading?: string;
  children?: SelectItemType[];
};

export type ComboboxItemsType = SelectItemType[];

export type ComboboxProps = {
  id?: string;
  className?: string;
  dropdownClassName?: string;
  items?: ComboboxItemsType;
  placeholder?: string;
  searchPlaceholder?: string;
  prefixSelected?: ReactNode;
  emptyContent?: ReactNode;
  defaultValue?: string;
  value?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  align?: "center" | "end" | "start";
  searchable?: boolean;
};

export const Combobox: FC<ComboboxProps> = ({
  id,
  className,
  dropdownClassName,
  items = [],
  placeholder = "Select items",
  searchPlaceholder = "Search item...",
  prefixSelected,
  emptyContent = "Not found data",
  defaultValue,
  value,
  onSelect,
  disabled,
  align = "start",
  searchable = true,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState<SelectItemType>();

  //   console.log(value)
  const handleSelect = (item: SelectItemType) => {
    if (item.value && item.value !== itemSelected) {
      !value && setItemSelected(item);
      onSelect?.(item.value);
    }
    setOpen(false);
  };

  const handleFilter = (value: string, search: string) => {
    if (removeAccents(value).includes(removeAccents(search))) return 1;
    return 0;
  };

  const findItemOption = (
    key: string,
    options: ComboboxItemsType
  ): SelectItemType | undefined => {
    let targetItem;
    options?.forEach((item) => {
      if (item.children) {
        item.children?.forEach((child) => {
          if (child.value === key) {
            targetItem = child;
            return;
          }
        });
      } else {
        if (item.value === key) {
          targetItem = item;
          return;
        }
      }
    });
    return targetItem;
  };

  useEffect(() => {
    if (value && items && items?.length > 0) {
      // console.log("VALUE targetItem",targetItem);
      let targetItem = findItemOption(value, items);
      setItemSelected(targetItem);
    }
    if (!value && itemSelected) {
      setItemSelected(undefined);
    }
  }, [value, JSON.stringify(items)]);

  useEffect(() => {
    if (defaultValue && !itemSelected) {
      let targetItem = findItemOption(defaultValue, items);
      setItemSelected(targetItem);
      // targetItem?.value && onSelect?.(targetItem.value)
    }
  }, [defaultValue, JSON.stringify(items)]);

  return (
    <Popover
      open={open}
      modal={true}
      onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) =>
        !disabled && setOpen(open)
      }

    >
      <PopoverTrigger asChild>
        <div className="" ref={buttonRef as React.RefObject<HTMLDivElement>}>
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "flex h-10 justify-between bg-transparent text-left",
              className
            )}
          >
            <p className="line-clamp-1">
              {prefixSelected}
              {itemSelected ? itemSelected.label : placeholder}
            </p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn("w-full p-0", dropdownClassName)}
        style={{
          width: (buttonRef.current && buttonRef.current.offsetWidth) || 100,
        }}
      >
        <Command filter={handleFilter}>
          {items.length > 0 && searchable && (
            <CommandInput placeholder={searchPlaceholder} />
          )}

          <CommandList>
            {items.length === 0 && (
              <div className="w-full p-2 text-center text-foreground">
                {emptyContent}
              </div>
            )}
            {items?.map((item, index) => {
              if (item?.children && item.children.length > 0) {
                return (
                  <CommandGroup
                    heading={item.heading}
                    key={`${item.heading}${index}`}
                  >
                    {item.children.map((child, index) => (
                      <CommandItem
                        className="data-[disabled='true']:pointer-events-none data-disabled:pointer-events-auto! data-[disabled='true']:opacity-50 data-disabled:opacity-100!"
                        key={`${item.value}_${index}`}
                        // value={child.value}
                        onSelect={() => handleSelect(child)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            itemSelected?.value === child.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {child.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              }
              return (
                <CommandItem
                  className="data-[disabled='true']:pointer-events-none data-disabled:pointer-events-auto! data-[disabled='true']:opacity-50 data-disabled:opacity-100!"
                  key={`${item.value}${index}`}
                  //   value={item.value}
                  onSelect={() => handleSelect(item)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      itemSelected?.value === item.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
