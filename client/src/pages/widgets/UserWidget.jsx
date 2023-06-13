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
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../store/api/userApi";

export const UserWidget = ({ userId }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [user, setUser] = useState(null);
  const { data, isSuccess, isError, error } = useGetUserQuery(userId);

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isError, isSuccess, error, setUser, data]);
  if (!user) return null;

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

  const JoinedDate = `${createdAt.split("-")[1]} / ${createdAt.split("-")[0]} `;

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
          <Typography color={medium}>Bio:{bio}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* JOIN /createdat */}
      <Box p="1rem 0" sx={{ display: "flex" }}>
        <Typography color={medium}>Joined:</Typography>
        <Typography color={main} fontWeight="500" ml={1}>
          {JoinedDate}
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};
