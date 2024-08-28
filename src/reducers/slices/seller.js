import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { loadoff, loadon } from "./loading";

export const AddProduct = createAsyncThunk(
    "AddProduct",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const headers = { "Content-Type": "multipart/form-data" }
            const url = `${config.BASE_API}/add_product`;
            const response = await client.post(url, param, headers);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const GetProducts = createAsyncThunk(
    "GetProducts",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_products`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const GetProduct = createAsyncThunk(
    "GetProduct",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_product/${param}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const Category = createAsyncThunk(
    "Category",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            // dispatch(loadon(true));
            const url = `${config.BASE_API}/categories`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const SubCategory = createAsyncThunk(
    "SubCategory",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            // dispatch(loadon(true));
            // const headers = { "Content-Type": "multipart/form-data" }
            const url = `${config.BASE_API}/categories/${param}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

const sellerSlice = createSlice({
    name: "seller",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProduct.fulfilled, () => { })
            .addCase(GetProduct.rejected, (state) => {
                state.loading = false;
            })

            .addCase(GetProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProducts.fulfilled, () => { })
            .addCase(GetProducts.rejected, (state) => {
                state.loading = false;
            })

            .addCase(SubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(SubCategory.fulfilled, () => { })
            .addCase(SubCategory.rejected, (state) => {
                state.loading = false;
            })

            .addCase(Category.pending, (state) => {
                state.loading = true;
            })
            .addCase(Category.fulfilled, () => { })
            .addCase(Category.rejected, (state) => {
                state.loading = false;
            })

            .addCase(AddProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(AddProduct.fulfilled, () => { })
            .addCase(AddProduct.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default sellerSlice.reducer;
