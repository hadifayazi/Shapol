import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import {
  DeleteOutline,
  EditOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePostMutation } from "../../store/api/postApi";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setSinglePost } from "../../store/slices/authSlice";

const MyPostWidget = () => {
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const errRef = useRef("");
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const [createPost, { data, isSuccess, isError, error }] =
    useCreatePostMutation();
  console.log(data);
  useEffect(() => {
    if (isError || error) {
      errRef.current = error.message;
    }
    if (isSuccess) {
      dispatch(setSinglePost(data));
    }
  }, [dispatch, data, isSuccess, isError, error]);

  const handlePost = () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("photoPath", image.name);
    }
    createPost(formData);
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <>{errRef.current}</>
      <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="You are saying..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            borderRaddius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box border="1px solid " borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={"2px dashed black"}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add picture here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{
                      width: "15%",
                    }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!image)}>
          <ImageOutlined sx={{ color: "skyblue" }} />
          <Typography
            sx={{
              "&:hover": { cursor: "pointer", color: "blueviolet" },
            }}
          >
            image
          </Typography>
        </FlexBetween>
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            backgroundColor: "skyblue",
            color: "primary",
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
