import mongoose from "mongoose";
import Group from "../models/Group.js";
import Post from "../models/Post.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Rating from "../models/Rating.js";

export const addPost = async (req, res, next) => {
  try {
    const newPost = new Post({ userId: req.user.id, ...req.body });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("Post does not exist!");

    if (post.userId !== req.user.id)
      return res.status(401).json("You can only edit your own post!");

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("Post does not exist!");

    if (post.userId !== req.user.id)
      return res.status(401).json("You can only delete your own post!");

    await Notification.deleteMany({ postId: req.params.id });
    await Rating.deleteMany({ postId: req.params.id });
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post deleted successfully.");
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getGroupPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ groupId: req.params.groupId });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getFilteredPosts = async (req, res, next) => {
  const ageFilter = req.query.age;
  const levelFilter = req.query.level;
  const locationFilter = req.query.location;
  const genderFilter = req.query.gender;

  // min.max level, min.max distance, min.max no of people
  // min.max age, location, gender

  try {
    const filteredPosts = await Post.find({
      $and: [
        { age: ageFilter },
        { level: levelFilter },
        { location: locationFilter },
        { gender: genderFilter },
      ],
    });

    res.status(200).json(filteredPosts);
  } catch (error) {
    next(error);
  }
};

// Todo: get following groups posts and filter based on preferences

// Todo: get following groups posts and filter based on new
export const getFollowingNew = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json("User does not exist!");

    const followedGroups = user.followedGroups;
    const followingPosts = await Promise.all(
      followedGroups.map((group) => {
        return Post.find({ groupId: group, joinable: true }).sort({ date: -1 });
      })
    );

    res.status(200).json(followingPosts.flat());
  } catch (error) {
    next(error);
  }
};
// Todo: Reformat code so that all the gets return joinable games
// Todo: Look into how to reformat code such that it follows preferences model
