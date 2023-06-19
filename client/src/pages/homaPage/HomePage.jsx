import NavbarPage from "../navbar/NavbarPage";
import { UserWidget } from "../widgets/UserWidget";
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendsListWidget from "../widgets/FriendsListWidget";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { _id } = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <NavbarPage />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <PostsWidget />
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendsListWidget userId={_id} key={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
