import express from "express";
import { getAllUsers, getMe } from "../constrollers/userController.js";
import { verifyToke } from "../constrollers/authContoller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", verifyToke, getMe);

export default router;
