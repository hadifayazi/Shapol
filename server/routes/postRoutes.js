import express from "express";
import {
  createPost,
  getFeedPost,
  getUserPost,
  likesPost,
} from "../constrollers/postController.js";

const router = express.Router();

router.route("/").post(createPost).get(getFeedPost);
router.get("/:userId/posts", getUserPost);
router.patch("/:id/like", likesPost);
export default router;
