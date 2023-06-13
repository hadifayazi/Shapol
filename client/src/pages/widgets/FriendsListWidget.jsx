import { Box, Typography } from "@mui/material";
import FriendHeader from "../../components/FriendHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../store/slices/authSlice";
import { useGetFriendsQuery } from "../../store/api/userApi";
import WidgetWrapper from "../../components/WidgetWrapper";

const FriendsListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const friends = user.friends;
  const { data, isSuccess, isError, error } = useGetFriendsQuery(userId);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setFriends(data));
    }
    if (isError) {
      console.log(error);
    }
  }, [data, dispatch, error, isError, isSuccess]);

  const renderedFriends = friends.map((friend) => {
    return (
      <FriendHeader
        key={friend._id}
        friendId={friend._id}
        picturePath={friend.picturePath}
        name={`${friend.firstName} ${friend.lastName}`}
        location={friend.location}
      />
    );
  });

  return (
    <WidgetWrapper>
      {friends.length > 0 ? (
        renderedFriends
      ) : (
        <Typography>Add your friends</Typography>
      )}
    </WidgetWrapper>
  );
};

export default FriendsListWidget;
