import express from "express";
import {
  addRemoveFriends,
  getAllUsers,
  getFriends,
  getMe,
  getUser,
} from "../constrollers/userController.js";
import { verifyToken } from "../constrollers/authContoller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", verifyToken, getMe);
router.get("/:userId/friends", verifyToken, getFriends);
router.get("/:userId", verifyToken, getUser);
router.patch("/:userId/:friendId", addRemoveFriends);

export default router;
