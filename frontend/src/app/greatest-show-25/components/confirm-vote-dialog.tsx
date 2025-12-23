import { type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@atoms/dialog";
import { useLocales } from "@/core/hooks/use-locales";
import { PrimaryButton, SecondaryButton } from "./button";
import { Button } from "@atoms/button";

interface ConfirmVoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  finalistName: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

/**
 * Confirm Vote Dialog
 * Shows confirmation before user casts their vote (cannot be changed later)
 */
export const ConfirmVoteDialog: FC<ConfirmVoteDialogProps> = ({
  open,
  onOpenChange,
  finalistName,
  onConfirm,
  isLoading = false,
}) => {
  const { t } = useLocales();

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] md:max-w-[700px] rounded-[10rem] md:rounded-[15rem] bg-gs25-background overflow-hidden p-128 md:p-80">
        <DialogHeader>
          <DialogTitle className=""></DialogTitle>
          <DialogDescription className="text-[14rem] md:text-[16rem] text-gray-700 space-y-64">
            <p>
              {t("greatest_show_25.confirm_vote_message_1")}
              <span className="font-bold text-gs25-primary">
                "{finalistName}"
              </span>
              ?
            </p>
            <p className="text-red-600 text-[12rem] font-semibold">
              {t("greatest_show_25.confirm_vote_warning")}
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col mt-60 gap-40">
          <PrimaryButton
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full px-128 cursor-pointer py-48! h-168! text-[14rem] md:text-[14rem] rounded-[8rem]"
          >
            {isLoading
              ? t("greatest_show_25.voting_button_vote")
              : t("greatest_show_25.voting_button_vote")}
          </PrimaryButton>
          <Button
            onClick={handleCancel}
            disabled={isLoading}
            variant="link"
            className="w-full px-128 cursor-pointer py-48 text-[14rem] md:text-[14rem] rounded-[8rem]"
          >
            {t("greatest_show_25.confirm_vote_cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
