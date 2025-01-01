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

export type UploadModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    fileBlob?: Blob | null;
    onSave?: (file: Blob | null, url: string) => void;
  };

export const UploadModal: FC<UploadModalProps> = ({
  fileBlob,
  className,
  children,
  onSave,
}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedValue | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cropComplete = (
    croppedArea: CroppedValue,
    croppedAreaPixels: CroppedValue
  ) => {
    console.log(croppedArea, croppedAreaPixels);

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
    console.log(file, url);
    setLoading(false);
    onSave?.(file, url);
    handleOpenChange(false);
  };

  const handleOpenChange = ($open: boolean) => {
    setOpen($open);
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
      <DialogContent className="max-w-[880rem] xl:max-w-[640rem] bg-[#F5F8CE] border-happy_box-light_red border-[15rem]">
        <DialogHeader>
          <DialogTitle className="p-[10rem] text-[24rem] text-happy_box-red">
            Upload photo
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
        <DialogFooter className="flex p-[20rem] sm:justify-center gap-x-[20rem]">
          <LunarButton
            className="text-[20rem] "
            variant="primary"
            onClick={handleCropImage}
            disabled={loading}
          >
            <div className="flex gap-x-[10rem] items-center">
              {loading && (
                <Loader2 className="animate-spin !w-[20rem] !h-[20rem]" />
              )}
              <span>Luu hinh</span>
            </div>
          </LunarButton>
          <LunarButton
            className="text-[20rem]"
            onClick={() => handleOpenChange(false)}
          >
            Huy bo
          </LunarButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
