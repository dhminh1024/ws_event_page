import { Outlet, RouteObject } from "react-router-dom";
import HappyBoxLayout from "./layout";
import { EVENT_PAGES } from "@/config/event-pages";

import SignInModal from "./sections/sign-in-modal";
import AuthWSCodeGuard from "@/lib/auth/auth-ws-code/permissions/auth-guard";
import AuthWSCodeGuestGuard from "@/lib/auth/auth-ws-code/permissions/guest-guard";

export const HAPPY_BOX_ROUTES: RouteObject[] = [
  {
    path: EVENT_PAGES.HAPPY_BOX.SITE_URL,
    element: (
      <HappyBoxLayout>
        <Outlet />
      </HappyBoxLayout>
    ),
    children: [
      {
        path: "",
        lazy: () => import("./page"),
        children: [
          {
            path: "sign-in",
            element: (
              <AuthWSCodeGuestGuard eventUrl={EVENT_PAGES.HAPPY_BOX.SITE_URL}>
                <SignInModal />
              </AuthWSCodeGuestGuard>
            ),
          },
        ],
      },
      {
        path: "challenge",
        element: (
          <AuthWSCodeGuard redirectTo={`../sign-in`}>
            <Outlet />
          </AuthWSCodeGuard>
        ),
        children: [
          {
            index: true,
            lazy: () => import("./pages/challenge.page"),
          },
        ],
      },
      {
        path: "album",
        element: (
          <AuthWSCodeGuard redirectTo={`../sign-in`}>
            <Outlet />
          </AuthWSCodeGuard>
        ),
        children: [
          {
            index: true,
            lazy: () => import("./pages/album.page"),
          },
        ],
      },
    ],
  },
];
