import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../slices/authSlice";

const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return { url: "auth/signup", method: "POST", body: data };
      },
    }),
    loginUser: builder.mutation({
      query(user) {
        return {
          url: "auth/login",
          method: "POST",
          body: user,
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: "auth/logout",
          credentials: "include",
        };
      },
    }),
    getMe: builder.query({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      transformResponse: (response) => {
        const data = response.user;
        return data;
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetMeQuery,
} = authApi;
export { authApi };
