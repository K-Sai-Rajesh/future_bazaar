import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { loadoff, loadon } from "./loading";
import { snackon } from "./snackbar";

export const AddProduct = createAsyncThunk(
    "AddProduct",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const headers = { "Content-Type": "multipart/form-data" }
            const url = `${config.BASE_API}/add_product`;
            const response = await client.post(url, param, headers);
            dispatch(snackon({ message: response?.message, color: 'success' }))
            return response;
        } catch (error) {
            dispatch(snackon({ message: error, color: 'error' }))
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const EditProduct = createAsyncThunk(
    "EditProduct",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const headers = { "Content-Type": "multipart/form-data" }
            const url = `${config.BASE_API}/edit_product`;
            const response = await client.post(url, param, headers);
            dispatch(snackon({ message: response.message, color: 'success   ' }))
            return response;
        } catch (error) {
            dispatch(snackon({ message: "Server Error !", color: 'error ' }))
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

export const GetProductsBySellerId = createAsyncThunk(
    "GetProductsBySellerId",
    async ({ id, sub }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_products/${id}/${sub}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const GetSellersAttributes = createAsyncThunk(
    "GetSellersAttributes",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_seller_attributes`;
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

export const DeleteProduct = createAsyncThunk(
    "DeleteProduct",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/delete_product/${param}`;
            const response = await client.delete(url);
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

export const GetSeller = createAsyncThunk(
    "GetSeller",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_seller/${param}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const GetSellersProductById = createAsyncThunk(
    "GetSellersProductById",
    async ({ id, category }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_products/${id}/${category}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
)

const sellerSlice = createSlice({
    name: "seller",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetSellersProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSellersProductById.fulfilled, () => { })
            .addCase(GetSellersProductById.rejected, (state) => {
                state.loading = false;
            })

            .addCase(GetProductsBySellerId.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProductsBySellerId.fulfilled, () => { })
            .addCase(GetProductsBySellerId.rejected, (state) => {
                state.loading = false;
            })

            .addCase(GetSellersAttributes.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSellersAttributes.fulfilled, () => { })
            .addCase(GetSellersAttributes.rejected, (state) => {
                state.loading = false;
            })

            .addCase(GetSeller.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSeller.fulfilled, () => { })
            .addCase(GetSeller.rejected, (state) => {
                state.loading = false;
            })

            .addCase(DeleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteProduct.fulfilled, () => { })
            .addCase(DeleteProduct.rejected, (state) => {
                state.loading = false;
            })

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