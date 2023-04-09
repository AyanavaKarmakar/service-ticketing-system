import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { store } from "./redux/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  CustomerDashboardContainer,
  Footer,
  Navbar,
  ServiceRequestForm,
} from "./components";

import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // auth routes
  {
    path: "/",
    element: <App />,
  },

  // customer routes
  {
    path: "/dashboard/customer",
    element: (
      <>
        <CustomerDashboardContainer />
        <Footer />
      </>
    ),
  },
  {
    path: "/dashboard/customer/requestForm",
    element: (
      <>
        <ServiceRequestForm />
        <Footer />
      </>
    ),
  },

  // employee routes
  {
    path: "/dashboard/employee",
    element: <Footer />,
  },

  // admin routes
  {
    path: "/dashboard/admin",
    element: <Footer />,
  },
]);

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Navbar />
        <Toaster />
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
