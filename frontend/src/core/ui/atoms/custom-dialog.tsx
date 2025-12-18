import React, { useEffect, useRef, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/core/utils/shadcn-utils";
import { Cross2Icon } from "@radix-ui/react-icons";

export interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disableOutsideClick?: boolean;
}

export interface CustomDialogContentProps extends PropsWithChildren {
  className?: string;
  hideCloseButton?: boolean;
  onClose?: () => void;
}

export interface CustomDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CustomDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CustomDialog: React.FC<PropsWithChildren<CustomDialogProps>> = ({
  open,
  onOpenChange,
  disableOutsideClick = false,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !disableOutsideClick) {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange, disableOutsideClick]);

  if (!open) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Close when clicking on the container (outside content) - only if not disabled
        if (e.target === e.currentTarget && !disableOutsideClick) {
          onOpenChange(false);
        }
      }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/80 animate-in fade-in-0 pointer-events-none" />

      {/* Content Container */}
      <div
        className="relative z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-[48%] w-full flex justify-center"
        onClick={(e) => {
          // Close when clicking in this container but outside the content - only if not disabled
          if (e.target === e.currentTarget && !disableOutsideClick) {
            onOpenChange(false);
          }
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const CustomDialogContent = React.forwardRef<HTMLDivElement, CustomDialogContentProps>(
  ({ className, children, hideCloseButton = false, onClose }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-lg bg-background border shadow-lg sm:rounded-lg",
          "max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-thin",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {!hideCloseButton && onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white/80 backdrop-blur-sm p-1"
            aria-label="Close"
          >
            <Cross2Icon className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
CustomDialogContent.displayName = "CustomDialogContent";

const CustomDialogHeader: React.FC<CustomDialogHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  );
};
CustomDialogHeader.displayName = "CustomDialogHeader";

const CustomDialogTitle: React.FC<CustomDialogTitleProps> = ({
  className,
  ...props
}) => {
  return (
    <h2
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
};
CustomDialogTitle.displayName = "CustomDialogTitle";

export {
  CustomDialog,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogTitle,
};
