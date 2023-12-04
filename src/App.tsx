import LandingPage from "./Pages/LandingPage/LandingPage";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import "./App.css";
import store from "./Components/Plugins/Redux/Store/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import Revalidator from "./Components/Revalidator/Revalidator";
import ActivationPage from "./Pages/ActivationPage/ActivationPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage/ResetPasswordPage";
import EquipmentInstancesListPage from "./Pages/EquipmentInstancesListPage/EquipmentInstancesListPage";
import EquipmentListPage from "./Pages/EquipmentListPage/EquipmentListPage";
import EquipmentLogsPage from "./Pages/EquipmentLogsPage/EquipmentLogsPage";
import EquipmentInstanceLogsPage from "./Pages/EquipmentInstanceLogsPage/EquipmentInstanceLogsPage";

const queryClient = new QueryClient();
const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Revalidator />
        <LandingPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Revalidator />
        <DashboardPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/view/equipment_instances",
    element: (
      <>
        <Revalidator />
        <EquipmentInstancesListPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/view/equipment_instances/logs",
    element: (
      <>
        <Revalidator />
        <EquipmentInstanceLogsPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/view/equipments",
    element: (
      <>
        <Revalidator />
        <EquipmentListPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/view/equipments/logs",
    element: (
      <>
        <Revalidator />
        <EquipmentLogsPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/activation/:uid/:token",
    element: (
      <>
        <ActivationPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset_password_confirm/:uid/:token",
    element: (
      <>
        <ResetPasswordPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ToastContainer
        position={"top-right"}
        autoClose={1500}
        closeOnClick
        pauseOnHover
        draggable
        theme={"light"}
        limit={3}
      />
    </Provider>
  );
}
