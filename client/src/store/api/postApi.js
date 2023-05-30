import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query(post) {
        return {
          url: "posts",
          method: "POST",
          credentials: "include",
          body: post,
        };
      },
    }),
    getMyPosts: builder.query({
      query(userId) {
        return {
          url: `posts/${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getLikes: builder.query({
      query(postId, loggedInUserId) {
        return {
          url: `posts/${postId}/like`,
          method: "PATCH",
          credentials: "include",
          body: loggedInUserId,
        };
      },
    }),
  }),
});

export const { useCreatePostMutation, useGetMyPostsQuery, useGetLikesQuery } =
  postApi;
export { postApi };
