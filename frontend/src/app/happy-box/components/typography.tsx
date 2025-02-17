import { cn } from "@/core/utils/shadcn-utils";
import React, {
  PropsWithChildren,
  FunctionComponent,
  HTMLAttributes,
} from "react";

type TypographyBaseProps = PropsWithChildren &
  HTMLAttributes<HTMLParagraphElement> & {};

const Typography = ({ children }: PropsWithChildren) => {
  return children;
};

type TypographyTextProps = TypographyBaseProps & PropsWithChildren & {};

Typography.Text = (({ className, children, ...props }: TypographyTextProps) => {
  return (
    <span className={cn("text-[14rem]", className)} {...props}>
      {children}
    </span>
  );
}) as FunctionComponent<TypographyTextProps>;
Typography.Text.displayName = "Typography.Text";

type TypographyParagraphProps = TypographyBaseProps & PropsWithChildren & {};

Typography.Paragraph = (({
  className,
  children,
  ...props
}: TypographyParagraphProps) => {
  return (
    <p className={cn("mb-[5rem] text-[14rem]", className)} {...props}>
      {children}
    </p>
  );
}) as FunctionComponent<TypographyParagraphProps>;
Typography.Paragraph.displayName = "Typography.Paragraph";

type TypographyHeadingProps = TypographyBaseProps &
  PropsWithChildren & {
    level?: number;
  };

Typography.Heading = React.forwardRef<HTMLHeadingElement, TypographyHeadingProps>(({
  level = 4,
  className,
  children,
  ...props
}, ref) => {
  if (level === 1)
    return (
      <h1 ref={ref} className={cn("text-[32rem] font-semibold", className)} {...props}>
        {children}
      </h1>
    );
  if (level === 2)
    return (
      <h2 ref={ref} className={cn("text-[24rem] font-semibold", className)} {...props}>
        {children}
      </h2>
    );
  if (level === 3)
    return (
      <h3 ref={ref} className={cn("text-[20rem] font-semibold", className)} {...props}>
        {children}
      </h3>
    );
  if (level === 4)
    return (
      <h4 ref={ref} className={cn("text-[18rem] font-semibold", className)} {...props}>
        {children}
      </h4>
    );
  if (level === 5)
    return (
      <h5 ref={ref} className={cn("text-[16rem] font-semibold", className)} {...props}>
        {children}
      </h5>
    );
  if (level === 6)
    return (
      <h6 ref={ref} className={cn("text-[14rem] font-semibold", className)} {...props}>
        {children}
      </h6>
    );
});
Typography.Text.displayName = "Typography.Heading";

type TypographyLabelProps = HTMLAttributes<HTMLLabelElement> &
  TypographyBaseProps & {};

Typography.Label = (({
  className,
  children,
  ...props
}: TypographyLabelProps) => {
  return (
    <label className={cn("text-[14rem] leading-normal", className)} {...props}>
      {children}
    </label>
  );
}) as FunctionComponent<TypographyLabelProps>;
Typography.Label.displayName = "Typography.Label";

export default Typography;
