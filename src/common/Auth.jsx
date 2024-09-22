import { Navigate, useLocation } from "react-router-dom";
import { CookiesNames, getCookieItem, getSession } from "../helpers/cookies";
import Dashboard from "../layout/Dashboard";
import { authRoutes } from "../helpers/features";

export default function Auth() {
  const token = getCookieItem(CookiesNames?.ACCESS_TOKEN);
  const user = getSession();
  const { pathname } = useLocation()
  const path = pathname.split('/')[pathname.split('/').length - 1].replace("%20", " ")
  const isAuthorised = authRoutes.filter(link => path === link.route)[0]?.access.includes(user?.user?.role)
  return (
    <>
      {token ?
        isAuthorised ? <Dashboard /> : <Navigate to={"/404"} replace={false} />
        :
        <Navigate to={"/login"} replace={true} />
      }
    </>
  );
}
