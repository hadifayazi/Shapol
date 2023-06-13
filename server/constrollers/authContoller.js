import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const sendToken = (user, res, statusCode) => {
  const token = createToken(user._id);

  //remove the password from the output
  user.password = undefined;
  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    token,
    user,
  });
};

export const verifyToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorizations &&
      req.headers.authorizations.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token)
      return res.status(401).json({
        message: "In order to access please login!",
      });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);
    if (!user)
      return res.status(403).json({ message: "User couldn't be verified" });

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

export const signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      picturePath,
      location,
      friends,
      bio,
    } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      picturePath,
      location,
      bio,
      friends,
    });
    sendToken(newUser, res, 201);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //if doesn't exist
    if (!email || !password)
      return res.status(403).send({ message: "Invalid email or password" });

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password)))
      return res.status(403).send({ message: "Incorrect email or password" });

    sendToken(user, res, 200);
    // req.user = user;
  } catch (err) {
    res.status(404).json({
      message: err.message || err,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt", {
    expiresIn: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({
    message: "successfully logged out!",
  });
};
