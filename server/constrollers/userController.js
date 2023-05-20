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

    res.status(200).json({
      message: "success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
    });
  }
};

export const getFreinds = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const friends = await Promise.all(() => {
      user.friends.map((friendId) => {
        User.findById(friendId);
      });
    });
    const formatedFriends = friends.map(
      ({ _id, firstName, lastName, location, picturePath, friends, bio }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          picturePath,
          friends,
          bio,
        };
      }
    );
    res.status(200).json({ formatedFriends });
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
      user.friends = user.friends.push(friendId);
      friend.friends = friend.friends.push(userId);
    }

    user.save();
    friend.save();

    const userFriends = Promise.all(
      user.friends.map((id) => {
        User.findById(id);
      })
    );
    const formatedFriends = userFriends.map(
      ({ _id, firstName, lastName, location, picturePath, friends, bio }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          picturePath,
          friends,
          bio,
        };
      }
    );
    res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
};
