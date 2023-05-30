import express from "express";
import {
  addRemoveFriends,
  getAllUsers,
  getFreinds,
  getMe,
} from "../constrollers/userController.js";
import { verifyToken } from "../constrollers/authContoller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", verifyToken, getMe);
router.get("/:userId/friends", verifyToken, getFreinds);
router.patch("/:userId/:friendId", verifyToken, addRemoveFriends);

export default router;
