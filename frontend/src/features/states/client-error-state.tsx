import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { LockKey, Plug, Plugs, SmileyXEyes } from "phosphor-react";
import { Button } from "@atoms/button";
import { useNavigate } from "react-router-dom";
import Announcement from "@molecules/announcement";
import { useLocales } from "@/core/hooks/use-locales";

type Props = HTMLAttributes<HTMLDivElement> & {};

export default function ClientErrorState({ className }: Props) {
  const { t } = useLocales();
  const navigate = useNavigate();

  const handleRefresh = async () => {
    window.location.reload();
  };

  return (
    <div className={clsx("h-screen w-full ", className)}>
      <div className="flex h-full w-full items-center justify-center px-10">
        <Announcement
          className="text-brand-primary"
          icon={
            <SmileyXEyes
              className="text-primary opacity-70"
              weight="duotone"
              size={120}
            />
          }
          title={
            <p className="text-lg md:text-2xl">
              {t("components.notifications.client_error.heading")}
            </p>
          }
          subtitle={
            <p className="text-sm md:text-base">
              {t("components.notifications.client_error.description")}
            </p>
          }
          action={
            <Button className="mt-5" size="lg" onClick={handleRefresh}>
              {t("components.buttons.refresh_page")}
            </Button>
          }
        />
      </div>
    </div>
  );
}
