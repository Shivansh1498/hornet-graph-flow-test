import { configureStore } from "@reduxjs/toolkit";
import { walletAddressApi } from "./apis/walletAddressApi";
import walletGraphReducer from "./slices/walletGraphSlice";

export const store = configureStore({
  reducer: {
    walletGraph: walletGraphReducer,
    [walletAddressApi.reducerPath]: walletAddressApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(walletAddressApi.middleware),
});
