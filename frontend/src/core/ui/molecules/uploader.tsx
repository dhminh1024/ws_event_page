import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useDropzone,
  DropzoneState,
  FileRejection,
  DropzoneOptions,
} from "react-dropzone";
import { FileUp, ImageUp, Trash2 as RemoveIcon } from "lucide-react";
import { useToast } from "@atoms/use-toast";
import { cn } from "@/core/utils/shadcn-utils";
import { buttonVariants } from "@atoms/button";
import { Input } from "@atoms/input";
import { useTranslation } from "react-i18next";
import {
  File,
  FileImage,
  FileText,
  FileVideo,
  IconProps,
} from "phosphor-react";

type DirectionOptions = "rtl" | "ltr" | undefined;

type FileUploaderContextType = {
  dropzoneState: DropzoneState;
  isLOF: boolean;
  isFileTooBig: boolean;
  removeFileFromSet: (index: number) => void;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  orientation: "horizontal" | "vertical";
  direction: DirectionOptions;
};

const FileUploaderContext = createContext<FileUploaderContextType | null>(null);

export const useFileUpload = () => {
  const context = useContext(FileUploaderContext);
  if (!context) {
    throw new Error("useFileUpload must be used within a FileUploaderProvider");
  }
  return context;
};

type FileUploaderProps = {
  value?: File[] | null;
  reSelect?: boolean;
  onValueChange?: (value: File[] | null) => void;
  dropzoneOptions?: DropzoneOptions;
  orientation?: "horizontal" | "vertical";
};
export const ImageSvgDraw = ({
  iconSize = 50,
  exts,
}: {
  iconSize?: number;
  exts?: string[];
}) => {
  const { t } = useTranslation();
  return (
    <>
      <ImageUp className="text-foreground" size={iconSize} strokeWidth={0.9} />
      <p className="mb-1 text-sm font-bold text-gray-500 dark:text-gray-400">
        {t("components.inputs.upload_images.placeholder")}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {exts?.join(" | ")}
      </p>
    </>
  );
};
export const FileSvgDraw = ({
  iconSize = 50,
  exts,
}: {
  iconSize?: number;
  exts?: string[];
}) => {
  const { t } = useTranslation();
  return (
    <>
      <FileUp
        className="hidden text-foreground md:block mb-2"
        size={iconSize}
        strokeWidth={0.9}
      />
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {t("components.inputs.upload_files.placeholder")}
      </p>
      {exts && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {exts?.join(" | ")}
        </p>
      )}
    </>
  );
};

const dropzoneDefault = {
  accept: {
    "image/*": [".jpg", ".jpeg", ".png", ".gif"],
  },
  maxFiles: 1,
  maxSize: 4 * 1024 * 1024,
  multiple: true,
};

export const FileUploader = forwardRef<
  HTMLDivElement,
  FileUploaderProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      dropzoneOptions,
      value,
      onValueChange,
      reSelect,
      orientation = "vertical",
      children,
      dir,
      ...props
    },
    ref
  ) => {
    const { toast } = useToast();
    const [isFileTooBig, setIsFileTooBig] = useState(false);
    const [isLOF, setIsLOF] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { accept, maxFiles, maxSize, multiple } =
      dropzoneOptions || dropzoneDefault;

    const reSelectAll = maxFiles === 1 ? true : reSelect;
    const direction: DirectionOptions = dir === "rtl" ? "rtl" : "ltr";

    const removeFileFromSet = useCallback(
      (i: number) => {
        if (!value) return;
        const newFiles = value.filter((_, index) => index !== i);
        onValueChange?.(newFiles);
      },
      [value, onValueChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!value) return;

        const moveNext = () => {
          const nextIndex = activeIndex + 1;
          setActiveIndex(nextIndex > value.length - 1 ? 0 : nextIndex);
        };

        const movePrev = () => {
          const nextIndex = activeIndex - 1;
          setActiveIndex(nextIndex < 0 ? value.length - 1 : nextIndex);
        };

        const prevKey =
          orientation === "horizontal"
            ? direction === "ltr"
              ? "ArrowLeft"
              : "ArrowRight"
            : "ArrowUp";

        const nextKey =
          orientation === "horizontal"
            ? direction === "ltr"
              ? "ArrowRight"
              : "ArrowLeft"
            : "ArrowDown";

        if (e.key === nextKey) {
          moveNext();
        } else if (e.key === prevKey) {
          movePrev();
        } else if (e.key === "Enter" || e.key === "Space") {
          if (activeIndex === -1) {
            dropzoneState.inputRef.current?.click();
          }
        } else if (e.key === "Delete" || e.key === "Backspace") {
          if (activeIndex !== -1) {
            removeFileFromSet(activeIndex);
            if (value.length - 1 === 0) {
              setActiveIndex(-1);
              return;
            }
            movePrev();
          }
        } else if (e.key === "Escape") {
          setActiveIndex(-1);
        }
      },
      [value, activeIndex, removeFileFromSet]
    );

    const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const files = acceptedFiles;

        if (!files) {
          toast({
            title: "Error",
            description: "File size too big",
            variant: "destructive",
            duration: 2000,
          });
          return;
        }

        const newValues: File[] = value ? [...value] : [];

        if (reSelectAll) {
          newValues.splice(0, newValues.length);
        }

        files.forEach((file) => {
          if (!maxFiles || newValues.length < maxFiles) {
            newValues.push(file);
          }
        });

        onValueChange?.(newValues);

        if (rejectedFiles.length > 0) {
          for (let i = 0; i < rejectedFiles.length; i++) {
            if (
              maxSize &&
              rejectedFiles[i].errors[0]?.code === "file-too-large"
            ) {
              toast({
                title: "Error",
                description: `File is too large. Max size is ${
                  maxSize / 1024 / 1024
                }MB`,
                variant: "destructive",
                duration: 2000,
              });
              break;
            }
            if (rejectedFiles[i].errors[0]?.message) {
              toast({
                title: "Error",
                description: rejectedFiles[i].errors[0].message,
                variant: "destructive",
                duration: 2000,
              });
              break;
            }
          }
        }
      },
      [reSelectAll, value]
    );

    useEffect(() => {
      if (value?.length === maxFiles) {
        setIsLOF(true);
        return;
      }
      setIsLOF(false);
    }, [value, maxFiles]);

    const opts = dropzoneOptions
      ? dropzoneOptions
      : { accept, maxFiles, maxSize, multiple };

    const dropzoneState = useDropzone({
      ...opts,
      onDrop,
      onDropRejected: () => setIsFileTooBig(true),
      onDropAccepted: () => setIsFileTooBig(false),
    });

    return (
      <FileUploaderContext.Provider
        value={{
          dropzoneState,
          isLOF,
          isFileTooBig,
          removeFileFromSet,
          activeIndex,
          setActiveIndex,
          orientation,
          direction,
        }}
      >
        <div
          ref={ref}
          tabIndex={0}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            "grid w-full overflow-hidden focus:outline-none ",
            className,
            {
              "gap-2": value && value.length > 0,
            }
          )}
          dir={dir}
          {...props}
        >
          {children}
        </div>
      </FileUploaderContext.Provider>
    );
  }
);

FileUploader.displayName = "FileUploader";

export const FileUploaderContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { orientation } = useFileUpload();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn("w-full")}
      ref={containerRef}
      aria-description="content file holder"
    >
      <div
        {...props}
        ref={ref}
        className={cn(
          "flex gap-1 rounded-xl",
          orientation === "horizontal" ? "flex-raw flex-wrap" : "flex-col",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
});

FileUploaderContent.displayName = "FileUploaderContent";

export const FileUploaderItem = forwardRef<
  HTMLDivElement,
  { index: number } & React.HTMLAttributes<HTMLDivElement>
>(({ className, index, children, ...props }, ref) => {
  const { removeFileFromSet, activeIndex, direction } = useFileUpload();
  const isSelected = index === activeIndex;
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-between gap-3 rounded-md border px-2 py-1 hover:bg-accent",
        className,
        isSelected ? "bg-muted" : ""
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-1.5 font-medium leading-none tracking-tight">
        {children}
      </div>
      <button
        type="button"
        // className={cn(
        //   'absolute',
        //   direction === 'rtl' ? 'left-1 top-1' : 'right-1 top-1',
        // )}
        onClick={() => removeFileFromSet(index)}
      >
        <span className="sr-only">remove item {index}</span>
        <RemoveIcon className="h-4 w-4 duration-200 ease-in-out hover:stroke-destructive" />
      </button>
    </div>
  );
});

FileUploaderItem.displayName = "FileUploaderItem";

export const FileIcon = ({ type, ...props }: { type?: string } & IconProps) => {
  if (type?.includes("image"))
    return (
      <FileImage
        className="text-primary"
        size={30}
        weight="duotone"
        {...props}
      />
    );
  if (type?.includes("video"))
    return (
      <FileVideo
        className="text-primary"
        size={30}
        weight="duotone"
        {...props}
      />
    );
  if (type?.includes("pdf") || type?.includes("txt") || type?.includes("doc"))
    return (
      <FileText
        className="text-primary"
        size={30}
        weight="duotone"
        {...props}
      />
    );
  return (
    <File className="text-primary" size={30} weight="duotone" {...props} />
  );
};

export const FileInput = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { dropzoneState, isFileTooBig, isLOF } = useFileUpload();
  const rootProps = isLOF ? {} : dropzoneState.getRootProps();

  return (
    <div
      ref={ref}
      {...props}
      className={cn("relative w-full", {
        "cursor-not-allowed opacity-50 hidden": isLOF,
        "cursor-pointer ": !isLOF,
      })}
    >
      <div
        className={cn(
          `w-full rounded-lg bg-input/10 duration-300 ease-in-out
           ${
             dropzoneState.isDragAccept
               ? "border-green-500"
               : dropzoneState.isDragReject || isFileTooBig
               ? "border-red-500"
               : ""
           }`,
          className
        )}
        {...rootProps}
      >
        <div className="flex w-full flex-col items-center justify-center pb-4 pt-3 ">
          {children}
        </div>
      </div>
      <Input
        ref={dropzoneState.inputRef}
        disabled={isLOF}
        {...dropzoneState.getInputProps()}
        className={`${isLOF ? "cursor-not-allowed" : ""}`}
      />
    </div>
  );
});

FileInput.displayName = "FileInput";
