import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";

export type FireworkProps = HTMLAttributes<HTMLDivElement> & {};

export const Firework: FC<FireworkProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div className="firework" id="firework1">
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
      </div>
      <div className="firework" id="firework2">
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
      </div>
      <div className="firework" id="firework3">
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
        <div className="explosion"></div>
      </div>
    </div>
  );
};
