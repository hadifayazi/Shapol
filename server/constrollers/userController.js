import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      length: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
    });
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    // console.log(res.locals.user);
    res.status(200).json({
      message: "success",
      date: { user },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
    });
  }
};

export const getFreinds = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const friends = await Promise.all(() => {
      user.friends.map((friendId) => {
        User.findById(friendId);
      });
    });
    const formatedFriends = friends.map(
      ({ _id, firstName, lastName, location, picturePath, occupation }) => {
        return { _id, firstName, lastName, location, picturePath, occupation };
      }
    );
    res.status(200).json({ formatedFriends });
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
};
