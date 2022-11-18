import express from "express";
import {
  signin,
  signup,
  signout,
  changePassword,
} from "../controllers/authController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.put("/change-password", verifyToken, changePassword);

export default router;
