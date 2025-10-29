import { cn } from '@/core/utils/shadcn-utils';
import React, {
  PropsWithChildren,
  FunctionComponent,
  HTMLAttributes,
} from 'react';


type ContainerProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren & {};

const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div className={cn('max-w-5120 md:px-20 px-80 mx-auto', className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
