import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { loadoff, loadon } from "./loading";

export const RegisterData = createAsyncThunk(
    "registerdata",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/admin`;
            const response = await client.get(url);
            return Promise.resolve(response);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const SellerStatusUpdate = createAsyncThunk(
    "SellerStatusUpdate",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/seller_status_update`;
            const response = await client.post(url, param);
            return Promise.resolve(response);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

const adminSlice = createSlice({
    name: "register",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SellerStatusUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(SellerStatusUpdate.fulfilled, () => { })
            .addCase(SellerStatusUpdate.rejected, (state) => {
                state.loading = false;
            })

            .addCase(RegisterData.pending, (state) => {
                state.loading = true;
            })
            .addCase(RegisterData.fulfilled, () => { })
            .addCase(RegisterData.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default adminSlice.reducer;
