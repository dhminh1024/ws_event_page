import { Outlet, RouteObject } from "react-router-dom";
import Layout from "./layout";
import { EVENT_PAGES } from "@/config/event-pages";

import RootLayout from "./root";

export const KINDERGARTEN_DEMO_DAY_ROUTES: RouteObject[] = [
  {
    path: EVENT_PAGES.KINDERGARTEN_DEMO_DAY.SITE_URL,
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        path: "",
        element: (
            <Layout>
              <Outlet />
            </Layout>
        ),
        children: [
          {
            index: true,
            lazy: () => import("./pages/welcome.page"),
          }
        ],
      },
    ],
  },
];
