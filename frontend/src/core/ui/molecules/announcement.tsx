import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  className?: string;
  icon?: string | ReactNode;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  action?: ReactNode;
  hidden?: boolean;
};

export default function Announcement({
  className,
  icon,
  title,
  subtitle,
  action,
  hidden,
}: Props) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center",
        className
      )}
      hidden={hidden}
    >
      {icon}
      <div className="mb-2 text-4xl font-bold text-foreground">{title}</div>
      <div className="text-xl text-muted-foreground"> {subtitle}</div>
      {action}
    </div>
  );
}
