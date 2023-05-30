import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../store/slices/authSlice";
import { useEffect, useState } from "react";
import { useGetLikesMutation } from "../../store/api/postApi";
import WidgetWrapper from "../../components/WidgetWrapper";
import FriendHeader from "../../components/FriendHeader";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

const SinglePostWidget = ({
  postId,
  userId,
  firstName,
  discription,
  photoPath,
  userPhotoPath,
  likes,
  comments,
  location,
}) => {
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const loggedInUserId = user._id;
  const isLiked = likes.has(loggedInUserId);
  const likesCount = Object.keys(likes).length;
  const [getLikes, { data, isSuccess, isError, error }] = useGetLikesMutation(
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

  return (
    <WidgetWrapper>
      <FriendHeader
        friendId={userId}
        friendPicturePath={userPhotoPath}
        name={firstName}
        location={location}
      />
      <Typography>{discription}</Typography>
      {photoPath && (
        <img
          alt="post"
          width="100%"
          height="auto"
          src={`http://localhost:3000/assets/${photoPath}`}
        />
      )}
      <FlexBetween>
        <FlexBetween>
          <FlexBetween>
            <IconButton onClick={() => getLikes()}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{isComments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${firstName}-${i}`}>
              <Divider />
              <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default SinglePostWidget;
