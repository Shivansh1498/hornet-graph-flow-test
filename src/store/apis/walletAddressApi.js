import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletAddressApi = createApi({
  reducerPath: "walletAddressApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blockchain.info/" }),
  endpoints: (builder) => ({
    getWalletTransactions: builder.query({
      query: (walletAddress) => `rawaddr/${walletAddress}`,
    }),
  }),
});

export const { useLazyGetWalletTransactionsQuery } = walletAddressApi;
