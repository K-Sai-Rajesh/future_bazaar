import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { loadoff, loadon } from "./loading";
import { snackon } from "./snackbar";

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

export const AddSingleCategory = createAsyncThunk(
    "AddSingleCategory",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const headers = { "Content-Type": "multipart/form-data" }
            const url = `${config.BASE_API}/add_category`;
            const response = await client.post(url, param, headers);
            dispatch(snackon({ message: response?.message, color: 'success' }))
            return Promise.resolve(response);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const AddSubCategory = createAsyncThunk(
    "AddSubCategory",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const headers = { "Content-Type": "multipart/form-data" }
            const url = `${config.BASE_API}/add_sub_category`;
            const response = await client.post(url, param, headers);
            dispatch(snackon({ message: response?.message, color: 'success' }))
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
            .addCase(AddSubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(AddSubCategory.fulfilled, () => { })
            .addCase(AddSubCategory.rejected, (state) => {
                state.loading = false;
            })

            .addCase(AddSingleCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(AddSingleCategory.fulfilled, () => { })
            .addCase(AddSingleCategory.rejected, (state) => {
                state.loading = false;
            })

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
