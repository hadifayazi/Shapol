import {
  Description,
  ManageAccountsOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { ProfilePicture } from "../../components/ProfilePicture";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserWidget = () => {
  const { user } = useSelector((state) => state.auth.user);
  console.log(user);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const {
    _id,
    firstName,
    lastName,
    location,
    bio,
    createdAt,
    friends,
    picturePath,
  } = user;
  return (
    <WidgetWrapper>
      {/* PROFILEPIC + NAME + FRIENDS*/}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${_id}`)}
      >
        <FlexBetween gap="1rem">
          <ProfilePicture image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* BIO + LOCATION */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem">
          <Description fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{bio}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* JOIN /createdat */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Joined:</Typography>
          <Typography color={main} fontWeight="500">
            {createdAt}
          </Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};
