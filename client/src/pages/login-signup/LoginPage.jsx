import { useRef, useEffect } from "react";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../store/api/authApi";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { setCredentials } from "../../store/slices/authSlice";
import * as yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorRef = useRef("");

  const [loginUser, { data, isSuccess, isError, error }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/home");
    } else if (isError || error) {
      errorRef.current = toast(error.data.message);
    }
  }, [data, dispatch, errorRef, error, isError, isSuccess, navigate]);

  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = (values, onSubmitProps) => {
    loginUser(values);
  };

  return (
    <Stack spacing={2} margin={4}>
      <>
        <ToastContainer />
      </>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack>
              <Box textAlign="center">
                <AssignmentIndRoundedIcon style={{ fontSize: 50 }} />
              </Box>
              <Typography variant="h3" textAlign="center">
                Please Login
              </Typography>
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
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "20px" }}
              >
                Login
              </Button>
            </Stack>
            <Box sx={{ display: "flex" }} mt={4}>
              <Typography>Don't have an account?</Typography>
              <Typography
                ml={1}
                onClick={() => {
                  navigate("/register");
                }}
                sx={{
                  textDecoration: "underline",
                  color: "skyblue",
                  cursor: "pointer",
                }}
              >
                Signup here
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

export default LoginPage;
