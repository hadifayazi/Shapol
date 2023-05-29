import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { HowToRegSharp, EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../store/api/authApi";
import { useEffect, useRef } from "react";
import { setCredentials } from "../../store/slices/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errRef = useRef("");
  const [registerUser, { data, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const SignupSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirmation: yup.string().required(),
    location: yup.string(),
    bio: yup.string(),
    picturePath: yup.string(),
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    location: "",
    bio: "",
    picturePath: "",
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate(`/profile/${data.user._id}`);
    } else if (isError || error) {
      errRef.current = error.message;
    }
  }, [data, isError, isSuccess, error, errRef, dispatch, navigate]);

  const handleFormSubmit = (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values["picturePath"].name);
    registerUser(formData);
  };

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} margin={4}>
      <Box
        width={{ sm: "100%", lg: "50%" }}
        height={{ sm: "100% " }}
        marginLeft={{ sm: "10px", lg: "300px" }}
        sx={{
          backgroundColor: "#DAF5FF",

          border: "1px solde #DAF5FF ",
          borderRadius: "10px",
          padding: 4,
        }}
      >
        <Box textAlign="center">
          <HowToRegSharp style={{ fontSize: 50 }} />
          <Typography variant="h1">Register</Typography>
          <p>Please create an account</p>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack>
                <TextField
                  name="firstName"
                  label="First Name"
                  type="text"
                  variant="standard"
                  value={values.firstName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  type="text"
                  variant="standard"
                  value={values.lastName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  value={values.email || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="standard"
                  value={values.password || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="on"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  name="passwordConfirmation"
                  label="Password Confirmarion"
                  type="password"
                  variant="standard"
                  value={values.passwordConfirmation || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="on"
                  error={
                    Boolean(touched.passwordConfirmation) &&
                    Boolean(errors.passwordConfirmation)
                  }
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                />
                <TextField
                  name="location"
                  label="Location"
                  type="text"
                  variant="standard"
                  value={values.location || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />
                <TextField
                  name="bio"
                  label="Bio"
                  type="text"
                  variant="standard"
                  value={values.bio || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.bio) && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid `}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picturePath", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picturePath ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picturePath.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                >
                  Signup
                </Button>
                <Box sx={{ display: "flex" }} mt={4}>
                  <Typography>Already have an account?</Typography>
                  <Typography
                    ml={1}
                    onClick={() => {
                      navigate("/");
                    }}
                    sx={{
                      textDecoration: "underline",
                      color: "skyblue",
                      cursor: "pointer",
                    }}
                  >
                    Login here
                  </Typography>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Stack>
  );
};

export default RegisterForm;
