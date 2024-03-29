import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";
import OffersShimmer from "./components/OffersShimmer";
import store from "./utils/store";
import Main from "./components/Main";
import { createRoot } from "react-dom/client";
import Bdy from "./components/Bdy";

const Offers = lazy(() => import("./components/Offers"));
const Cart = lazy(() => import("./components/Cart"));

const AppLayout = () => {
  return (
    <Provider store={store}>
      <Header />
      <Bdy />
      {/* <Outlet /> */}
      <Footer />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/offers",
        element: (
          <Suspense fallback={<OffersShimmer />}>
            <Offers />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Cart />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
