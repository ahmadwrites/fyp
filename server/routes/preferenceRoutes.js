import express from "express";
import {
  addPreference,
  getPreference,
  updatePreference,
} from "../controllers/preferenceController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addPreference);
router.put("/", verifyToken, updatePreference);
router.get("/", verifyToken, getPreference);

export default router;
