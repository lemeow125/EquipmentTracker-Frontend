import LandingPage from "./Pages/LandingPage/LandingPage";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import "./App.css";
import store from "./Components/Plugins/Redux/Store/Store";
const queryClient = new QueryClient();
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createHashRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <></>,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ToastContainer
        autoClose={1500}
        position="bottom-center"
        closeOnClick
        pauseOnHover
        draggable
        theme={"light"}
        limit={3}
      />
    </Provider>
  );
}
