import { baseApi } from "../../baseApi/baseApi";

const workTrakerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllWorkTraker: builder.query({
            query: ({ from, to, status }) => ({
                url: `/service-bookings/paginate/for-admin?from=${from}&to=${to}${status && "&status=" + status}`,
                method: "GET",
            }),
        }),
        getFullCompletedWorkTraker: builder.query({
            query: (id) => ({
                url: `/service-bookings/with-costs-summary/for-admin/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllWorkTrakerQuery , useGetFullCompletedWorkTrakerQuery } = workTrakerApi;