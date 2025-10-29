import { useLocales } from "@/core/hooks/use-locales";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useEffect, useMemo } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { BackgroundGradient } from "../components/background";
import Round1Image from "../assets/images/round-1.png";
import Round2Image from "../assets/images/round-2.png";
import Round3Image from "../assets/images/round-3.png";
import CardFooter from "../assets/images/success-footer.png";
import parser from "html-react-parser";
import { DimondBlock } from "../components/dimond-block";
import Typography from "../components/typography";
import { SecondaryButton } from "../components/button";
export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const event = useEventPageContext();

  const rounds = useMemo(
    () => [
      {
        id: "within-me",
        img: Round1Image,
        title:
          event?.variables?.[`round_1_title_${currentLanguage}`]?.value || "",
        rules: Array.from(
          {
            length:
              Number(event?.variables?.[`round_1_rules_number`]?.value) || 0,
          },
          (_, i) =>
            event?.variables?.[`round_1_rule_${i + 1}_${currentLanguage}`]
              ?.value || ""
        ),
      },
    ],
    [currentLanguage, event]
  );

  const getRoundById = (id: string | undefined) => {
    return rounds.find((round) => round.id === id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(event.variables);

  return (
    <BackgroundGradient>
      <div className="container mx-auto px-80 py-140 flex flex-col gap-y-100 md:gap-y-200">
        <img
          src={getRoundById(params.id)?.img}
          alt="round-image"
          className="mx-auto"
        />
        <div className="text-[18rem] md:text-[28rem] text-gs25-primary font-extrabold text-center">
          {parser(getRoundById(params.id)?.title ?? "")}
        </div>
        <div className="flex flex-col gap-y-60 md:gap-y-160">
          {getRoundById(params.id)?.rules.map((rule, index) => (
            <div className="flex">
              <DimondBlock
                className={cn(
                  "w-150 h-150 md:w-200 md:h-200 mr-100 md:mr-200 rounded-[10rem] md:rounded-[10rem] bg-gs25-gradient-7 md:border-[3rem]"
                )}
              >
                <Typography.Paragraph className="mt-40! md:mt-40! leading-1! text-white text-[16rem] md:text-[20rem] text-center font-ethnocentric">
                  0{index + 1}
                </Typography.Paragraph>
              </DimondBlock>
              <div
                key={index}
                className="text-[12rem] md:text-[18rem] text-gs25-secondary font-medium"
              >
                {parser(rule)}
              </div>
            </div>
          ))}
        </div>
        <center>
          <Link to={`/greatest-show-25`}>
            <SecondaryButton
              className={cn(
                "text-[14rem] text-center md:text-[23rem] font-base italic p-[16rem_30rem] md:p-[30rem_80rem] md:rounded-[13rem] mb-40 inline-flex items-center cursor-pointer hover:scale-105 transition-transform duration-200"
              )}
            >
              {t("greatest_show_25.buttons.go_home")}
            </SecondaryButton>
          </Link>
        </center>
      </div>
      {/* <img src={CardFooter} alt="round-image" className="w-full" /> */}
    </BackgroundGradient>
  );
};

Component.displayName = "Order detail";
