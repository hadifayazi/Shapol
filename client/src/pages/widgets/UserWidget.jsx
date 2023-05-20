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
import { useGetMeQuery } from "../../store/api/authApi";
import { useSelector } from "react-redux";

export const UserWidget = () => {
  //   const user = useGetMeQuery(null, { selectFromResult: ({ data }) => data });
  //   console.log(user);
  const user = useGetMeQuery();
  console.log(user);
  return <Box>user widget</Box>;
};
