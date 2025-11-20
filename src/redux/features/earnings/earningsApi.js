import { baseApi } from "../../baseApi/baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: () => ({
        url: `/payment-transactions/overview/admin`, // ✅ Fixed API URL
        method: "GET",
      }),
      transformResponse: (response) => response?.data, // ✅ Returns only needed data
    }),
    getPaymentTransactionsHistory: builder.query({
      query: () => ({
        url: `/payment-transactions/paginate`, // ✅ Fixed API URL
        method: "GET",
      }),
      transformResponse: (response) => response?.data, // ✅ Returns only needed data
    }),
  }),
});

export const { useGetEarningsQuery, useGetPaymentTransactionsHistoryQuery } = earningsApi;
