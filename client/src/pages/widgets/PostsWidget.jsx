import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/slices/authSlice";
import { useGetFeedPostsQuery } from "../../store/api/postApi";
import SinglePostWidget from "./SinglePostWidget";
import { nanoid } from "nanoid";

const PostsWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts);
  const { data, isSuccess, isError, error } = useGetFeedPostsQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPosts(data));
    }
    if (isError || error) {
      console.log(error);
    }
  }, [isSuccess, data, dispatch, isError, error]);

  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          photoPath,
          userPhotoPath,
          likes,
          comments,
        }) => (
          <SinglePostWidget
            key={nanoid() + _id}
            postId={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
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
