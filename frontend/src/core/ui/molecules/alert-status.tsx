import clsx from "clsx";
import React, { HTMLAttributes, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@atoms/alert";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CircleX,
  Info,
} from "lucide-react";

type Props = AlertContentType & {
  className?: string;
};

export type AlertContentType = {
  message: ReactNode;
  desc?: ReactNode;
  type?: "success" | "error" | "warning" | "info";
  icon?: boolean;
};

export default function AlertStatus({
  className,
  message,
  desc,
  type,
  icon = true,
}: Props) {
  const ClassTextColors = {
    "text-brand-green": type === "success",
    "text-brand-red": type === "error",
    "text-brand-yellow": type === "warning",
    "text-brand-blue": type === "info",
  };
  if (!message) return null;
  return (
    <Alert
      className={clsx(
        {
          "border-brand-green bg-brand-green/10": type === "success",
          "border-brand-red bg-brand-red/10": type === "error",
          "border-brand-yellow bg-brand-yellow/10": type === "warning",
          "border-brand-blue bg-brand-blue/10": type === "info",
        },
        className
      )}
    >
      {icon && type === "error" && (
        <CircleX className="h-4 w-4 !text-brand-red" />
      )}
      {icon && type === "success" && (
        <CheckCircle className="h-4 w-4 !text-brand-green" />
      )}
      {icon && type === "warning" && (
        <AlertTriangle className="h-4 w-4 !text-brand-yellow" />
      )}
      {icon && type === "info" && <Info className="!text-brand-blue h-4 w-4" />}
      <AlertTitle className={clsx(ClassTextColors)}>{message}</AlertTitle>
      {desc && (
        <AlertDescription className={clsx("text-xs", ClassTextColors)}>
          {desc}
        </AlertDescription>
      )}
    </Alert>
  );
}
