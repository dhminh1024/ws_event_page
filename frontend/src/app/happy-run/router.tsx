import { Outlet, RouteObject } from "react-router-dom";
import HappyBoxLayout from "./layout";
import { EVENT_PAGES } from "@/config/event-pages";

import SignInModal from "./sections/sign-in-modal";
import AuthWSCodeGuard from "@/lib/auth/auth-ws-code/permissions/auth-guard";
import AuthWSCodeGuestGuard from "@/lib/auth/auth-ws-code/permissions/guest-guard";
import RootLayout from "./root";

export const HAPPY_RUN_ROUTES: RouteObject[] = [
  {
    path: EVENT_PAGES.HAPPY_RUN.SITE_URL,
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
     
      {
        path: "",
        element: (
            <HappyBoxLayout>
              <Outlet />
            </HappyBoxLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import("./pages/home.page"),
          },
          {
            path: "order",
            lazy: () => import("./pages/purchasing-ticket.page"),
          },
        ],
      },
    ],
  },
];
