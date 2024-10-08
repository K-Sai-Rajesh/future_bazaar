import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/Register";
import Auth from "./Auth";
import AdminPanel from "../pages/AdminPanel";
import Products from "../pages/Products";
import AddNewProduct from "../pages/AddProduct";
import Product from "../pages/Product";
import MapLocation from "../pages/Map";
import PeerLocation from "../pages/PeerLocation";
import Shop from "../pages/Shop";
import Seller from "../pages/Seller";
import Profile from "../pages/profile/Profile";
import Blog from "../pages/Landing/Landing";
import BasicInfo from "../pages/profile/BasicInfo";
import Security from "../pages/profile/Security";
import NotFound from "../pages/NotFound";
import SellerProducts from "../pages/SellerProducts";
import WishList from "../pages/WishList";
// import MainContent from "../pages/Landing/components/MainContent";
import Main from "../pages/Landing/components/Main";
import AddCategory from "../pages/AddCategory";

export const routes = [
  {
    path: "",
    element: <Blog />,
    children: [
      {
        path: '',
        element: <Main />
      },
      {
        path: "404",
        element: <NotFound />,
      },
      {
        path: "product/:id",
        element: <Product />
      },
      {
        path: "seller/:id",
        element: <Seller />,
      },
      {
        path: "seller/:id/products",
        element: <SellerProducts />,
      },
      {
        path: 'location',
        element: <PeerLocation />
      },
      {
        path: 'map',
        element: <MapLocation />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Auth>
        <Outlet />
      </Auth>
    ),
    children: [
      {
        path: "admin",
        element: <AdminPanel />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: 'basic info',
            element: <BasicInfo />
          },
          {
            path: 'security',
            element: <Security />
          }
        ]
      },
      {
        path: "wish list",
        element: <WishList />,
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
        path: "account",
        element: <Shop />
      },
      {
        path: "add category",
        element: <AddCategory />
      }
    ],
  },
  {
    path: "dashboard/*",
    // element: <NotFound />,
  },
];
