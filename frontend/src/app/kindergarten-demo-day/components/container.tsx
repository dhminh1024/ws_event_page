import React, { ReactNode } from "react";
import { cn } from "@/core/utils/shadcn-utils";

export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("container mx-auto px-[5rem] md:px-[10rem] lg:px-[20rem]", className)}>
      {children}
    </div>
  );
};
