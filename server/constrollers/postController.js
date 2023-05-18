import User from "../models/userModel";
import Post from "../models/Post";

export const createPost = async (req, res) => {
  try {
    const { userId, discription, photoPath } = req.body;
    const user = await User.findById(userId);

    const newPost = await Post.create({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      discription,
      photoPath,
      userPhotoPath: user.photoPath,
      likes: {},
      comments: {},
    });

    res.statusCode(201).json({ data: newPost });
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
};
