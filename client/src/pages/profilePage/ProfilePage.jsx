import NavbarPage from "../navbar/NavbarPage";
import { UserWidget } from "../widgets/UserWidget";
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from "../widgets/MyPostWidget";
import FriendsListWidget from "../widgets/FriendsListWidget";
import { useGetUserQuery } from "../../store/api/userApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersPostWidget from "../widgets/UsersPostWidget";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const loggedInUser = useSelector((state) => state.auth.user);
  const loggedInUserId = loggedInUser._id;

  const { data, isSuccess, isError, error } = useGetUserQuery(userId);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data]);

  if (!user) return null;

  return (
    <Box>
      <NavbarPage />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} />
          <Box m="2rem 0">
            <FriendsListWidget userId={userId} />
          </Box>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {loggedInUserId === userId ? (
            <Box>
              <MyPostWidget />
              <UsersPostWidget userId={userId} />
            </Box>
          ) : (
            <UsersPostWidget userId={userId} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
