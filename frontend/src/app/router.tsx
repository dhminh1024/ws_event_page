import { FC, useMemo } from "react";

import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import FullPageLoaderTemplate from "@templates/full-page-loader.template";
import env from "@/config/env";

import ClientErrorState from "@features/states/client-error-state";

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
