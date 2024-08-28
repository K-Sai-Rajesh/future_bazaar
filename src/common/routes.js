import { Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import SignUp from "../pages/Register";
// import Landing from "../pages/Landing";
// import Login from "../pages/Login";
import Auth from "./Auth";
import LandingPage from "../pages/LandingPage";
import AdminPanel from "../pages/AdminPanel";
// import SellerDashboard from "../pages/AddProduct";
import Products from "../pages/Products";
import AddNewProduct from "../pages/AddProduct";
import Product from "../pages/Product";
// import RegisterPage from "../pages/Register"`;
// import NotFound from "../pages/404";

export const routes = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      }
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <Auth>
        <Outlet />
      </Auth>
    ),
    children: [
      {
        path: "",
        element: <AdminPanel />,
      },
      {
        path: "add product",
        element: <AddNewProduct />,
      },
      {
        path: "edit product",
        element: <AddNewProduct />,
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "product",
        element: <Product />
      }
    ],
  },
  {
    path: "404",
    // element: <NotFound />,
  },
  {
    path: "dashboard/*",
    // element: <NotFound />,
  },
];
