import { HTMLAttributes, use, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "../components/section-heading";
import { useLocales } from "@/core/hooks/use-locales";
import KitTitle from "@happy-run/assets/images/kit-title.png";
import Typography from "@/app/happy-box/components/typography";
import parser from "html-react-parser";
import { SVGCustomRectangle } from "../components/svg";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

export type KitSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const KitSection: FC<KitSectionProps> = ({ className }) => {
  const { t } = useLocales();
  const events = useEventPageContext();
  return (
    <div className={cn(className)}>
      <div className="w-[90%] mx-auto py-[60rem]">
        <SectionHeading
          //   ref={headingRef}
          className="text-[25rem] px-[70rem] italic font-extrabold mb-[50rem]"
        >
          {t("happy_run.kit_heading")}
        </SectionHeading>
        <center>
          <img src={KitTitle} alt="kit" className="w-[70%] mx-auto" />
          <Typography.Paragraph className="text-center text-[23rem] text-hr-blue font-extrabold mt-[40rem]">
            {parser(t("happy_run.kit_description"))}
          </Typography.Paragraph>
          <Typography.Paragraph className="text-center text-[23rem] text-hr-blue font-semibold">
            {t("happy_run.kit_meta")}
          </Typography.Paragraph>
        </center>
        <div className="kits mt-[120rem] w-[80%] mx-auto">
          <div className="flex justify-center items-center gap-x-[120rem]">
            <KitItem
              className="w-[25%] bg-gradient-to-tr from-brand-teal/50 to-brand-persian "
              itemImage={events?.variables.item_tickets?.value}
            />
            <KitItem
              className="w-[25%] bg-gradient-to-tr from-brand-honey/50 to-brand-lime"
              itemImage={events?.variables.item_tshirt?.value}
            />
            <KitItem
              className="w-[25%]"
              itemImage={events?.variables.item_medals?.value}
            />
          </div>
          <div className="flex justify-center items-center gap-x-[120rem]">
            <KitItem
              className="w-[25%]"
              itemImage={events?.variables.item_hat?.value}
            />
            <KitItem
              className="w-[25%]"
              itemImage={events?.variables.item_bottle?.value}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const KitItem: FC<HTMLAttributes<HTMLDivElement> & { itemImage?: string }> = ({
  className,
  itemImage,
}) => {
  return (
    <div
      className={cn(
        "relative aspect-square w-full h-full bg-brand-persian rounded-[40rem] shadow-[inset_0rem_0rem_20rem_10rem_#00000044] rotate-45",
        className
      )}
    >
      <SVGCustomRectangle
        strokeSize={"0.2vw"}
        strokeDasharray={"20"}
        className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[90%] h-[90%]"
      />
      {itemImage && (
        <img
          src={itemImage}
          className="absolute w-[65%] rotate-[-45deg] h-[75%] object-contain top-[-10rem] left-0 right-0 bottom-0 m-auto "
          alt=""
        />
      )}
    </div>
  );
};
