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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const newPost = data.data;
          dispatch(
            postApi.util.updateQueryData("getFeedPosts", undefined, (draft) => {
              draft?.data?.push(newPost);
            })
          );
        } catch (error) {
          console.log(error);
        }
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
    getLikes: builder.mutation({
      query(postId, loggedInUserId) {
        return {
          url: `posts/${postId}/like`,
          method: "PATCH",
          credentials: "include",
          body: loggedInUserId,
        };
      },
    }),
    getFeedPosts: builder.query({
      query() {
        return {
          url: "posts",
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetMyPostsQuery,
  useGetLikesMutation,
  useGetFeedPostsQuery,
} = postApi;
export { postApi };
