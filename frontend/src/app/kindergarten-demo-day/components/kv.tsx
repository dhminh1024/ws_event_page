import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import BackgroundDesktop from "../assets/images/kv-bg-desktop.png";
import BackgroundMobile from "../assets/images/kv-bg-mobile.png";
import LogoPrimary from "../assets/images/cert-logo-primary.png";
import KVContent from "../assets/images/kv-content.png";
import { useResponsive } from "@/core/hooks/use-reponsive";
export type KvProps = HTMLAttributes<HTMLDivElement> & {
  logoBrand?: string;
};

export const Kv: FC<KvProps> = ({ className, logoBrand }) => {
  const { isDesktop } = useResponsive();
  return (
    <div
      className={cn("w-full aspect-video", className)}
      style={{
        backgroundImage: `url(${
          isDesktop ? BackgroundDesktop : BackgroundMobile
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center gap-[5%] md:gap-[2%] relative top-[2%] md:top-[8%] right-0 left-0 mx-auto h-[8%] md:h-[15%]">
        <div className="w-[50%] h-[80%]">
          <img
            src={LogoPrimary}
            alt="Logo"
            className={cn("w-full h-full object-contain object-right",{
                "object-center": !logoBrand,
            })}
          />
        </div>

        {logoBrand && (
          <div className="w-[50%] h-[80%]">
            <img
              src={logoBrand}
              className="w-full h-full object-contain object-left"
              alt=""
            />
          </div>
        )}
      </div>
      <div className="h-[25%] md:h-[50%] relative top-[10%] left-0 right-0 mx-auto">
        <img
          src={KVContent}
          alt="KV Content"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
