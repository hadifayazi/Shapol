import express from "express";
import {
  createPost,
  getFeedPost,
  getUserPost,
} from "../constrollers/postController";

const router = express.Router();

router.route("/").post(createPost).get(getFeedPost);
router.get("/:userId/posts", getUserPost);

export default router;
