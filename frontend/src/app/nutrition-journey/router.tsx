import { Outlet, RouteObject } from "react-router-dom";

import { EVENT_PAGES } from "@/config/event-pages";

import AuthWSCodeGuard from "@/lib/auth/auth-ws-code/permissions/auth-guard";

import RootLayout from "./root";
import Layout from "./layout";

export const NUTRITION_JOURNEY_ROUTES: RouteObject[] = [
  {
    path: EVENT_PAGES.NUTRITION_JOURNEY.SITE_URL,
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        path: "",
        element: (
          <AuthWSCodeGuard redirectTo={`./sign-in`}>
            <Layout>
              <Outlet />
            </Layout>
          </AuthWSCodeGuard>
        ),
        children: [
          {
            index: true,
            lazy: () => import("./pages/home.page"),
          },
          {
            path: "upload/:qId/:index",
            lazy: () => import("./pages/upload.page"),
          },
        ],
      },
    ],
  },
];
