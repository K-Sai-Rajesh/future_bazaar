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
        mt={"75px"}
        pb={5}
        justifyContent={'center'}
        sx={{
          backgroundColor: "#F1F1F1",
          minHeight: `${window.innerHeight - 105}px`
        }}
      >
        <Outlet />
      </Grid>
      <FixedBottomNavigation />
      <Copyright />

    </>
  );
}

export default React.memo(Dashboard);
