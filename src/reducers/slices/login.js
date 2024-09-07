import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { CookiesNames, getSession, getTokenExpiry, setCookieItem, setSession } from "../../helpers/cookies";
import { snackon } from "./snackbar";
import { loadoff, loadon } from "./loading";

export const signIn = createAsyncThunk(
    "signIn",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/login`;
            const response = await client.post(url, params);
            setSession(response);
            return Promise.resolve(response);
        } catch (error) {
            dispatch(snackon({ message: error, color: 'error' }));
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const refreshToken = async (rToken) => {
    try {
        const url = `${config.USER_API}/users/refreshToken`;
        const data = { refreshToken: rToken };
        const response = await client.post(url, data);
        const tokenExpiry = getTokenExpiry();
        setCookieItem(CookiesNames.REFRESH_TOKEN, rToken, tokenExpiry);
        setCookieItem(
            CookiesNames.ACCESS_TOKEN,
            response.data.accessToken,
            tokenExpiry
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated: false,
        user: {},
        loading: false,
    },
    reducers: {
        checkSession: (state) => {
            const session = getSession();
            state.isAuthenticated = Boolean(session?.accessToken);
            state.user = session?.user || {};
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(signIn.fulfilled, (state, payload) => {
                const { user, accessToken, refreshToken } = payload;
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.user = user;
            })
            .addCase(signIn.rejected, (state) => {
                state.loading = false;
            })
    },
});

export const { checkSession } = loginSlice.actions;

export default loginSlice.reducer;