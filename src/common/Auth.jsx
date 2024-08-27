import { Navigate } from "react-router-dom";
import { CookiesNames, getCookieItem } from "../helpers/cookies";
import Dashboard from "../layout/Dashboard";

export default function Auth() {
  const token = getCookieItem(CookiesNames?.ACCESS_TOKEN);
  
  return (
    <>
      {token ?
        <Dashboard />
        : (
          <Navigate to={"/login"} replace={true} />
        )}
    </>
  );
}
