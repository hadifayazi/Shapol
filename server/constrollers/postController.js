import User from "../models/userModel.js";
import Post from "../models/postModel.js";

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

    res.status(201).json({ data: newPost });
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
};

export const getFeedPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findById(userId);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
};

export const likesPost = async (req, res) => {
  try {
    //post id
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
