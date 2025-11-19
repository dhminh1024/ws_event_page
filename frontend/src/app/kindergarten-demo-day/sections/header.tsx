import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import { Container } from "../components/container";

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {};

export const Header: FC<HeaderProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();

  return (
    <div className={cn("bg-kdd-primary py-[7.5rem] md:py-[10rem] relative", className)}>
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[5rem]">
            <h1 className="text-white text-[6.25rem] md:text-[9.375rem] font-bold">
              {currentLanguage === "vn" ? "Ngày Hội Mẫu Giáo" : "Kindergarten Demo Day"}
            </h1>
          </div>
          <div className="flex items-center">
            {/* Language selector can be added here if needed */}
          </div>
        </div>
      </Container>
    </div>
  );
};
