import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Login } from "../pages/Login";
import { ShopList } from "../pages/ShopList";
import { ProductList } from "../pages/ProductList";
import { RegisterUser } from "../pages/RegisterUser";
import { RegisterShop } from "../pages/RegisterShop";
import { RegisterProduct } from "../pages/RegisterProduct";
import { Error } from "../components/Error";
import { MapShop } from "../components/Map";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <ShopList />,
      },
      {
        path: "/lista-produtos",
        element: <ProductList />,
      },
      {
        path: "/entrar",
        element: <Login />,
      },
      {
        path: "/cadastrar-usuario",
        element: <RegisterUser />,
      },
      {
        path: "/cadastrar-loja",
        element: <RegisterShop />,
      },
      {
        path: "/cadastrar-produto",
        element: <RegisterProduct />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
