import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../slices/authSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/users/`,
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query() {
        return {
          url: "me",
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addRemoveFriend: builder.mutation({
      query(userId, friendId) {
        return {
          url: `${userId}/${friendId}`,
          method: "PATCH",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetMeQuery, useAddRemoveFriendMutation } = userApi;
