import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, setFriends } from "../slices/authSlice";

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
      query({ userId, friendId }) {
        return {
          url: `${userId}/${friendId}`,
          method: "PATCH",
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setFriends(data.friends));
        dispatch(
          userApi.util.updateQueryData("getFriends", undefined, (draft) => {
            console.log(JSON.stringify(draft));
          })
        );
      },
    }),

    getFriends: builder.query({
      query: (userId) => {
        return {
          url: `${userId}/friends`,
          method: "GET",
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setFriends(data));
      },
    }),
    getUser: builder.query({
      query: (userId) => {
        return {
          url: `${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useAddRemoveFriendMutation,
  useGetFriendsQuery,
  useGetUserQuery,
} = userApi;
