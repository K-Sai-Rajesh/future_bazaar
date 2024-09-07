import { createSlice } from "@reduxjs/toolkit";

const snackSlice = createSlice({
  name: "register",
  initialState: {
    message: "",
    open: false,
    color: "info",
  },
  reducers: {
    snackon: (state, actions) => {
      return {
        ...state,
        message: actions.payload.message,
        open: true,
        color: actions.payload.color
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
