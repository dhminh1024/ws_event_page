import { Loader } from "@atoms/loader";
import { clsx } from "clsx";
import { ReactNode } from "react";

// extends react component props
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  loader?: ReactNode;
  text?: ReactNode;
}

export default function FullPageLoaderTemplate({
  loader = <Loader />,
  text = "Loading...",
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "fixed flex h-screen w-full items-center justify-center",
        className
      )}
    >
      <div className="flex flex-row items-center justify-center gap-4">
        {loader}
        <span className="text-gray cal-sans">{text}</span>
      </div>
    </div>
  );
}
