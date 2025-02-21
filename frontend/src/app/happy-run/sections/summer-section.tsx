import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import HSImagePCVN from "@happy-run/assets/images/happy-summer-pc-vn.webp";
import HSImagePCEN from "@happy-run/assets/images/happy-summer-pc-en.webp";
import HSImageMBVN from "@happy-run/assets/images/happy-summer-mb-vn.webp";
import HSImageMBEN from "@happy-run/assets/images/happy-summer-mb-en.webp";
import HSTopVN from "@happy-run/assets/images/HS-top-vn.webp";
import HSTopEN from "@happy-run/assets/images/HS-top-en.webp";
import BTNDKTHVN from "@happy-run/assets/images/btn-dkth-vn.png";
import BTNDKTHEN from "@happy-run/assets/images/btn-dkth-en.png";
import BTNTTTHVN from "@happy-run/assets/images/btn-ttth-vn.png";
import BTNTTTHEN from "@happy-run/assets/images/btn-ttth-en.png";

import { useResponsive } from "@/core/hooks/use-reponsive";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { Link } from "react-router-dom";

export type SummerSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const SummerSection: FC<SummerSectionProps> = ({
  className,
  ...props
}) => {
  const { currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const event = useEventPageContext();
  return (
    <div className={cn("bg-[#EA6E21] ", className)} {...props}>
      <img
        src={event.variables?.[`summer_top_${currentLanguage}`]?.value || ""}
        alt="Happy Summer"
        className="w-full"
      />
      <div className="relative">
        <img
          src={
            event.variables?.[
              `summer_background_${isDesktop ? "pc" : "mb"}_${currentLanguage}`
            ]?.value || ""
          }
          alt="Happy Summer"
          className="w-full"
        />
        <div className="absolute bottom-[7%] w-[80%] md:w-[70%] left-0 right-0 m-auto">
          <div className="flex flex-row">
            <Link
              className="w-[50%] mx-auto md:w-[50%]"
              to={event.variables.summer_tuition_link?.value || "#"}
              target="_blank"
            >
              <img
                src={currentLanguage === "en" ? BTNTTTHEN : BTNTTTHVN}
                alt="Happy Summer"
              />
            </Link>
            <Link
              className="w-[50%] mx-auto md:w-[50%]"
              to={event.variables.summer_camp_registration_link?.value || "#"}
              target="_blank"
            >
              <img
                src={currentLanguage === "en" ? BTNDKTHEN : BTNDKTHVN}
                alt="Happy Summer"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
