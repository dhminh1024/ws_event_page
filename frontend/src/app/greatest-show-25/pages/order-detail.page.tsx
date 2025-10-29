import { useLocales } from "@/core/hooks/use-locales";
import { useNavigate, useParams } from "react-router-dom";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import TopPageImage from "@happy-run/assets/images/top-page.webp";
import Typography from "../components/typography";
import parser from "html-react-parser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@atoms/table";
import useGetOrder from "../api/use-get-order";
import { LanguageSelector } from "../components/language-selector";
import { useEffect } from "react";
import { cn } from "@/core/utils/shadcn-utils";

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const event = useEventPageContext();
  const { order } = useGetOrder(params.id, !params.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(event.variables);

  return (
    <div className="bg-hr-background overflow-hidden">
      {/* <Helmet>
        <title>
          {"Purchasing ticket"} | {env.HAPPY_RUN.TITLE_PAGE}
        </title>
      </Helmet> */}
      <div className="pallette">
        <span className="text-hr-honey"></span>
        <span className="text-hr-ember"></span>
        <span className="text-brand-persian"></span>
      </div>
      <img src={TopPageImage} className="w-full" alt="Top Page" />
      <center className="mb-120 md:mb-160">
        <Typography.Heading
          className="pt-80 md:pt-160 uppercase text-[20rem] md:text-[45rem] text-hr-blue leading-normal font-extrabold"
          level={2}
        >
          {parser(t("happy_run.order_title"))}
        </Typography.Heading>
        <div className="flex items-center justify-center my-80">
          <span className="mr-40 text-[16rem] text-hr-blue">
            {t("common.language")}:
          </span>
          <LanguageSelector />
        </div>
        <Typography.Paragraph className="w-full px-40 md:w-[48%] text-[10rem] md:text-[20rem] text-hr-blue leading-[1.2]">
          {event.variables?.[`order_detail_desc_1_${currentLanguage}`]?.value}
        </Typography.Paragraph>
        <Typography.Paragraph className="pb-40 px-40 text-[10rem] md:text-[20rem] text-hr-blue leading-[1.2]">
          {event.variables?.[`order_detail_desc_2_${currentLanguage}`]?.value}
        </Typography.Paragraph>
        <div className="bg-white inline-block mx-auto px-40 md:px-240 py-20 md:py-40 rounded-full">
          <Typography.Paragraph className="mb-0 text-hr-blue text-[10rem] md:text-[20rem] font-semibold leading-[1.2]">
            <span>{t("common.event_email")}: </span>
            <span>{event.variables.event_email?.value}</span>
          </Typography.Paragraph>
        </div>
      </center>
      <div className="w-full px-40 md:w-[80%] mx-auto pb-80 md:pb-160">
        <p>
          <Typography.Paragraph className="mb-40 md:mb-80 text-hr-blue underline uppercase text-[10rem] md:text-[20rem] font-extrabold leading-[1.2]">
            I. {t("happy_run.info_booker")}
          </Typography.Paragraph>
        </p>
        <div className="flex flex-col pl-20 md:pl-80">
          <p className="mb-40 md:mb-80 text-hr-blue ">
            <Typography.Text className="text-[10rem] md:text-[18rem] font-semibold leading-[1.2]">
              {t("common.full_name")}:
            </Typography.Text>
            <Typography.Text className="ml-20 text-[10rem] md:text-[18rem] text-hr-ember leading-[1.2]">
              {order?.full_name}
            </Typography.Text>
          </p>
          <p className="mb-40 md:mb-80 text-hr-blue ">
            <Typography.Text className="text-[10rem] md:text-[18rem] font-semibold leading-[1.2]">
              {t("common.phone")}:
            </Typography.Text>
            <Typography.Text className="ml-20 text-[10rem] md:text-[18rem] text-hr-ember leading-[1.2]">
              {order?.mobile_number}
            </Typography.Text>
          </p>
          <p className="mb-40 md:mb-80 text-hr-blue ">
            <Typography.Text className="text-[10rem] md:text-[18rem] font-semibold leading-[1.2]">
              {t("common.email")}:
            </Typography.Text>
            <Typography.Text className="ml-20 text-[10rem] md:text-[18rem] text-hr-ember leading-[1.2]">
              {order?.email}
            </Typography.Text>
          </p>
        </div>
        <p>
          <Typography.Paragraph className="mb-40 md:mb-80 text-hr-blue underline uppercase text-[10rem] md:text-[20rem] font-extrabold leading-[1.2]">
            II. {t("happy_run.info_order")}
          </Typography.Paragraph>
        </p>
        <div className="flex flex-col md:flex-row gap-[2rem_10rem] justify-between pl-20 py-20 md:py-40">
          <p className="mb-40 md:mb-80 text-hr-blue ">
            <Typography.Text className="text-[10rem] md:text-[18rem] font-semibold leading-[1.2]">
              {t("happy_run.order_id")}:
            </Typography.Text>
            <Typography.Text
              className={cn(
                "ml-40 text-[10rem] md:text-[16rem] text-hr-ember font-semibold leading-[1.2]"
              )}
            >
              {order?.name}
            </Typography.Text>
          </p>
          <p className="mb-40 md:mb-80 text-hr-blue ">
            <Typography.Text className="text-[10rem] md:text-[18rem] font-semibold leading-[1.2]">
              {t("happy_run.order_status")}:
            </Typography.Text>
            <Typography.Text
              className={cn(
                "ml-40 bg-hr-ember p-[5rem_10rem] rounded-[5rem] text-[10rem] md:text-[20rem] font-semibold text-white leading-[1.2]",
                {
                  "bg-hr-lime": order?.status === "Paid",
                }
              )}
            >
              {t(`happy_run.form.list_status.${order?.status}`)}
            </Typography.Text>
          </p>
        </div>
        <div className="px-20">
          <div className="bg-hr-steel_blue/10 border-hr-blue border-[1rem] rounded-[5rem]">
            <Table className="text-[8rem] md:text-[16rem] text-hr-blue">
              <TableHeader className="bg-hr-steel_blue/20 ">
                <TableRow className="bg-transparent!">
                  <TableHead className="w-120 md:w-240 text-hr-blue py-16 md:py-32 pl-32 md:pl-60">
                    {t("happy_run.form.no_item")}
                  </TableHead>
                  <TableHead className="text-hr-blue py-16 md:py-32">
                    {t("happy_run.form.full_name")}
                  </TableHead>
                  <TableHead className="w-240 md:w-480 text-hr-blue py-16 md:py-32">
                    {t("happy_run.form.ticket_class")}
                  </TableHead>
                  <TableHead className="w-160 md:w-7xl text-hr-blue py-16 md:py-32">
                    {t("happy_run.form.ticket_distance")}
                  </TableHead>
                  <TableHead className="w-160 md:w-7xl text-hr-blue py-16 md:py-32">
                    {t("happy_run.form.shirt_size")}
                  </TableHead>
                  <TableHead className="text-hr-blue py-16 md:py-32">
                    BIB
                  </TableHead>
                  <TableHead className="w-7xl md:w-480 text-hr-blue text-center py-16 md:py-32">
                    {t("happy_run.form.status")}
                  </TableHead>
                  <TableHead className="text-hr-blue py-16 md:py-32 pr-32 md:pr-60 text-right">
                    {t("happy_run.form.price")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="max-h-1200 overflow-y-auto">
                {order?.tickets?.map((item, index) => (
                  <TableRow key={index} className="bg-transparent!">
                    <TableCell className="py-32 pl-32 md:pl-60">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-32 ">{`${item.full_name} ${
                      item.wellspring_code ? `(${item.wellspring_code})` : ""
                    }`}</TableCell>
                    <TableCell className="py-32 ">
                      {item.ticket_type}
                    </TableCell>
                    <TableCell className="py-32 ">
                      {item.distance}
                    </TableCell>
                    <TableCell className="py-32 ">
                      {item.shirt_size}
                    </TableCell>
                    <TableCell className="py-32 text-left">
                      {item.ticket_type === "Well-being" ? item.bib?.trim() : ""}
                    </TableCell>
                    <TableCell className="text-center">
                      {t(`happy_run.form.list_status.${item.status}`)}
                    </TableCell>
                    <TableCell className="text-right pr-32 md:pr-60">
                      {item.ticket_price?.toLocaleString("vi-VN")}₫
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-40 md:mt-80 px-40 text-right">
          <p className="mb-40 md:mb-80 text-hr-ember ">
            <Typography.Text className="text-[10rem] md:text-[18rem] font-semibold leading-[1.2]">
              {t("happy_run.form.total_price", {
                number: `${order?.total_price?.toLocaleString("vi-VN")}₫`,
              })}
            </Typography.Text>
          </p>
          <p className="mb-40 md:mb-80 text-hr-steel_blue ">
            <Typography.Text className="text-[10rem] md:text-[18rem] font-semibold leading-[1.2]">
              {t("happy_run.form.total_paid", {
                number: `${order?.total_paid?.toLocaleString("vi-VN")}₫`,
              })}
            </Typography.Text>
          </p>
          <p className="mb-40 md:mb-80 text-hr-blue ">
            <Typography.Text className="text-[10rem] md:text-[18rem] font-semibold leading-[1.2]">
              {t("happy_run.form.total_payment_pending", {
                number: order?.total_payment_pending
                  ? `${order?.total_payment_pending?.toLocaleString("vi-VN")}₫`
                  : 0,
              })}
            </Typography.Text>
          </p>
        </div>
        <center className="mt-80 md:mt-160 px-40">
          <Typography.Paragraph className="pb-20 text-[8rem] md:text-[18rem] text-hr-blue leading-[1.2]">
            {parser(
              event.variables?.[`order_detail_bottom_1_${currentLanguage}`]
                ?.value || ""
            )}
          </Typography.Paragraph>
          <div className="w-[40%] md:w-[10%] h-4 border-t-[1rem] border-dashed border-t-hr-blue my-40"></div>
          <Typography.Paragraph className="pb-20  text-[8rem] md:text-[18rem] text-hr-blue leading-[1.2]">
            {
              event.variables?.[`order_detail_bottom_2_${currentLanguage}`]
                ?.value
            }
          </Typography.Paragraph>
        </center>
      </div>
    </div>
  );
};

Component.displayName = "Order detail";
