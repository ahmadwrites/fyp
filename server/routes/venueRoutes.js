import express from "express";
import {
  addVenue,
  deleteVenue,
  getAllVenues,
  getVenue,
  getVenueBySport,
  updateVenue,
} from "../controllers/venueController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVenue);
router.delete("/:id", verifyToken, deleteVenue);
router.put("/:id", verifyToken, updateVenue);
router.get("/", getAllVenues);
router.get("/search", getVenueBySport);
router.get("/:id", getVenue);

export default router;
