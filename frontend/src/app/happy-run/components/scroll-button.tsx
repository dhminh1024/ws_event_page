import React, { HTMLAttributes, PropsWithChildren } from 'react';

interface ScrollButtonProps extends HTMLAttributes<HTMLElement> {
  to: string;
}

export default function ScrollButton({
  to,
  children,
  ...props
}: PropsWithChildren<ScrollButtonProps>) {
  const scrollToSection = () => {
    const section = document.getElementById(to);
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - 100, behavior: 'smooth' });
      window.location.hash = to;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    scrollToSection();
    // if (React.isValidElement(children)) {
    //   const originalOnClick = (children as React.ReactElement).props.onClick;
    //   if (originalOnClick) {
    //     originalOnClick(e);
    //   }
    // }
  };

  const newChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onClick: handleClick,
      });
    }
    return child;
  });

  return <>{newChildren}</>;
}
