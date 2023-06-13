import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setSinglePost } from "../../store/slices/authSlice";
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
  name,
  description,
  photoPath,
  userPhotoPath,
  likes,
  comments,
  location,
}) => {
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const isLiked = likes.includes(userId);
  const LikeCount = likes.length;
  const [getLikes, { data, isSuccess, isError, error }] = useGetLikesMutation({
    postId: postId,
    userId: loggedInUserId,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSinglePost(data));
    }
    if (isError || error) {
      console.log(error);
    }
  }, [isSuccess, data, dispatch, isError, error, userId]);

  return (
    <WidgetWrapper sx={{ border: "2px solid #EEEEEE ", margin: "2px 2px" }}>
      <FriendHeader
        friendId={userId}
        picturePath={userPhotoPath}
        name={name}
        location={location}
      />
      <Typography sx={{ mt: "1rem" }}>{description}</Typography>
      {photoPath && (
        <img
          alt="post"
          width="100%"
          height="auto"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3000/assets/${photoPath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton
              type="button"
              onClick={() => {
                getLikes({
                  postId: postId,
                  userId: loggedInUserId,
                });
              }}
            >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{LikeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
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
            <Box key={`${name}-${i}`}>
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
