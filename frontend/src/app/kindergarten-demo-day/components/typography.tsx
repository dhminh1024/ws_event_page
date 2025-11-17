import React, { ReactNode } from "react";
import { cn } from "@/core/utils/shadcn-utils";

export type HeadingProps = {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Heading: React.FC<HeadingProps> = ({ children, className, level = 1 }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseStyles = "font-bold text-kdd-text";
  const sizeStyles = {
    1: "text-[11.25rem] md:text-[18.75rem]",
    2: "text-[9.375rem] md:text-[15rem]",
    3: "text-[7.5rem] md:text-[11.25rem]",
    4: "text-[6.25rem] md:text-[9.375rem]",
    5: "text-[5.625rem] md:text-[7.5rem]",
    6: "text-[5rem] md:text-[6.25rem]",
  };

  return (
    <Tag className={cn(baseStyles, sizeStyles[level], className)}>
      {children}
    </Tag>
  );
};

export type TextProps = {
  children: ReactNode;
  className?: string;
};

export const Text: React.FC<TextProps> = ({ children, className }) => {
  return (
    <p className={cn("text-[5rem] md:text-[5.625rem] text-kdd-text-secondary", className)}>
      {children}
    </p>
  );
};
