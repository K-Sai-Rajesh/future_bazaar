import * as React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import DashboardNav from "./DashboardNav";

function Dashboard() {
  return (
    <>
      <DashboardNav />
      <Grid
        container
        mt={"90px"}
        px={2}
        justifyContent={'center'}
      >
        <Outlet />
      </Grid>
    </>
  );
}

export default React.memo(Dashboard);
