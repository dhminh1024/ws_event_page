import env from "@/config/env";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import { Button } from "@atoms/button";
import { HTMLAttributes, type FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export type Language = {
  code: string;
  name: string;
  flagUrl: string;
};

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    flagUrl: "/static/flags/en.webp",
  },
  {
    code: "vn",
    name: "Tiếng Việt",
    flagUrl: "/static/flags/vn.webp",
  },
];

export type LanguageSwitcherProps = HTMLAttributes<HTMLButtonElement> & {};

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const handleToogleLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("vn");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const currentLanguage = languages.find((l) => l.code === i18n.language);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(className)}
      onClick={handleToogleLanguage}
    >
      <img
      className="w-full h-full object-cover"
        src={cleanPath(`${env.ASSET_URL}${currentLanguage?.flagUrl}`)}
        alt={currentLanguage?.code}
        width={24}
        height={24}
      />
    </Button>
  );
};

const TabSwitcherStyled = styled.ul`
  & {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  li {
    margin: 0 2px;
    &:not(:last-child)::after {
      content: "|";
      font-weight: 200;
      color: hsl(var(--muted-foreground));
      margin-left: 5px;
    }
  }
`;

export const LanguageTabSwitcher: FC<LanguageSwitcherProps> = ({
  className,
}) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = languages.find((l) => l.code === i18n.language);

  return (
    <div className="inline-flex items-center gap-3">
      <img
        src={cleanPath(`${env.ASSET_URL}${currentLanguage?.flagUrl}`)}
        alt={currentLanguage?.code}
        width={24}
        height={24}
      />
      <TabSwitcherStyled>
        <li
          className={cn("cursor-pointer ", {
            "text-brand-orange": currentLanguage?.code === "vn",
          })}
          onClick={() => handleChangeLanguage("vn")}
        >
          VI
        </li>
        <li
          className={cn("cursor-pointer ", {
            "text-brand-orange": currentLanguage?.code === "en",
          })}
          onClick={() => handleChangeLanguage("en")}
        >
          EN
        </li>
      </TabSwitcherStyled>
    </div>
  );
};
