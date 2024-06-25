import axios from "axios";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { PREFIX } from "./helpers/API.ts";
import { RequireAuth } from "./helpers/RequierAuth.tsx";
import "./index.css";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import { Layout } from "./layout/Menu/Layout.tsx";
import { Cart } from "./pages/Cart/Cart";
import { Error as ErrorPage } from "./pages/Error/Error";
import { Login } from "./pages/Login/Login.tsx";
import { Product } from "./pages/Product/Product.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { Success } from "./pages/Success/Success.tsx";
import { store } from "./store/store.ts";

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
				path: "/success",
				element: <Success />,
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
						data: axios
							.get(`${PREFIX}/products/${params.id}`)
							.then((data) => data)
							.catch((e) => console.log(e)),
					});
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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
