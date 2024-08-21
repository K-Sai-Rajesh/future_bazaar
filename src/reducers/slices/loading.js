import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    load: false,
  },
  reducers: {
    loadon: (state, { payload }) => {
      return {
        ...state,
        load: payload,
      };
    },
    loadoff: (state, { payload }) => {
      return {
        ...state,
        load: payload,
      };
    },
  },
});

export const { loadon, loadoff } = loadingSlice.actions;

export default loadingSlice.reducer;
