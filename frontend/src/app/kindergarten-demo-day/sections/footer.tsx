import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";
import { Container } from "../components/container";

export type FooterProps = HTMLAttributes<HTMLDivElement> & {};

export const Footer: FC<FooterProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();

  return (
    <div className={cn("bg-kdd-primary text-white py-[15rem] md:py-[20rem]", className)}>
      <Container>
        <div className="text-center space-y-[5rem]">
          <p className="text-[5.625rem] md:text-[6.25rem] font-semibold">
            {currentLanguage === "vn" ? "Wellspring Sài Gòn" : "Wellspring Saigon"}
          </p>
          <p className="text-[4.375rem] md:text-[5rem] opacity-90">
            {currentLanguage === "vn"
              ? "© 2025 Wellspring Sài Gòn. Bảo lưu mọi quyền."
              : "© 2025 Wellspring Saigon. All rights reserved."}
          </p>
        </div>
      </Container>
    </div>
  );
};
