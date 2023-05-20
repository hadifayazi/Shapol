import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/auth/",
    prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return { url: "signup", method: "POST", body: data };
      },
    }),
    loginUser: builder.mutation({
      query(user) {
        return {
          url: "login",
          method: "POST",
          body: user,
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: "logout",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
export { authApi };
