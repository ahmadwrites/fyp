import express from "express";
import {
  addPost,
  deletePost,
  getGroupPosts,
  getPost,
  getPosts,
  updatePost,
  getFilteredPosts,
  getFollowingNew,
  getUserPosts,
  getDistance,
} from "../controllers/postController.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

/* 
    Functions to implement: 
    1. Create a post
    2. Edit a post
        For common usage:
        - Someone request to join game (pendingUsers []) -> Notification model
        - Accept someone's request (isMatched []) -> Notification model
        - Mark post as unjoinable (joinable: false) -> Notification model
        - Mark post as unjoinable if isMatched === noOfPlayers.length
        - Mark post as completed (isCompleted: true) -> Notification model
        - If isCompleted allow users to rate each other -> Notification model

        For settled venue: 
        - Update the paid users array ($set: paidUsers[])
        - Mark post as unjoinable (if paidUsers.length === noOfPlayers.length)
        - If current date is past the date of game, archive post (date)
    3. Delete a post
    4. Update a post
    5. Get a post by ID
    6. Get a post by its group 
    7. Get a post by user profile
    8. Get all  
    9. Get posts by following 
        Normal:
        - Get posts from following groups only by new
        Filter:
        - Can sort by date of game
        - Can sort by level of player
        - Can filter by no of players
        - Can filter by age and gender
        - Basically can filter and sort by certain queries
*/

router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.get("/filter", getFilteredPosts);
router.get("/following", verifyToken, getFollowingNew);
router.get("/:id", getPost);
router.get("/", getPosts);
router.get("/group/:groupId", getGroupPosts);
router.get("/user/:userId", getUserPosts);
router.post("/distance", verifyToken, getDistance);
// router.get("/following", getFollowingPosts);
// router.get("/following/filter", verifyToken, getFollowingFilteredPosts);

export default router;
