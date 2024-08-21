import { useRoutes } from "react-router-dom";
import { routes } from "./common/routes";
import {
  Backdrop,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { snackoff } from "./reducers/slices/snackbar";

function App() {
  const route = useRoutes(routes);
  const { message, open, color } = useSelector((state) => state.snack);
  const { load } = useSelector((state) => state.load);
  const dispatch = useDispatch();
  function handleClose() {
    dispatch(snackoff());
  }
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        color={color}
        message={
          <Typography fontSize="14px" fontFamily="Raleway" fontWeight="bold">
            {message}
          </Typography>
        }
      />
      {route}
    </>
  );
}

export default App;
