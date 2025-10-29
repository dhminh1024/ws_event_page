import { useState, type FC } from "react";
import Typography from "@nutrition-journey/components/typography";
import { BoxQuestion } from "@/app/nutrition-journey/components/box-question";
import { useLocales } from "@/core/hooks/use-locales";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useSubmission } from "@nutrition-journey/context/use-submission";
import { cleanPath, removeAccents } from "@/lib/utils/common";
import { EVENT_PAGES } from "@/config/event-pages";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useQuestions } from "../context/use-questions";
import { Input } from "@atoms/input";
import { WSENJQuestionExtended } from "../context/types";
import { useUser } from "../context/use-user";
import { Check, X } from "lucide-react";

export type MissionsSectionProps = {
  className?: string;
};

export const MissionsSection: FC<MissionsSectionProps> = ({ className }) => {
  const event = useEventPageContext();
  const navigate = useNavigate();
  const { questions } = useQuestions();
  const { submission } = useSubmission();
  const { code, setCode, fullName, setFullName, isValid, user } = useUser();
  const { t, currentLanguage } = useLocales();

  // console.log(isValid,removeAccents(fullName));

  return (
    <section className="relative">
      <div className="flex flex-col gap-y-40 md:gap-y-80">
        <Typography.Heading
          level={2}
          className="font-normal text-[20rem] md:text-[28rem] text-nj-green  bg-nj-green/10 px-80"
        >
          {t("nutritional_journey.heading_2")}
        </Typography.Heading>
        <div className="flex flex-col gap-y-40 pl-20 md:pl-80">
          <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
            <span className="text-nj-blue">
              <span className="underline">
                {t("nutritional_journey.sub_heading_2_1")}
              </span>
              :
            </span>
            <span className="ml-20">
              {t("common.from_d_to_d", {
                from:
                  event.variables.time_from?.value &&
                  format(
                    new Date(event.variables.time_from?.value),
                    "dd-MM-yyyy"
                  ),
                to:
                  event.variables.time_to?.value &&
                  format(
                    new Date(event.variables.time_to?.value),
                    "dd-MM-yyyy"
                  ),
              })}
            </span>
          </Typography.Text>
          <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
            <span className="text-nj-blue">
              <span className="underline">
                {t("nutritional_journey.sub_heading_2_2")}
              </span>
              :
            </span>
          </Typography.Text>
          <div className="flex flex-col pl-20 md:pl-100 gap-y-40">
            <div className="flex flex-col gap-y-40 md:gap-y-80">
              <div className="gap-x-20 md:gap-x-40">
                <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
                  <span className="mr-20 underline text-nj-blue font-bold">
                    {t("common.step_n", {
                      number: 1,
                    })}
                    :
                  </span>
                  <span>{event.variables.how_to_join_desc_1_vn?.value}</span>
                </Typography.Text>
         
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <Typography.Text className="text-nj-orange  mr-40 font-medium text-[14rem] md:text-[20rem]">
                  <span className="font-bold text-nj-blue">
                    {t("common.student_code")}:
                  </span>
                </Typography.Text>

                <Input
                  className="h-120 w-full text-[14rem] md:text-[20rem] uppercase border-b-nj-blue border-t-transparent! border-l-transparent! border-r-transparent! border-b-[2rem] shadow-none! outline-hidden! md:w-1200 tracking-[2rem]"
                  value={code}
                  onChange={(e) => setCode(e.currentTarget.value)}
                />
                <Typography.Text className="mt-40 mx-40 md:mt-0 text-nj-orange font-medium text-[14rem] md:text-[20rem]">
                  <span className="font-bold text-nj-blue">
                    {t("common.full_name")}:
                  </span>
                </Typography.Text>
                <Input
                  className="h-120 w-full text-[14rem] md:text-[20rem] border-b-nj-blue border-t-transparent! border-l-transparent! border-r-transparent! border-b-[2rem] shadow-none! outline-hidden! md:w-1200 "
                  value={fullName}
                  onChange={(e) => setFullName(e.currentTarget.value)}
                />
                {isValid && (
                  <Check className="text-status-success ml-40" />
                )}
                {!isValid && code && fullName && (
                  <X className="text-status-danger ml-40" />
                )}
              </div>
              {code && fullName && !isValid && (
                <Typography.Text className="text-nj-red font-medium text-[12rem] md:text-[20rem]">
                  {t("nutritional_journey.student_not_found")}
                </Typography.Text>
              )}
              {/* {user && (
                <div className="flex flex-col gap-x-40 border border-nj-red rounded-[5rem] p-40">
                  <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
                    <span className="mr-20 underline">
                      {t("common.full_name")}:
                    </span>
                    <span>{user?.fullName}</span>
                  </Typography.Text>
                  <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
                    <span className="mr-20 underline">
                      {t("common.class")}:
                    </span>
                    <span>{user?.currentClass}</span>
                  </Typography.Text>
                </div>
              )} */}
            </div>
            {questions.map((question, index) => (
              <div key={question.name} className="flex flex-col gap-y-40">
                <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
                  <span className="mr-20 underline font-bold text-nj-blue">
                    {t("common.step_n", {
                      number: index + 2,
                    })}
                    {}:
                  </span>
                  {currentLanguage === "vn"
                    ? question.title_vn
                    : question.title_en}
                </Typography.Text>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-40 md:gap-160 my-40">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Link
                      key={index}
                      to={
                        isValid
                          ? cleanPath(
                              `/${
                                EVENT_PAGES.NUTRITION_JOURNEY.SITE_URL
                              }/upload/${question.name}/${index + 1}`
                            )
                          : "#"
                      }
                    >
                      <BoxQuestion
                        className="w-full"
                        imageUrl={
                          submission?.images?.find(
                            (i: any) =>
                              i.question.name === question.name &&
                              Number(i.sequence_number.split(".")[1]) ===
                                index + 1
                          )?.image_url
                        }
                        sequenceNumber={index + 1}
                        disabled={!isValid}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-80">
            <Typography.Text className=" text-nj-orange font-medium text-[14rem] md:text-[20rem]">
              <span className="text-nj-blue">
                <span className="underline">
                  {t("nutritional_journey.sub_heading_2_4")}
                </span>
                :
              </span>
            </Typography.Text>
            <div className="flex flex-col pl-0 md:pl-60 mt-40">
              <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
                ☆ {event.variables.criteria_desc_1_vn?.value}
              </Typography.Text>
              <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
                ☆ {event.variables.criteria_desc_2_vn?.value}
              </Typography.Text>
              <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
                ☆ {event.variables.criteria_desc_3_vn?.value}
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
