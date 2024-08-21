import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { snackon } from "./snackbar";
import { loadoff, loadon } from "./loading";
import { clearSession } from "../../helpers/cookies";

export const Register = createAsyncThunk(
  "register",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loadon(true));
      console.log(params);
      const url = `${config.BASE_API}/register`;
      const response = await client.post(url, params);
      return Promise.resolve(response);
    } catch (error) {
      dispatch(snackon(error));
      console.log(error);
      if (error === "Invalid token ! Please Login.") {
        clearSession(true);
      }
      return rejectWithValue(error);
    } finally {
      dispatch(loadoff(false));
    }
  }
);
export const UpdateProfile = createAsyncThunk(
  "updateProfile",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loadon(true));
      console.log(params);
      const url = `${config.BASE_API}/update_profile`;
      const response = await client.post(url, params);
      return Promise.resolve(response);
    } catch (error) {
      dispatch(snackon(error));
      console.log(error);
      if (error === "Invalid token ! Please Login.") {
        clearSession(true);
      }
      return rejectWithValue(error);
    } finally {
      dispatch(loadoff(false));
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Register.pending, (state) => {
        state.loading = true;
      })
      .addCase(Register.fulfilled, (state, payload) => {})
      .addCase(Register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProfile.fulfilled, (state, payload) => {})
      .addCase(UpdateProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default registerSlice.reducer;
