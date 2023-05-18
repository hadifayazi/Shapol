import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "api/users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/users/",
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query(userId) {
        return {
          url: "me",
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;
export { userApi };
