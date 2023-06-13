import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
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

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    const token = req.cookies.jwt;

    res.status(200).json({
      message: "success",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
};

export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const friendIds = user.friends;
    const friends = await User.find({ _id: { $in: friendIds } });

    const formattedFriends = friends.map((friend) => {
      const { _id, firstName, lastName, friends, location, picturePath, bio } =
        friend;
      return {
        _id,
        firstName,
        lastName,
        friends,
        location,
        picturePath,
        bio,
      };
    });
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    user.save();
    friend.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
};
