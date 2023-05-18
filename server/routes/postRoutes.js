import express from "express";
import { createPost } from "../constrollers/postController";

const router = express.Router();

router.route("/").post(createPost);

export default router;
