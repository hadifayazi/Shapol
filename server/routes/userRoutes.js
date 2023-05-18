import express from "express";
import {
  addRemoveFriends,
  getAllUsers,
  getFreinds,
  getMe,
} from "../constrollers/userController.js";
import { verifyToke } from "../constrollers/authContoller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", verifyToke, getMe);
router.get("/:userId/friends", getFreinds);
router.patch("/:userId/:friendId", addRemoveFriends);

export default router;
