import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/slices/authSlice";
import { useGetFeedPostsQuery } from "../../store/api/postApi";
import SinglePostWidget from "./SinglePostWidget";

const PostsWidget = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.auth);
  //   console.log(posts.posts.data);
  const { data, isSuccess, isError, error } = useGetFeedPostsQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data.data);
      dispatch(setPosts({ posts: data }));
    }
    if (isError || error) {
      console.log(error);
    }
  }, [isSuccess, data, dispatch, isError, error]);

  return (
    <>
      {posts?.posts?.data?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          discription,
          location,
          photoPath,
          userPhotoPath,
          likes,
          comments,
        }) => (
          <SinglePostWidget
            key={_id}
            postId={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            description={discription}
            location={location}
            photoPath={photoPath}
            userPhotoPath={userPhotoPath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;

// const PostsWidget = () => {
//   return <div>PostsWidget</div>;
// };

// export default PostsWidget;
