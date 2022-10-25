import mongoose from "mongoose";
import User from "../models/User.js";
import Rating from "../models/Rating.js";
import Post from "../models/Post.js";
import Notification from "../models/Notification.js";

export const addRating = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.postId);

    const existingRating = await Rating.findOne({
      postId: req.body.postId,
      raterId: req.user.id,
      rateeId: req.body.rateeId,
    });
    if (existingRating) return res.status(403).json("Rating already exists.");

    if (req.user.id === req.body.rateeId) {
      return res.status(403).json("You cannot rate yourself.");
    }

    if (!post.isMatched.includes(req.user.id)) {
      return res
        .status(403)
        .json("You must have been matched to rate one another.");
    }

    const rating = new Rating({ raterId: req.user.id, ...req.body });
    await rating.save();

    const notification = new Notification({
      senderId: req.user.id,
      receiverId: req.body.rateeId,
      postId: req.body.postId,
      title: "You have been rated!",
      type: "rating",
      message: `Someone rated you for ${post.title} game.`,
    });

    await notification.save();

    res.status(200).json(rating);
  } catch (error) {
    next(error);
  }
};

export const deleteRating = async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) return res.status(400).json("Rating does not exist!");

    if (rating.raterId !== req.user.id)
      return res.status(403).json("You can only delete your own rating!");

    await Rating.findOneAndDelete(req.params.id);
    res.status(200).json("Rating deleted successfully.");
  } catch (error) {
    next(error);
  }
};

export const updateRating = async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) return res.status(400).json("Rating does not exist!");

    if (rating.raterId !== req.user.id)
      return res.status(403).json("You can only update your own rating!");

    const updatedRating = await Rating.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedRating);
  } catch (error) {
    next(error);
  }
};

export const getRating = async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.id);
    res.status(200).json(rating);
  } catch (error) {
    next(error);
  }
};

export const getPostRatings = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(400).json("Post does not exist!");

    const ratings = await Rating.find({ postId: post._id });
    res.status(200).json(ratings);
  } catch (error) {
    next(error);
  }
};

// Get ratings of one particular user
export const getRatingOfUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json("User does not exist!");

    const ratings = await Rating.find({ rateeId: req.params.userId });
    res.status(200).json(ratings);
  } catch (error) {
    next(error);
  }
};

// Get ratings sent from particular user
export const getRatingFromUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json("User does not exist!");

    const ratings = await Rating.find({ raterId: req.params.userId });
    res.status(200).json(ratings);
  } catch (error) {
    next(error);
  }
};
