import { Progress } from "@atoms/progress";
import { Loader2 } from "lucide-react";
import { cn } from "@/core/utils/shadcn-utils";

export interface ProcessLoadingDialogProps {
  /**
   * Controls whether the popover is open
   */
  open: boolean;
  /**
   * The process description text to display
   */
  text?: string;
  /**
   * Optional title for the popover
   * @default "Processing"
   */
  title?: string;
  /**
   * Progress percentage (0-100)
   * If not provided, shows indeterminate spinner
   */
  progress?: number;
  /**
   * Position of the popover
   * @default "center"
   */
  position?: "center" | "top" | "bottom";
}

/**
 * ProcessLoadingDialog component
 *
 * A fixed positioned card that displays a loading spinner/progress bar with process text.
 * Appears as a floating popover without blocking the entire screen.
 *
 * @example
 * ```tsx
 * const [isProcessing, setIsProcessing] = useState(false);
 * const [progress, setProgress] = useState(0);
 *
 * // With progress bar
 * <ProcessLoadingDialog
 *   open={isProcessing}
 *   text="Uploading files..."
 *   title="Upload in Progress"
 *   progress={progress}
 *   position="bottom"
 * />
 *
 * // Without progress (indeterminate spinner)
 * <ProcessLoadingDialog
 *   open={isProcessing}
 *   text="Saving your data..."
 *   title="Please Wait"
 * />
 * ```
 */
export function ProcessLoadingDialog({
  open,
  text = "Please wait...",
  title = "Processing",
  progress,
  position = "center",
}: ProcessLoadingDialogProps) {
  if (!open) return null;

  const positionClasses = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    top: "top-4 left-1/2 -translate-x-1/2",
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[9998] animate-in fade-in-0 duration-200" />

      {/* Popover card */}
      <div
        className={cn(
          "fixed z-[9999] w-full max-w-md mx-4",
          "bg-background rounded-lg border shadow-lg p-6",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          positionClasses[position]
        )}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-center">{title}</h3>

          {/* Progress or Spinner */}
          <div className="flex flex-col items-center gap-4">
            {progress !== undefined ? (
              <div className="w-full space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-center text-sm font-medium text-muted-foreground">
                  {Math.round(progress)}%
                </p>
              </div>
            ) : (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            )}

            {/* Description text */}
            {text && (
              <p className="text-center text-sm text-muted-foreground">{text}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
