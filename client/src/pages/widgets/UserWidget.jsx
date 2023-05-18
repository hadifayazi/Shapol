import {
  ManageAccountsIcon,
  EditIcon,
  LocationOnIcon,
  CalendarMonthIcon,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { ProfilePicture } from "../../components/ProfilePicture";
import { widgetWrapper } from "../../components/WidgetWrapper";
import { useGetMeQuery } from "../../store/api/userApi";
import { useSelector } from "react-redux";

export const UserWidget = () => {
  const user = useSelector((state) => state.auth.user);
  const { data } = useGetMeQuery(user.id);

  console.log(data);

  return <Box>user widget</Box>;
};
