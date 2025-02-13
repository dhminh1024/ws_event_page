import { FC, useMemo } from "react";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import FullPageLoaderTemplate from "@templates/full-page-loader.template";
import env from "@/config/env";

import ClientErrorState from "@features/states/client-error-state";
import { HAPPY_BOX_ROUTES } from "./happy-box/router";
import { HAPPY_RUN_ROUTES } from "./happy-run/router";
import { NUTRITION_JOURNEY_ROUTES } from "./nutrition-journey/router";

export type GlobalErrorProps = {
  className?: string;
};

export const GlobalError: FC<GlobalErrorProps> = () => {
  const error = useRouteError();

  if (import.meta.env.MODE !== "development" && error) {
    console.log(error);
  }
  console.log(error);

  return <ClientErrorState />;
};

const RootRouter = () => {
  const router = useMemo(
    () =>
      createBrowserRouter(
        [
          {
            path: "/",
            errorElement: <GlobalError />,
            children: [
              {
                index: true,
                path: "/",
                lazy: () => import("./home.page"),
              },
              ...HAPPY_BOX_ROUTES,
              ...HAPPY_RUN_ROUTES,
              ...NUTRITION_JOURNEY_ROUTES,
              {
                path: "*",
                element: <Navigate replace to="/" />,
              },
            ],
          },
        ],
        {
          basename: `/${env.BASE_NAME}`,
        }
      ),
    []
  );

  return <RouterProvider router={router} />;
};

export default RootRouter;
