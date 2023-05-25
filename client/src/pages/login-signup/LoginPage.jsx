import { useState, useRef, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../store/api/authApi";
import { Typography } from "@mui/material";
import { setCredentials } from "../../store/slices/authSlice";

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
      errorRef.current = error.data.message;
    }
  }, [data, dispatch, errorRef, error, isError, isSuccess, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    loginUser(userData);
  };

  return (
    <>
      <section className="heading">
        <h1>
          <LoginIcon /> Login
        </h1>
        <p>Welcome to Shapol, your idea, your voice</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              autoComplete="on"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <Typography>{errorRef.current}</Typography>
      </section>
    </>
  );
};

export default LoginPage;
