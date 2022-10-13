import express from "express";
import {
  addGroup,
  deleteGroup,
  getGroup,
  getGroups,
  getPopularGroups,
  searchGroup,
  updateGroup,
} from "../controllers/groupController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addGroup);
router.delete("/:id", verifyToken, deleteGroup);
router.put("/:id", verifyToken, updateGroup);
router.get("/search", searchGroup);
router.get("/popular", getPopularGroups);
router.get("/:id", getGroup);
router.get("/", getGroups);

export default router;
