import { clear } from "console";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import { number } from "zod";

interface ScrollButtonProps extends HTMLAttributes<HTMLElement> {
  to: string;
}

export default function ScrollButton({
  to,
  children,
  ...props
}: PropsWithChildren<ScrollButtonProps>) {
  // const scrollToSection = () => {
  //   const section = document.getElementById(to);
  //   if (section) {
  //     const x = setInterval(() => {
  //       const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  //       if (section.getBoundingClientRect().top < 1) clearInterval(x);
  //       window.scrollTo({
  //         top: sectionTop,
  //         behavior: "smooth",
  //       });
  //     }, 200);
  //   }
  // };
  const scrollToSection = (section: HTMLElement) => {
    if (section) {
      const x = setInterval(() => {
        if (section.offsetHeight > 0) clearInterval(x);
        section.scrollIntoView({
          behavior: "smooth",
        });

      }, 300);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const section = document.getElementById(to);
    if (!section) return;
    scrollToSection(section);
    window.location.hash = to;
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
