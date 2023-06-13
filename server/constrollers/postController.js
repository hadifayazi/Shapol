import User from "../models/userModel.js";
import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, photoPath } = req.body;
    const user = await User.findById(userId);

    const newPost = await Post.create({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      photoPath,
      userPhotoPath: user.picturePath,
      likes: [],
      comments: {},
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
};

export const getFeedPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
};

export const likesPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    console.log(post);

    const index = post.likes.findIndex((item) => item.equals(userId));

    if (index !== -1) {
      // ObjectId exists in the array, remove it
      post.likes.splice(index, 1);
    } else {
      // ObjectId doesn't exist in the array, add it
      post.likes.push(userId);
    }
    const updatedPost = await post.save();
    console.log("Updated post==", updatedPost);

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
