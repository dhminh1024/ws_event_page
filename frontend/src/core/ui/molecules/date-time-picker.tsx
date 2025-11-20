import { cn } from '@/core/utils/shadcn-utils'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Calendar } from '@atoms/calendar'
import { Popover, PopoverContent } from '@atoms/popover'
import { PopoverContentProps, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@atoms/button'
import { format } from 'date-fns'
import { Matcher } from 'react-day-picker'
import { getDateLocale } from '@/lib/utils/common'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import { months, years } from '@/constants/calendar'
import { useLocales } from '@/core/hooks/use-locales'

type Props = PropsWithChildren & {
  className?: string
  value?: Date
  onChange?: (d: Date) => void
  type?: 'date' | 'date-time'
  disabled?: Matcher | Matcher[] | undefined
  contentProps?: PopoverContentProps
}

// Not used
export default function DateTimePicker({
  className,
  type = 'date',
  value,
  disabled,
  onChange,
  children,
  contentProps,
}: Props) {
  const { currentLanguage, t } = useLocales()
  const [date, setDate] = useState<Date>(value || new Date())
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState<number>()
  const [year, setYear] = useState<number>()

  const handleSelectDate = (dateValue: Date) => {
    setDate(dateValue)
    onChange?.(dateValue)
    setOpen(false)
  }

  const handleChangeMonth = (str_month: string) => {
    console.log(str_month)

    const month = parseInt(str_month)
    let d = date
    d.setMonth(month - 1)
    setMonth(month)
    setDate(d)
  }

  const handleChangeYear = (str_year: string) => {
    const year = parseInt(str_year)
    let d = date
    d.setFullYear(year)
    setYear(year)
    setDate(d)
  }

  const handleCalendarChange = (date: Date) => {
    const now = new Date()
    if (date.getFullYear() > now.getFullYear() + 20) return
    setMonth(date.getMonth() + 1)
    setYear(date.getFullYear())
  }

  useEffect(() => {
    if (value && value?.getTime() !== date.getTime()) {
      setDate(value)
    }
  }, [value])

  useEffect(() => {
    if (!open) {
      // Don't call onChange on close unless value was explicitly selected
      // onChange is already called in handleSelectDate when user picks a date
    } else {
      handleCalendarChange(date)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" {...contentProps}>
        <div className={cn('relative inline-block', className)}>
          <div className="flex justify-center">
            <Button onClick={() => handleSelectDate(new Date())} variant="link">
              {t('common.today')}
            </Button>
            <Select value={month?.toString()} onValueChange={handleChangeMonth}>
              <SelectTrigger className="w-auto !border-0 !bg-transparent !shadow-none !outline-none !ring-0 !ring-offset-0">
                <SelectValue
                  placeholder={t('components.inputs.month.placeholder')}
                />
              </SelectTrigger>
              <SelectContent>
                {months[currentLanguage].map((m) => (
                  <SelectItem
                    key={m.number.toString()}
                    value={m.number.toString()}
                  >
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year?.toString()} onValueChange={handleChangeYear}>
              <SelectTrigger className="w-auto !border-0 !bg-transparent !shadow-none !outline-none !ring-0 !ring-offset-0">
                <SelectValue
                  placeholder={t('components.inputs.year.placeholder')}
                />
              </SelectTrigger>
              <SelectContent>
                {years(
                  new Date().getFullYear() - 100,
                  new Date().getFullYear() + 20,
                ).map((y) => (
                  <SelectItem key={y.toString()} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <center>
            <Calendar
              key={date?.getTime()}
              className="inline-block"
              mode="single"
              defaultMonth={date}
              selected={date}
              onSelect={(d) => d && handleSelectDate(d)}
              initialFocus
              disabled={disabled}
              onMonthChange={handleCalendarChange}
              locale={getDateLocale(currentLanguage)}
            />
          </center>
        </div>
      </PopoverContent>
    </Popover>
  )
}
