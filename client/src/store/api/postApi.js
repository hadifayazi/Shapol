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
  }),
});

export const { useCreatePostMutation, useGetMyPostsQuery } = postApi;
export { postApi };
