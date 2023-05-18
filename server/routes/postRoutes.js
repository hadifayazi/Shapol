import express from "express";
import { createPost, getFeedPost } from "../constrollers/postController";

const router = express.Router();

router.route("/").post(createPost).get(getFeedPost);

export default router;
