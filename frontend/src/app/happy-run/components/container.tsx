import { cn } from '@/core/utils/shadcn-utils';
import React, {
  PropsWithChildren,
  FunctionComponent,
  HTMLAttributes,
} from 'react';


type ContainerProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren & {};

const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div className={cn('max-w-[1280rem] md:px-[5rem] px-[20rem] mx-auto', className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
