import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { EVENT_PAGES } from "@/config/event-pages";
import RootLayout from "./root";
import PlacementTestLayout from "./layout";

export const PLACEMENT_TEST_ROUTES: RouteObject[] = [
  {
    path: EVENT_PAGES.PLACEMENT_TEST.SITE_URL,
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        path: "registration",
        element: (
          <PlacementTestLayout>
            <Outlet />
          </PlacementTestLayout>
        ),
        children: [
          {
            path: ":id",
            lazy: () => import("./page"),
          },
        ],
      },
      {
        path: "event-registration",
        element: (
          <PlacementTestLayout>
            <Outlet />
          </PlacementTestLayout>
        ),
        children: [
          {
            path: ":id",
            lazy: () => import("./event-registration"),
          },
        ],
      },
    ],
  },
];
