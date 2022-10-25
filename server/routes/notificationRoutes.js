import express from "express";
import {
  getReceived,
  readNotification,
} from "../controllers/notificationController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/received", verifyToken, getReceived);
router.put("/read/:id", verifyToken, readNotification);

export default router;
