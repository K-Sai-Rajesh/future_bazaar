import * as React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import DashboardNav from "./DashboardNav";
import Copyright from "../pages/CopyRight";
import FixedBottomNavigation from "./NavigatorBar";

function Dashboard() {
  return (
    <>
      <DashboardNav />
      <Grid
        container
        mt={"55px"}
        pb={5}
        justifyContent={'center'}
      >
        <Outlet />
      </Grid>
      <FixedBottomNavigation />
      <Copyright />

    </>
  );
}

export default React.memo(Dashboard);
