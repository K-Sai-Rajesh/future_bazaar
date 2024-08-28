import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login";
import registerReducer from "./slices/register";
import snackReducer from "./slices/snackbar";
import loadingReducer from "./slices/loading";
import adminReducer from "./slices/admin";
import sellerReducer from "./slices/seller";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    snack: snackReducer,
    load: loadingReducer,
    admin: adminReducer,
    seller: sellerReducer
  },
});
