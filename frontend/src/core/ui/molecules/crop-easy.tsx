import { HTMLAttributes, useState, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import Cropper from "react-easy-crop";

export type CroppedValue = {
  x:number
  y:number
  width:number
  height:number
}

export type CropperProps = HTMLAttributes<HTMLDivElement> & {
  photoUrl?: string;
  onCropComplete?: (croppedArea:CroppedValue, croppedAreaPixels:CroppedValue) => void;
};

export const CropEasy: FC<CropperProps> = ({ photoUrl, className, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);


  return (
    <Cropper
      image={photoUrl}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
};

