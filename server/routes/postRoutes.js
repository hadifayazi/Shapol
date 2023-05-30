import express from "express";
import {
  createPost,
  getFeedPost,
  getUserPost,
  likesPost,
} from "../constrollers/postController.js";
import { verifyToken } from "../constrollers/authContoller.js";

const router = express.Router();

router.route("/", verifyToken, getFeedPost);
router.get("/:userId", verifyToken, getUserPost);
router.patch("/:id/like", likesPost);
export default router;
