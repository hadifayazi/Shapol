import {
  PersonAddAlt1Rounded,
  PersonRemoveAlt1Rounded,
} from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { ProfilePicture } from "./ProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../store/slices/authSlice";
import { useAddRemoveFriendMutation } from "../store/api/userApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FriendHeader = ({ friendId, picturePath, name, location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const friends = user.friends;
  const isFriend = friends.find((friend) => friend._id === friendId);
  const [addRemoveFriend, { data, isSuccess, isError, error }] =
    useAddRemoveFriendMutation(userId, friendId);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setFriends({ friends: data }));
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FlexBetween sx={{ borderRadius: "5px" }}>
      <Stack direction="row">
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          <ProfilePicture image={picturePath} size="55px" />
        </Box>
        <Stack
          m={1}
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography>{name}</Typography>
          <Typography>{location}</Typography>
        </Stack>
      </Stack>
      <IconButton
        sx={{ mr: "5px", backgroundColor: "#526D82" }}
        onClick={() => addRemoveFriend()}
      >
        {isFriend ? (
          <PersonRemoveAlt1Rounded sx={{ color: "skyblue" }} />
        ) : (
          <PersonAddAlt1Rounded sx={{ color: "skyblue" }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default FriendHeader;
