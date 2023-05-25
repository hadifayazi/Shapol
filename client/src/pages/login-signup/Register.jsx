import { useEffect, useRef, useState } from "react";
import { useRegisterUserMutation } from "../../store/api/authApi";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { data, isSuccess, isError, error }] =
    useRegisterUserMutation();
  const errorMessage = useRef("");

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate(`/profile/${data.user._id}`);
    } else if (isError || error) {
      errorMessage.current = error.data.message;
    }
  }, [isSuccess, isError, errorMessage, error, data, dispatch, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    location: "",
    picture: "",
    bio: "",
  });

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    location,
    bio,
  } = formData;

  const onChange = (event) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      location,
      bio,
    };
    registerUser(userData);
  };

  return (
    <>
      <section className="heading">
        <Typography>{errorMessage.current}</Typography>
        <h1>
          <HowToRegIcon /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="firstName"
              value={firstName}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              autoComplete="on"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={passwordConfirmation}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={location}
              placeholder="location"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              value={bio}
              placeholder="bio"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
