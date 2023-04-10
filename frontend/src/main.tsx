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
  AdminDashboardContainer,
  AllocatedTasks,
  CustomerDashboardContainer,
  Footer,
  Navbar,
  ServiceRequestForm,
  UnallocatedTasks,
} from "./components";

import "./index.css";
import { RequestFormDetails } from "./components/customerDashboard/RequestFormDetails";

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
  {
    path: "/dashboard/customer/formdetails",
    element: (
      <>
        <RequestFormDetails />
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
    element: (
      <>
        <AdminDashboardContainer />
        <Footer />,
      </>
    ),
  },
  {
    path: "/dashboard/admin/unallocated",
    element: (
      <>
        <UnallocatedTasks />
        <Footer />
      </>
    ),
  },
  {
    path: "/dashboard/admin/allocated",
    element: (
      <>
        <AllocatedTasks />
        <Footer />
      </>
    ),
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
