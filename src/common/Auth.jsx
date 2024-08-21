import { Navigate, useLocation } from "react-router-dom";
import { CookiesNames, clearSession, getCookieItem } from "../helpers/cookies";
import Dashboard from "../layout/Dashboard";

export default function Auth() {
  const token = getCookieItem(CookiesNames?.ACCESS_TOKEN);
  const { pathname } = useLocation();
  const { role } = JSON.parse(
    decodeURIComponent(getCookieItem(CookiesNames.USER))
  );
  const links =
    role === "Student"
      ? ["/dashboard", "/dashboard/results", "/dashboard/tasks"]
      : role === "Admin"
      ? [
          "/dashboard",
          "/dashboard/profiles",
          "/dashboard/classes",
          "/dashboard/class/add",
          "/dashboard/class/edit",
          "/dashboard/register",
        ]
      : [
          "/dashboard",
          "/dashboard/profiles",
          "/dashboard/classes",
          "/dashboard/class/attendence",
          "/dashboard/results",
          "/dashboard/tasks",
          "/dashboard/register",
        ];
  return (
    <>
      {token ? (
        links.includes(pathname) ? (
          <Dashboard />
        ) : (
          <Navigate to={"/404"} />
        )
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
}
