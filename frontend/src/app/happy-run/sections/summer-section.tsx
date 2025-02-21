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
        src={currentLanguage === "en" ? HSTopEN : HSTopVN}
        alt="Happy Summer"
        className="w-full"
      />
      <div className="relative">
        {!isDesktop && currentLanguage === "vn" && (
          <img src={HSImageMBVN} alt="Happy Summer" className="w-full" />
        )}
        {!isDesktop && currentLanguage === "en" && (
          <img src={HSImageMBEN} alt="Happy Summer" className="w-full" />
        )}
        {isDesktop && currentLanguage === "vn" && (
          <img src={HSImagePCVN} alt="Happy Summer" className="w-full" />
        )}
        {isDesktop && currentLanguage === "en" && (
          <img src={HSImagePCEN} alt="Happy Summer" className="w-full" />
        )}
        <div className="absolute bottom-[7%] w-[70%] left-0 right-0 m-auto">
          <div className="flex flex-col md:flex-row">
            <Link
              className="w-[80%] mx-auto md:w-[50%]"
              to={event.variables.summer_tuition_link?.value || "#"}
              target="_blank"
            >
              <img
                src={currentLanguage === "en" ? BTNTTTHEN : BTNTTTHVN}
                alt="Happy Summer"
              />
            </Link>
            <Link
              className="w-[80%] mx-auto md:w-[50%]"
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
