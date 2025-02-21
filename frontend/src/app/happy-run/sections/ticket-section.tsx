import { HTMLAttributes, useEffect, useRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "../components/section-heading";
import { useLocales } from "@/core/hooks/use-locales";
import Typography from "@/app/happy-box/components/typography";
import TicketWellbeingImage from "@happy-run/assets/images/ticket-well-being.png";
import TicketHappyRunImage from "@happy-run/assets/images/ticket-happy-run.png";
import { useHRSettings } from "../context/use-settings";
import gsap from "gsap";
import { PrimaryButton } from "../components/button";
import { ItemModal } from "../components/item-modal";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { Link } from "react-router-dom";

export type TicketSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const TicketSection: FC<TicketSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const { settings } = useHRSettings();
  const event = useEventPageContext();
  const ticket1Ref = useRef(null);
  const ticketReflective1Ref = useRef(null);
  const ticketReflectiveRounded1Ref = useRef(null);

  const ticket2Ref = useRef(null);
  const ticketReflective2Ref = useRef(null);
  const ticketReflectiveRounded2Ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (!ticket1Ref.current) return;
      gsap
        .timeline({ repeat: -1, yoyo: true })
        .fromTo(
          ticket1Ref.current,
          { rotateX: 10, rotateY: 0 },
          { rotateX: -5, rotateY: 10, duration: 5, ease: "none" }
        );
      gsap
        .timeline({ repeat: -1, yoyo: true })
        .fromTo(
          ticketReflective1Ref.current,
          { x: 30, y: 0, opacity: 1 },
          { x: -30, y: 50, opacity: 0, duration: 5, ease: "none" }
        );
      gsap
        .timeline({ repeat: -1, yoyo: true })
        .fromTo(
          ticketReflectiveRounded1Ref.current,
          { x: "150%", y: "100%", opacity: 1 },
          { x: "-50%", y: "-50%", opacity: 0.5, duration: 5, ease: "none" }
        );
      gsap
        .timeline({ repeat: -1, yoyo: true })
        .fromTo(
          ticket2Ref.current,
          { rotateX: 10, rotateY: 5 },
          { rotateX: -10, rotateY: -5, duration: 5, ease: "none" }
        );
      gsap
        .timeline({ repeat: -1, yoyo: true })
        .fromTo(
          ticketReflective2Ref.current,
          { x: 50, y: 0, opacity: 1 },
          { x: -50, y: 50, opacity: 0.5, duration: 5, ease: "none" }
        );
      gsap
        .timeline({ repeat: -1, yoyo: true })
        .fromTo(
          ticketReflectiveRounded2Ref.current,
          { x: "-50%", y: "80%", opacity: 1 },
          { x: "50%", y: "0%", opacity: 0.2, duration: 5, ease: "none" }
        );
    }, 200);
  }, []);

  return (
    <div className={cn("bg-hr-lime py-[40rem]", className)}>
      <div className="w-[90%] mx-auto">
        <SectionHeading
          //   ref={headingRef}
          className="text-[10rem] md:text-[30rem] py-[3rem] md:py-[8rem] px-[35rem] md:px-[100rem] italic font-extrabold mb-[20rem] md:mb-[50rem]"
        >
          {t("happy_run.ticket_heading")}
        </SectionHeading>
        <center>
          <Typography.Paragraph className="text-[9rem] md:text-[20rem] text-hr-blue">
            {t("happy_run.ticket_description")}
          </Typography.Paragraph>
        </center>
        <div
          className="flex gap-x-[2%] md:gap-x-[10%] justify-center py-[20rem] md:py-[40rem]"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <ItemModal
            content={(close) => (
              <div className="relative">
                <img
                  className="w-full"
                  src={
                    event.variables?.[
                      currentLanguage === "en"
                        ? "ticket_well_being_detail_en"
                        : "ticket_well_being_detail_vn"
                    ]?.value
                  }
                  alt="ticket image"
                />
                <div
                  className="w-[5%] h-[5%] absolute top-0 right-0"
                  onClick={close}
                ></div>
              </div>
            )}
          >
            <div
              ref={ticket1Ref}
              className="relative overflow-hidden rounded-[5rem] md:rounded-[20rem] w-[50%] md:w-[40%]"
            >
              <img className="w-full h-auto" src={TicketWellbeingImage} alt="ticket image" />
              <div
                ref={ticketReflective1Ref}
                className="blur-[3px] effect absolute top-[-20%] bottom-0 m-auto left-[-10%] z-20 h-[160%] rotate-[25deg] w-[20%] bg-[linear-gradient(90deg,#ffffff00,#ffffffd1,#ffffff00)]"
              ></div>
              <div
                ref={ticketReflectiveRounded1Ref}
                className="blur-[20px] effect absolute left-[0%] top-[0%] m-auto z-20 w-[50%] aspect-square rounded-full bg-[linear-gradient(90deg,#ffffff00,#ffffff55,#ffffff00)]"
              ></div>
              <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center">
                <Typography.Paragraph className="text-[14rem] md:text-[36rem] drop-shadow-[0rem_3rem_2rem_#333] md:drop-shadow-[0rem_10rem_5rem_#333] font-extrabold text-white uppercase">
                  Well-Being
                </Typography.Paragraph>
                <Typography.Paragraph className="text-[25rem] md:text-[80rem] leading-[16rem] md:leading-[70rem] font-extrabold text-hr-blue uppercase">
                  {settings?.wellbeing_ticket_price.toLocaleString("vi-VN")}
                  <span className="text-[13rem] md:text-[40rem] ml-[5rem] md:ml-[10rem]">
                    VND
                  </span>
                </Typography.Paragraph>
              </div>
            </div>
          </ItemModal>
          <ItemModal
            content={(close) => (
              <div className="relative">
                <img
                  className="w-full"
                  src={event.variables?.[
                    currentLanguage === "en"
                      ? "ticket_happy_run_detail_en"
                      : "ticket_happy_run_detail_vn"
                  ]?.value}
                  alt="ticket image"
                />
                <div
                  className="w-[5%] h-[5%] absolute top-0 right-0"
                  onClick={close}
                ></div>
              </div>
            )}
          >
            <div
              ref={ticket2Ref}
              className="relative overflow-hidden rounded-[5rem] md:rounded-[20rem] w-[50%] md:w-[40%]"
            >
              <img className="w-full" src={TicketHappyRunImage} alt="ticket image" />
              <div
                ref={ticketReflective2Ref}
                className="blur-[3px] effect absolute top-[-20%] bottom-0 m-auto right-0 z-20 h-[160%] rotate-[-25deg] w-[20%] bg-[linear-gradient(90deg,#ffffff00,#ffffffc6,#ffffff00)]"
              ></div>
              <div
                ref={ticketReflectiveRounded2Ref}
                className="blur-[20px] effect absolute left-[-10%] top-[-20%] m-auto z-20 w-[70%] aspect-square rounded-full bg-[linear-gradient(90deg,#ffffff00,#ffffff90,#ffffff00)]"
              ></div>
              <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center">
                <Typography.Paragraph className="text-[14rem] md:text-[36rem] drop-shadow-[0rem_3rem_2rem_#333] md:drop-shadow-[0rem_10rem_5rem_#333] font-extrabold text-white uppercase">
                  Happy Run
                </Typography.Paragraph>
                <Typography.Paragraph className="text-[25rem] md:text-[80rem] leading-[16rem] md:leading-[70rem] font-extrabold text-hr-blue uppercase">
                  {settings?.happy_run_ticket_price.toLocaleString("vi-VN")}
                  <span className="text-[13rem] md:text-[40rem] ml-[5rem] md:ml-[10rem]">
                    VND
                  </span>
                </Typography.Paragraph>
              </div>
            </div>
          </ItemModal>
        </div>
        <center>
          <Link to="order">
            <PrimaryButton className="h-auto p-[8rem_25rem]  md:p-[10rem_50rem] my-[10rem] md:my-[20rem]">
              <Typography.Text className="font-black text-[18rem] md:text-[35rem]">
                {t("happy_run.buttons.register_now")}
              </Typography.Text>
            </PrimaryButton>
          </Link>
        </center>
      </div>
    </div>
  );
};
