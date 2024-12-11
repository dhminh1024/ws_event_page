import "@/core/locales/i18n";

import { Suspense } from "react";
import FrappeProvider from "@/lib/frappe/provider";
import FullPageLoaderTemplate from "@templates/full-page-loader.template";
import { ThemeProvider } from "@/lib/shadcn/theme-provider";
import RootRouter from "@/app/router";
import { SettingsProvider } from "@/lib/auth/settings/settings-provider";

function App() {
  return (
    <Suspense fallback={<FullPageLoaderTemplate />}>
      <FrappeProvider>
        <ThemeProvider>
          <SettingsProvider>
            <RootRouter />
          </SettingsProvider>
        </ThemeProvider>
      </FrappeProvider>
    </Suspense>
  );
}

export default App;
