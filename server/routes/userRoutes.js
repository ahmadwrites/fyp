import express from "express";
import {
  acceptRequest,
  declineRequest,
  deleteUser,
  followGroup,
  getUser,
  requestGame,
  unfollowGroup,
  unrequestGame,
  updateUser,
  completeGame,
} from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

/* 
    Edit user, delete user, get user, follow group, unfollow group,
    request game, accept request, TODO*: payment stuff to follow
*/

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.post("/follow-group/:groupId", verifyToken, followGroup);
router.post("/unfollow-group/:groupId", verifyToken, unfollowGroup);
router.post("/request/:postId", verifyToken, requestGame);
router.post("/unrequest/:postId", verifyToken, unrequestGame);
router.post("/accept-request/:postId", verifyToken, acceptRequest);
router.post("/decline-request/:postId", verifyToken, declineRequest);
router.post("/complete-game/:postId", verifyToken, completeGame);

export default router;
