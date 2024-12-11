import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import Announcement from "@molecules/announcement";
import { Plugs, Prohibit, SunHorizon } from "phosphor-react";
import { useLocales } from "@/core/hooks/use-locales";

type Props = HTMLAttributes<HTMLDivElement> & {};

export default function ForbiddenState({ className }: Props) {
  const { t } = useLocales();
  return (
    <div
      className={clsx(
        "flex h-screen w-full items-center justify-center pb-20",
        className
      )}
    >
      <Announcement
        icon={
          <Prohibit size={120} className="text-brand-teal/30" weight="fill" />
        }
        title={
          <p className="text-lg md:text-2xl">
            {t("components.notification.forbbiden.heading")}
          </p>
        }
        subtitle={
          <p className="text-sm md:text-base">
            {t("components.notification.forbbiden.description")}
          </p>
        }
      />
    </div>
  );
}
