import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { snackon } from "./snackbar";
import { loadoff, loadon } from "./loading";
import { clearSession, CookiesNames, getCookieItem, setSession } from "../../helpers/cookies";

export const Register = createAsyncThunk(
  "register",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loadon(true));
      const url = `${config.BASE_API}/register`;
      const response = await client.post(url, params);
      dispatch(snackon({ message: response?.message, color: 'success' }));
      return Promise.resolve(response?.message);
    } catch (error) {
      dispatch(snackon({ message: error, color: 'error' }));
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
  async ({ profile }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loadon(true));
      const url = `${config.BASE_API}/update_profile`;
      const response = await client.post(url, profile);
      console.log(response)
      if (response.message === "Updated Successfully !") {
        const accessToken = getCookieItem(CookiesNames.ACCESS_TOKEN)
        setSession({ accessToken, refreshToken: accessToken, data: response.result })
      }
      dispatch(snackon({ message: response.message, color: 'success' }));
      return Promise.resolve(response);
    } catch (error) {
      dispatch(snackon({ message: error, color: 'error' }));
      if (error === "Invalid token ! Please Login.") {
        clearSession(true);
      }
      return rejectWithValue(error);
    } finally {
      dispatch(loadoff(false));
    }
  }
);

export const UpdateSecurity = createAsyncThunk(
  "updateSecurity",
  async ({ security }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loadon(true));
      const url = `${config.BASE_API}/update_security`;
      const response = await client.post(url, security);
      dispatch(snackon({ message: response.message, color: 'success' }));
      return Promise.resolve(response);
    } catch (error) {
      dispatch(snackon({ message: error.message, color: 'error' }));
      if (error === "Invalid token ! Please Login.") {
        clearSession(true);
      }
      return rejectWithValue(error);
    } finally {
      dispatch(loadoff(false));
    }
  }
);

export const updateprofilepic = createAsyncThunk(
  "updateprofilepic",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loadon(true));
      const headers = { "Content-Type": "multipart/form-data" }
      const url = `${config.BASE_API}/update_profile_picture`;
      const response = await client.post(url, params, headers);
      if (response.message === "Profile Updation Successful !") {
        const accessToken = getCookieItem(CookiesNames.ACCESS_TOKEN)
        setSession({ accessToken, refreshToken: accessToken, data: { ...params.user, propic: response?.url } })
      }
      dispatch(snackon({ message: response.message, color: 'success' }));
      return Promise.resolve(response);
    } catch (error) {
      dispatch(snackon({ message: error.message, color: 'error' }));
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
      .addCase(updateprofilepic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateprofilepic.fulfilled, () => { })
      .addCase(updateprofilepic.rejected, (state) => {
        state.loading = false;
      })

      .addCase(UpdateSecurity.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateSecurity.fulfilled, () => { })
      .addCase(UpdateSecurity.rejected, (state) => {
        state.loading = false;
      })

      .addCase(Register.pending, (state) => {
        state.loading = true;
      })
      .addCase(Register.fulfilled, () => { })
      .addCase(Register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProfile.fulfilled, () => { })
      .addCase(UpdateProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default registerSlice.reducer;
