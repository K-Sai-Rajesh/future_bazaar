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
      const url = `${config.BASE_API}/register`;
      const response = await client.post(url, params);
      return Promise.resolve(response?.message);
    } catch (error) {
      dispatch(snackon(error));
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
      return Promise.resolve(response?.message);
    } catch (error) {
      dispatch(snackon(error));
      if (error === "Invalid token ! Please Login.") {
        clearSession(true);
      }
      return rejectWithValue(error);
    } finally {
      dispatch(loadoff(false));
    }
  }
);

export const GetLocation = createAsyncThunk(
  "GetLocation",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const result = await (await fetch('https://api.ipify.org?format=json')).json()
      // .then(response => response.json())
      // .then(data => {
      //   console.log('Your Public IP Address:', data.ip);
      // })
      // .catch(error => {
      //   console.error('Error fetching IP:', error);
      // });
      console.log(result)
      const url = `${config.BASE_API}/get_location?ip=${result?.ip}`;
      const response = await client.get(url);
      console.log(response)
      return Promise.resolve(response);
    } catch (error) {
      dispatch(snackon(error));
      return rejectWithValue(error);
    } finally {
      dispatch(loadoff(false));
    }
  }
)

const registerSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetLocation.fulfilled, () => { })
      .addCase(GetLocation.rejected, (state) => {
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
