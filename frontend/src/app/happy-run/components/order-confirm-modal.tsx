import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@atoms/dialog";
import Typography from "./typography";
import { Label } from "@atoms/label";
import { generateArrayWithRandomLetters } from "../utils/ultils";
import { useLocales } from "@/core/hooks/use-locales";
import { LunarScroll } from "./scroll";
import { on } from "events";
import { set } from "lodash";
import { useResponsive } from "@/core/hooks/use-reponsive";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@atoms/table";
import { Button } from "@atoms/button";
import { useToast } from "@atoms/use-toast";
import usePayment from "../api/use-payment";
import { Loader2 } from "lucide-react";

export type Ticket = {
  wellspring_code: string | null;
  full_name: string;
  ticket_type: string;
  distance: string;
  shirt_size: string;
  bib: string;
  price: number;
};

export type OrderData = {
  full_name: string;
  email: string;
  mobile_number: string;
  tickets: Ticket[];
};

export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    orderData?: OrderData;
    disabled?: boolean;
    onConfirm?: (qr_code: string, order_name: string) => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const OrderConfirmModal: FC<LunarModalProps> = ({
  open: $open = false,
  className,
  children,
  orderData,
  disabled,
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const [isRequesting, setIsRequesting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { payment } = usePayment();

  const handleOpenChange = (open: boolean) => {
    if (disabled || isRequesting) return;
    setIsOpen(open);
    if (!open) {
      onClosed?.();
    }
  };

  const handleConfirm = async () => {
    if (orderData) {
      setIsRequesting(true);
      try {
        const data = await payment(orderData);
        onConfirm?.(data.message.qr_payment_code||"",data.message.name);
        handleOpenChange(false);
      } catch (error: any) {
        toast({
          title: error?.message || "Error",
          description: typeof error === "string" ? error : error.exception,
          variant: "destructive",
        });
      }
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    setIsOpen($open);
  }, [$open]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-[1024rem] w-full bg-hr-background border-[5rem] border-hr-blue shadow-none md:px-[10rem] px-[2rem]",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="p-[5rem] md:p-[20rem]">
          <center>
            <Typography.Heading
              className="py-[15rem] md:py-[20rem] text-[18rem] md:text-[35rem] text-hr-blue leading-[1.2] font-extrabold"
              level={2}
            >
              {t("happy_run.form.order_detail")}
            </Typography.Heading>
          </center>
          <div className="mb-[10rem] md:mb-[20rem] bg-hr-steel_blue/10 border-hr-blue border-[1rem] rounded-[5rem]">
            <Table className="text-[8rem] md:text-[16rem] text-hr-blue">
              <TableHeader className="bg-hr-steel_blue/20 ">
                <TableRow className="!bg-transparent">
                  <TableHead className="w-[30rem] md:w-[60rem] text-hr-blue py-[4rem] md:py-[8rem] pl-[8rem] md:pl-[15rem]">
                    {t("happy_run.form.no_item")}
                  </TableHead>
                  <TableHead className="text-hr-blue py-[4rem] md:py-[8rem]">
                    {t("happy_run.form.full_name")}
                  </TableHead>
                  <TableHead className="w-[60rem] md:w-[120rem] text-hr-blue py-[4rem] md:py-[8rem]">
                    {t("happy_run.form.ticket_class")}
                  </TableHead>
                  <TableHead className="w-[40rem] md:w-[80rem] text-hr-blue py-[4rem] md:py-[8rem]">
                    {t("happy_run.form.ticket_distance")}
                  </TableHead>
                  <TableHead className="w-[40rem] md:w-[80rem] text-hr-blue py-[4rem] md:py-[8rem]">
                    {t("happy_run.form.shirt_size")}
                  </TableHead>
                  <TableHead className="text-hr-blue py-[4rem] md:py-[8rem]">BIB</TableHead>
                  <TableHead className="text-hr-blue py-[4rem] md:py-[8rem] pr-[8rem] md:pr-[15rem] text-right">
                    {t("happy_run.form.price")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="max-h-[300rem] overflow-y-auto">
                {orderData?.tickets.map((item, index) => (
                  <TableRow key={index} className="!bg-transparent">
                    <TableCell className="py-[8rem] pl-[8rem] md:pl-[15rem]">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-[8rem] ">{`${item.full_name} ${
                      item.wellspring_code ? `(${item.wellspring_code})` : ""
                    }`}</TableCell>
                    <TableCell className="py-[8rem] ">
                      {item.ticket_type}
                    </TableCell>
                    <TableCell className="py-[8rem] ">
                      {item.distance}
                    </TableCell>
                    <TableCell className="py-[8rem] ">
                      {item.shirt_size}
                    </TableCell>
                    <TableCell className="py-[8rem] ">{item.bib}</TableCell>
                    <TableCell className="text-right pr-[8rem] md:pr-[15rem]">
                      {item.price.toLocaleString("vi-VN")}₫
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <Separator className="mt-[10rem] h-[1rem] bg-hr-blue"/> */}
          <div className="text-right">
            <div className="flex flex-col">
              <Typography.Paragraph className="text-hr-blue text-[10rem] md:text-[20rem] font-semibold">
                {t("happy_run.form.total_price", {
                  number: `${orderData?.tickets
                    ?.reduce((acc, item) => acc + item.price, 0)
                    .toLocaleString("vi-VN")}₫`,
                })}
              </Typography.Paragraph>
            </div>
          </div>
        </div>
        <center className="pb-[10rem] md:py-[20rem] flex gap-[5rem] md:gap-[10rem] justify-center">
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            className="text-[10rem] md:text-[20rem] p-[5rem_10rem] md:p-[10rem_20rem] hover:!bg-hr-blue/10 border-hr-blue border-[1rem] bg-transparent text-hr-blue"
          >
            {t("happy_run.buttons.go_back")}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isRequesting}
            className={cn(
              "text-[10rem] md:text-[20rem] p-[5rem_10rem] md:p-[10rem_20rem] flex items-center bg-hr-ember text-white",
              {
                "opacity-70": isRequesting,
              }
            )}
          >
            {isRequesting && (
              <Loader2 className="animate-spin w-[18rem] h-[18rem] md:w-[30rem] md:h-[30rem] mr-[10rem] " />
            )}
            {t("happy_run.buttons.confirm_payment")}
          </button>
        </center>
      </DialogContent>
    </Dialog>
  );
};
