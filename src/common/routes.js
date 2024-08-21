import { Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
// import Landing from "../pages/Landing";
// import Login from "../pages/Login";
// import Auth from "./Auth";
// import RegisterPage from "../pages/Register"`;
// import NotFound from "../pages/404";

export const routes = [
  {
    path: "",
    element: <Layout />,
    // children: [
    //   {
    //     path: "",
    //     element: <Landing />,
    //   }
    // ],
  },
  {
    path: "login",
    // element: <Login />,
  },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <Auth>
  //       <Outlet />
  //     </Auth>
  //   ),
    // children: [
    //   {
    //     path: "",
    //     element: <DashboardHome />,
    //   },
    //   {
    //     path: "profiles",
    //     element: <Profiles />,
    //   },
    //   {
    //     path: "classes",
    //     element: <Classes />,
    //   },
    //   {
    //     path: "attendence",
    //     element: <Landing />,
    //   },
    //   {
    //     path: "results",
    //     element: <Landing />,
    //   },
    //   {
    //     path: "tasks",
    //     element: <Landing />,
    //   },
    //   {
    //     path: "register",
    //     element: <RegisterPage />,
    //   },
    //   {
    //     path: "class/add",
    //     element: <Class />,
    //   },
    //   {
    //     path: "class/attendence",
    //     element: <Attendence />,
    //   },
    //   {
    //     path: "class/edit",
    //     element: <Class />,
    //   },
    // ],
  // },
  {
    path: "404",
    // element: <NotFound />,
  },
  {
    path: "dashboard/*",
    // element: <NotFound />,
  },
];
