import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientsSlice = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ['Client', 'Reports'],
  endpoints: (build) => ({
    clients: build.query({
      query: (searchQuery) => `/clients${searchQuery}`,
      providesTags: ['Client']
    }),
    client: build.query({
      query: (id) => `/clients/${id}`,
      providesTags: ['Client']
    }),
    addClient: build.mutation({
      query: contact => ({
        url: '/clients',
        method: 'POST',
        body: contact
      }),
      invalidatesTags: ['Client']
    }),
    updateClient: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/clients/${id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: ['Client']
    }),
    deleteClient: build.mutation({
      query: id => ({
        url: `/clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client']
    }),
    searchClient: build.query({
      query: (name) => `/clients?name=${name}`,
      providesTags: ['Client']
    }),
    getReports: build.query({
      query: id => `/reports?client_id=${id}`,
      providesTags: ['Reports']
    }),
    addReport: build.mutation({
      query: report => ({
        url: `/reports`,
        method: 'POST',
        body: report
      }),
      invalidatesTags: ['Reports']
    }),
    addReportData: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/reports/${id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: ['Reports']
    }),
    deleteReport: build.mutation({
      query: id => ({
        url: `/reports/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reports']
    }),
  })
});


// the name of the hook should start "use" following the name of the endpoint
// in this case "contacts" following "Query"
// this hook is comming from the contactsApi
export const {
  useClientsQuery,
  useClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetReportsQuery,
  useAddReportMutation,
  useDeleteReportMutation,
  useSearchClientQuery,
  useAddReportDataMutation
} = clientsSlice;