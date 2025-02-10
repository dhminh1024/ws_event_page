import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
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
import { CropEasy, CroppedValue } from "@molecules/crop-easy";
import { Button } from "@atoms/button";
import { LunarButton } from "./button";
import { LunarScroll } from "./scroll";
import { getCroppedImg } from "@/lib/utils/common";
import { Loader2 } from "lucide-react";
import { useLocales } from "@/core/hooks/use-locales";

export type UploadModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    fileBlob?: Blob | null;
    onSave?: (file: Blob | null, url: string) => void;
    onClose?: () => void;
  };

export const UploadModal: FC<UploadModalProps> = ({
  fileBlob,
  className,
  children,
  onSave,
  onClose,
}) => {
  const { t } = useLocales();
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedValue | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cropComplete = (
    croppedArea: CroppedValue,
    croppedAreaPixels: CroppedValue
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async () => {
    if (!croppedAreaPixels || !fileBlob) return;
    setLoading(true);
    const { file, url } = await getCroppedImg(
      URL.createObjectURL(fileBlob),
      croppedAreaPixels,
      0
    );
    setLoading(false);
    onSave?.(file, url);
    handleOpenChange(false);
  };

  const handleOpenChange = ($open: boolean) => {
    setOpen($open);
    if (!open) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (fileBlob) {
      setLoading(false);
      setOpen(true);
    }
  }, [fileBlob]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[880rem] xl:max-w-[640rem] bg-happy_box-mint border-happy_box-brick border-[15rem]">
        <DialogHeader>
          <DialogTitle className="p-[10rem] text-[24rem] font-normal text-happy_box-red">
            {t("common.upload_photo")}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-[50vh] bg-gray-700/20 overflow-hidden">
          {fileBlob && (
            <CropEasy
              className="w-full h-full"
              photoUrl={URL.createObjectURL(fileBlob)}
              onCropComplete={cropComplete}
            />
          )}
        </div>
        <DialogFooter className="flex p-[20rem] justify-center sm:justify-center gap-x-[20rem] gap-y-[10rem]">
          <Button
            className="text-[20rem] h-[30rem] p-[10rem_20rem] rounded-[5rem]"
            onClick={handleCropImage}
            disabled={loading}
          >
            <div className="flex gap-x-[10rem] items-center">
              {loading && (
                <Loader2 className="animate-spin !w-[20rem] !h-[20rem]" />
              )}
              <span> {t("common.save_image")}</span>
            </div>
          </Button>
          <Button
            variant={"outline"}
            className="border-happy_box-brick hover:bg-happy_box-brick/10 bg-transparent !text-happy_box-brick font-[500] text-[20rem] h-[30rem] p-[10rem_20rem] rounded-[5rem]"
            onClick={() => handleOpenChange(false)}
          >
            {t("common.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
