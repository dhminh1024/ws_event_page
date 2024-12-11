import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { ModalProvider } from "@/lib/shadcn/modal-provider";

const DISPLAY_NAME = "RootLayout";

const Component: FC = () => {
  return (
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  );
};

Component.displayName = DISPLAY_NAME;

export { Component };
