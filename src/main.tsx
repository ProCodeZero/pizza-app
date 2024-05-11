import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart";
import { Error as ErrorPage } from "./pages/Error/Error";
import { Layout } from "./layout/Layout/Layout.tsx";
import "./index.css";
import { Product } from "./pages/Product/Product.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequierAuth.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(() => import("./pages/Menu/Menu.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .get(`${PREFIX}/products/${params.id}`)
                  .then((data) => resolve(data))
                  .catch((e) => reject(e));
              }, 2000);
            }),
          });
          // defer без задержки
          // return defer({
          //   data: axios
          //     .get(`${PREFIX}/products/${params.id}`)
          //     .then((data) => data),
          //     .catch((e) => reject(e));
          // });

          // await new Promise<void>((resolve) => {
          //   setTimeout(() => {
          //     resolve();
          //   }, 2000);
          // });
          // const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          // return data;
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
