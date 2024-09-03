import * as React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import DashboardNav from "./DashboardNav";
import Copyright from "../pages/CopyRight";

function Dashboard() {
  return (
    <>
      <DashboardNav />
      <Grid
        container
        mt={"90px"}
        px={2}
        pb={3}
        justifyContent={'center'}
      >
        <Outlet />
      </Grid>
      <Copyright />
    </>
  );
}

export default React.memo(Dashboard);
