import { createSlice } from "@reduxjs/toolkit";
import { clearSession } from "../../helpers/cookies";

const snackSlice = createSlice({
  name: "register",
  initialState: {
    message: "",
    open: false,
    color: "info",
  },
  reducers: {
    snackon: (state, actions) => {
      // if (actions.payload === "Invalid token ! Please Login.") {
      //   clearSession(true);
      // }
      return {
        ...state,
        message: actions.payload,
        open: true,
      };
    },
    snackoff: (state) => {
      return {
        ...state,
        open: false,
      };
    },
  },
});

export const { snackon, snackoff } = snackSlice.actions;

export default snackSlice.reducer;
