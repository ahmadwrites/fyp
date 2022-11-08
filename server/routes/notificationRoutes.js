import express from "express";
import {
  getReceived,
  getReceivedFalse,
  getRequestsFromGame,
  readNotification,
} from "../controllers/notificationController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/received", verifyToken, getReceived);
router.get("/received/false", verifyToken, getReceivedFalse);
router.get("/received/:postId", verifyToken, getRequestsFromGame);
router.put("/read/:id", verifyToken, readNotification);

export default router;
