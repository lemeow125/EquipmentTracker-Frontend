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
    path: "/activation/:uid/:token",
    element: (
      <>
        <ActivationPage />
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
