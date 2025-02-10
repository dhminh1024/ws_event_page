import { useWindowSize } from "usehooks-ts";

export const useResponsive = () => {
  const { width } = useWindowSize();
  const isDesktop = width >= 768;

  return { isDesktop };
};
