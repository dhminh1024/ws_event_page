import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { ModalProvider } from "@/lib/shadcn/modal-provider";
import { Helmet } from "react-helmet";

const DISPLAY_NAME = "RootLayout";
// import { Helmet, HelmetProvider, HelmetData } from "react-helmet-async";

const Component: FC = () => {
  return (
    // <HelmetProvider >

    <ModalProvider>

      <Outlet />
    </ModalProvider>
    // </HelmetProvider>
  );
};

Component.displayName = DISPLAY_NAME;

export { Component };
