import { Outlet, RouteObject } from "react-router-dom";
import HappyBoxLayout from "./layout";
import { EVENT_PAGES } from "@/config/event-pages";

import SignInModal from "./sections/sign-in-modal";
import AuthWSCodeGuard from "@/lib/auth/auth-ws-code/permissions/auth-guard";
import AuthWSCodeGuestGuard from "@/lib/auth/auth-ws-code/permissions/guest-guard";
import RootLayout from "./root";

export const HAPPY_BOX_ROUTES: RouteObject[] = [
  {
    path: EVENT_PAGES.HAPPY_BOX.SITE_URL,
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        path: "sign-in",
        lazy: () => import("./pages/login.page"),
      },

      {
        path: "",
        element: (
          // <AuthWSCodeGuard redirectTo={`../sign-in`}>
          <Outlet />
          // </AuthWSCodeGuard>
        ),
        children: [
          {
            index: true,
            lazy: () => import("./pages/home.page"),
          },
          {
            path: ":id/upload",
            lazy: () => import("./pages/upload.page"),
          },
        ],
      },
    ],
  },
];
