import { Outlet, RouteObject } from "react-router-dom";
import Layout from "./layout";
import { EVENT_PAGES } from "@/config/event-pages";

import RootLayout from "./root";

export const GREATEST_SHOW_25_ROUTES: RouteObject[] = [
  {
    path: EVENT_PAGES.GREATEST_SHOW_25.SITE_URL,
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
            lazy: () => import("./pages/home.page"),
          },
          {
            path: "order",
            lazy: () => import("./pages/register.page"),
          },
          {
            path: "order-detail/:id",
            lazy: () => import("./pages/order-detail.page"),
          }
        ],
      },
    ],
  },
];
