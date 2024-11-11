import {
  Authenticated,
  ErrorComponent,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import dataProvider, {
  GraphQLClient,
  graphqlWS,
  liveProvider,
} from "@refinedev/hasura";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { authProvider } from "./authProvider";
import { Layout } from "./components/layout";

import { ForgotPassword } from "./pages/forgotPassword";
import { CustomLoginPage } from "./pages/login";
import { Register } from "./pages/register";
import Home from "./pages/Home.tsx";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";
const WS_URL = "ws://flowing-mammal-24.hasura.app/v1/graphql";

const client = new GraphQLClient(API_URL, {
  headers: {
    "x-hasura-role": "public",
  },
});

const webSocketClient = graphqlWS.createClient({
  url: WS_URL,
});

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider(client)}
          liveProvider={liveProvider(webSocketClient)}
          authProvider={authProvider}
          routerProvider={routerBindings}
          resources={[
            {
              name: "home",
              list: "/home",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "5eyZKQ-cRHFDr-Dkuhta",
            liveMode: "auto",
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-inner"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <Layout>
                    <Outlet />
                  </Layout>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="blog_posts" />}
              />

              <Route path="/home">
                <Route index element={<Home />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
            <Route
              element={
                <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path="/login" element={<CustomLoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
          </Routes>

          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
