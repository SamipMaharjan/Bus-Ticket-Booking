import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: LoginPayload) => ({
        url: "/adminLogin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    adminLogin: builder.mutation({
      query: (credentials: LoginPayload) => ({
        url: "/adminLogin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (data: any) => ({
        url: "/registerCompany",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation, useSignupMutation, useAdminLoginMutation } =
  authApiSlice;
