import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import LogoPrimary from "@happy-box/assets/images/logo_primary.png";
import LogoHappyJourney from "@happy-box/assets/images/logo_happy_journey.png";
import Typography from "@happy-box/components/typography";
import { LanguageSelector } from "@happy-box/components/language-selector";

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {};

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <div className={cn("h-[100rem] flex justify-between gap-x-[20rem]", className)}>
      <div className="flex items-center gap-[20rem]">
      <img src={LogoPrimary} className="h-[70%] w-auto" alt="Logo" />
        <img src={LogoHappyJourney} className="h-[70%] w-auto" alt="Logo" />
      </div>
      <div className="flex items-center gap-x-[20rem]">
        <Typography.Text className="text-[16rem]">Ngôn ngữ</Typography.Text>
        <LanguageSelector />
      </div>
    </div>
  );
};
