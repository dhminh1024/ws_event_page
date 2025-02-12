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
import { LunarButton } from "./button";
import env from "@/config/env";
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

export type OrderItemDetail = {
  name: string;
  ticket_class: string;
  distance: string;
  size: string;
  bib?: string;
  price: number;
};

export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    orderData?: OrderItemDetail[];
    disabled?: boolean;
    onConfirm?: () => void;
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
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    if (!open) {
      onClosed?.();
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm?.();
  };

  useEffect(() => {
    setIsOpen($open);
  }, [$open]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-[1024rem] w-full bg-hr-background border-[5rem] border-hr-blue shadow-none px-[10rem]",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="p-[20rem]">
          <center>
            <Typography.Heading
              className="py-[20rem] text-[35rem] text-hr-blue leading-[1.2] font-extrabold"
              level={2}
            >
              Order Detail
            </Typography.Heading>
          </center>
          <div className="mb-[20rem]  bg-hr-steel_blue/10 border-hr-blue border-[1rem] rounded-[5rem]">
            <Table className="text-[16rem] ">
              <TableHeader className="bg-hr-steel_blue/20 ">
                <TableRow className="!bg-transparent">
                  <TableHead className="w-[100px] text-hr-blue py-[8rem] pl-[15rem]">
                    STT
                  </TableHead>
                  <TableHead className="text-hr-blue py-[8rem]">
                    Thong tin
                  </TableHead>
                  <TableHead className="text-hr-blue py-[8rem]">
                    Hang ve
                  </TableHead>
                  <TableHead className="text-hr-blue py-[8rem]">
                    Cu ly
                  </TableHead>
                  <TableHead className="text-hr-blue py-[8rem]">
                    Size ao
                  </TableHead>
                  <TableHead className="text-hr-blue py-[8rem]">BIB</TableHead>
                  <TableHead className="text-hr-blue py-[8rem] pr-[15rem] text-right">
                    Gia ve
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="max-h-[300rem] overflow-y-auto">
                {orderData?.map((item, index) => (
                  <TableRow className="!bg-transparent">
                    <TableCell className="py-[8rem] pl-[15rem]">{index+1}</TableCell>
                    <TableCell className="py-[8rem] ">{item.name}</TableCell>
                    <TableCell className="py-[8rem] ">{item.ticket_class}</TableCell>
                    <TableCell className="py-[8rem] ">{item.distance}</TableCell>
                    <TableCell className="py-[8rem] ">{item.size}</TableCell>
                    <TableCell className="py-[8rem] ">{item.bib}</TableCell>
                    <TableCell className="text-right pr-[15rem]">
                      {item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <Separator className="mt-[10rem] h-[1rem] bg-hr-blue"/> */}
          <div className="text-right">
            <div className="flex flex-col">
              <Typography.Paragraph className="text-hr-blue text-[20rem] font-semibold">
                Tong tien: 990.000d
              </Typography.Paragraph>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
