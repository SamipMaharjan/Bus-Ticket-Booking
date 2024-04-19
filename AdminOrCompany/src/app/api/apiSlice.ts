import CookieHelper from "@/helpers/CookieHelper";
import {
  createApi,
  RootState,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3501",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as any;
    const token =
      CookieHelper.getCookie("token") || CookieHelper.getCookie("superToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder: any) => ({}),
  tagTypes: ["Courses", "Teachers", "Students"],
});

export const baseUrl = "http://localhost:3501/";
