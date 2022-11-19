import express from "express";
import { getConversation } from "../controllers/conversationController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/:postId", verifyToken, getConversation);

export default router;
