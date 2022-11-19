import express from "express";
import {
  addMessage,
  getMessages,
  readMessages,
} from "../controllers/messageController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Add a message
router.post("/:postId", verifyToken, addMessage);

// Get all messages based on gameId or postId
router.get("/:postId", verifyToken, getMessages);

router.put("/:postId", verifyToken, readMessages);

export default router;
