import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../store/slices/authSlice";
import { useEffect, useState } from "react";
import { useGetLikesQuery } from "../../store/api/postApi";

const SinglePostWidget = ({
  postId,
  userId,
  firstName,
  lastName,
  discription,
  photoPath,
  userPhotoPath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const loggedInUserId = user._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;
  const { data, isSuccess, isError, error } = useGetLikesQuery(
    postId,
    loggedInUserId
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPost({ post: data }));
      console.log(data);
    }
    if (isError || error) {
      console.log(error);
    }
  }, []);

  return <div>SinglePostWidget</div>;
};

export default SinglePostWidget;
