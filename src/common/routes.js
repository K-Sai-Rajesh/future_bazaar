import { Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import SignUp from "../pages/Register";
// import Landing from "../pages/Landing";
// import Login from "../pages/Login";
import Auth from "./Auth";
import LandingPage from "../pages/LandingPage";
import AdminPanel from "../pages/AdminPanel";
import SellerDashboard from "../pages/SellerDashboard";
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
      path: "seller",
      element: <SellerDashboard />,
    },
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
