import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  Paper,
  Typography,
} from "@mui/material";
import logo from "../assets/images/futurebazaar.png";
import { MoreVertOutlined } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { CookiesNames, clearSession, getCookieItem } from "../helpers/cookies";
import { stringAvatar } from "../helpers/features";
// import { useSelector } from 'react-redux';

function DashboardNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { pathname } = useLocation();
  const { name, role } = JSON.parse(
    decodeURIComponent(getCookieItem(CookiesNames.USER))
  );
  const links = ["shop", "catalog"];
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: "fixed",
          top: 0,
          zIndex: 100,
        }}
      >
        <Grid item xs={12} component={Paper} elevation={3} px={2} py={1}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={6} sm={4} lg={3}>
              <IconButton>
                <Avatar alt="Remy Sharp" src={logo} />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={6}
              sm={8}
              lg={9}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
              columnGap={2}
            >
              {window.innerWidth > 400 && (
                <div>
                  <Typography
                    fontFamily={"Nunito"}
                    textTransform={"capitalize"}
                    fontSize={14}
                    fontWeight={"bold"}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {name}
                  </Typography>
                  <Typography
                    fontFamily={"Nunito"}
                    textTransform={"capitalize"}
                    fontSize={10}
                    fontWeight={"bold"}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {role}
                  </Typography>
                </div>
              )}
              <Avatar {...stringAvatar(name ? name : "Profile")} />
              <IconButton
                onClick={handleClick}
                size="small"
                // sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreVertOutlined sx={{ fontSize: "30px" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    p: 1,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Box display={"flex"} flexDirection={"column"} rowGap={1}>

                  <NavLink
                    to={`/dashboard`}
                    exact
                    style={() => ({
                      color: pathname === "/dashboard" ? "#00398D" : "#3F3D56",
                      textDecorationLine: pathname === "/dashboard" ? "underline" : "none",
                    })}
                  >
                    <Typography
                      fontFamily={"Nunito"}
                      textTransform={"capitalize"}
                      fontSize={14}
                      fontWeight={"bold"}
                    >
                      Dashboard
                    </Typography>
                  </NavLink>

                  {links?.map((item, idx) => {
                    return (
                      <NavLink
                        key={idx}
                        to={`${item}`}
                        exact
                        style={({ isActive }) => ({
                          color: isActive ? "#00398D" : "#3F3D56",
                          textDecorationLine: isActive ? "underline" : "none",
                        })}
                      >
                        <Typography
                          fontFamily={"Nunito"}
                          textTransform={"capitalize"}
                          fontSize={14}
                          fontWeight={"bold"}
                        >
                          {item}
                        </Typography>
                      </NavLink>
                    );
                  })}
                </Box>
              </Menu>
              <Button
                disableElevation
                variant="outlined"
                size="small"
                onClick={() => {
                  clearSession(true);
                  // navigate('/login')
                }}
                sx={{
                  borderRadius: 10,
                  textTransform: "capitalize",
                  fontFamily: "Nunito",
                  color: "#00398D",
                  borderColor: "#00398D",
                  borderWidth: 2,
                  fontWeight: "bold",
                }}
              >
                logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(DashboardNav);
