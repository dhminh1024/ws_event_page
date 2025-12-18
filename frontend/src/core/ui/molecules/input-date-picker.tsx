import { useState, useEffect, useRef, type FC } from "react";
import { Input } from "@atoms/input";
import DateTimePicker from "@molecules/date-time-picker";
import { CalendarIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { cn } from "@/core/utils/shadcn-utils";

export interface InputDateTimeProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: "date" | "date-time";
  className?: string;
  /**
   * Format for displaying and parsing the date
   * @default 'DD/MM/YYYY' for date, 'DD/MM/YYYY HH:mm' for datetime
   */
  dateFormat?: string;
  /**
   * Allow clearing the value
   * @default true
   */
  allowClear?: boolean;
  /**
   * Disable auto-focus after picker selection or clear
   * @default false
   */
  disableAutoFocus?: boolean;
  hidden?: boolean;
}

/**
 * InputDateTime Component - Ant Design Style
 *
 * Mimics Ant Design's DatePicker behavior:
 * - Integrated calendar icon inside input (right side)
 * - Click input or icon to open picker
 * - Type to input date directly
 * - Auto-format on blur
 * - Clear button when hovering (if allowClear)
 * - Validates input as you type
 *
 * @example
 * ```tsx
 * <InputDateTime
 *   value={dateValue}
 *   onChange={(date) => setDateValue(date)}
 *   placeholder="DD/MM/YYYY"
 *   type="date"
 * />
 * ```
 */
export const InputDateTime: FC<InputDateTimeProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "date",
  dateFormat,
  className,
  allowClear = true,
  disableAutoFocus = true,
  hidden = false,
}) => {
  // Default format based on type (uppercase to match Ant Design)
  const defaultFormat =
    type === "date-time" ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy";
  const formatStr = dateFormat || defaultFormat;
  const placeholderStr = placeholder || formatStr.toUpperCase();

  // Internal state for the text input
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input value when external value changes
  useEffect(() => {
    if (value && isValid(value)) {
      setInputValue(format(value, formatStr));
    } else if (!isFocused) {
      // Only clear if not focused to avoid disrupting typing
      setInputValue("");
    }
  }, [value, formatStr, isFocused]);

  // Handle input text change (Ant Design: parse as you type)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);

    // Don't validate while typing - just update display
    // Validation happens on blur or picker selection
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  // Handle input blur - validate and format (Ant Design behavior)
  const handleInputBlur = () => {
    setIsFocused(false);

    if (!inputValue || inputValue.trim() === "") {
      setInputValue("");
      onChange?.(null);
      return;
    }

    try {
      // Try to parse with the specified format
      const parsedDate = parse(inputValue, formatStr, new Date());
      if (isValid(parsedDate)) {
        // Valid date - format it properly and update
        setInputValue(format(parsedDate, formatStr));
        onChange?.(parsedDate);
      } else {
        // Invalid format - restore previous valid value or clear
        if (value && isValid(value)) {
          setInputValue(format(value, formatStr));
        } else {
          setInputValue("");
          onChange?.(null);
        }
      }
    } catch {
      // Parse error - restore previous valid value or clear
      if (value && isValid(value)) {
        setInputValue(format(value, formatStr));
      } else {
        setInputValue("");
        onChange?.(null);
      }
    }
  };

  // Handle date picker change
  const handlePickerChange = (date: Date | undefined) => {
    if (date && isValid(date)) {
      setInputValue(format(date, formatStr));
      onChange?.(date);
    } else {
      setInputValue("");
      onChange?.(null);
    }
    // Only focus if auto-focus is not disabled
    if (!disableAutoFocus) {
      inputRef.current?.focus();
    }
  };

  // Handle clear button click - use onMouseDown to prevent blur
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent input blur
    e.stopPropagation(); // Stop propagation
    setInputValue("");
    onChange?.(null);
    // Only focus after clearing if auto-focus is not disabled
    if (!disableAutoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // Show clear button when hovering and has value
  const showClear = allowClear && isHovered && inputValue && !disabled;

  return (
    <DateTimePicker
      value={value || undefined}
      onChange={handlePickerChange}
      type={type}
    >
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        hidden={hidden}
      >
        {/* Wrapper for input + suffix icons */}
        <div className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholderStr}
            disabled={disabled}
            className={cn("pr-10", className)}
          />

          {/* Suffix Icons Container */}
          <div className="pointer-events-none absolute right-0 top-0 flex h-full items-center pr-3">
            {/* Clear Button (shows on hover if has value) */}
            {showClear && (
              <button
                type="button"
                onMouseDown={handleClear}
                className="pointer-events-auto flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                tabIndex={-1}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <path d="M6 4.586L9.293 1.293a1 1 0 111.414 1.414L7.414 6l3.293 3.293a1 1 0 01-1.414 1.414L6 7.414l-3.293 3.293a1 1 0 01-1.414-1.414L4.586 6 1.293 2.707a1 1 0 011.414-1.414L6 4.586z" />
                </svg>
              </button>
            )}

            {/* Calendar Icon (always visible when no clear button) */}
            {!showClear && (
              <div className="pointer-events-auto flex h-4 w-4 items-center justify-center text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </DateTimePicker>
  );
};
