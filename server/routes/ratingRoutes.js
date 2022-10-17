import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addRating,
  deleteRating,
  getPostRatings,
  getRating,
  getRatingFromUser,
  getRatingOfUser,
  updateRating,
} from "../controllers/ratingController.js";

const router = express.Router();

router.post("/", verifyToken, addRating);
router.delete("/:id", verifyToken, deleteRating);
router.put("/:id", verifyToken, updateRating);
router.get("/:id", getRating);
router.get("/post/:postId", getPostRatings);
router.get("/user-received/:userId", getRatingOfUser);
router.get("/user-sent/:userId", getRatingFromUser);

export default router;
