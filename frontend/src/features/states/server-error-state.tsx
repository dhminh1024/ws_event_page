import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { Plug, Plugs } from "phosphor-react";
import Announcement from "@molecules/announcement";
import { useLocales } from "@/core/hooks/use-locales";

type Props = HTMLAttributes<HTMLDivElement> & {};

export default function ServerErrorState({ className }: Props) {
  const { t } = useLocales();
  return (
    <div className={clsx("flex items-center pb-20 w-full h-screen", className)}>
      <Announcement
        icon={<Plugs size={120} />}
        title={t("components.notification.server_error.heading")}
        subtitle={t("components.notification.server_error.description")}
      />
    </div>
  );
}
