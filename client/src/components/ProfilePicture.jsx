import { Box } from "@mui/material";

export const ProfilePicture = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="User Profile picyure"
        src={`https://localhost:3000/assets/${image}`}
      />
    </Box>
  );
};
