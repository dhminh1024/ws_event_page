import { HTMLAttributes,type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import Typography from '@/app/happy-box/components/typography'

export type SummerSectionProps = HTMLAttributes<HTMLDivElement> & {}

export const SummerSection: FC<SummerSectionProps> = ({ className, ...props }) => {
  return <div className={cn("bg-[#EA6E21] h-[200rem] md:h-[500rem] flex items-center justify-center",className)} {...props}>
    <Typography.Paragraph className="text-center font-raceChampion text-[20rem] md:text-[80rem] text-white font-extrabold leading-[1]">
        HAPPY SUMMER 2025
    </Typography.Paragraph>
  </div>
}
