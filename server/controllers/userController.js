import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import { createError } from "../error.js";
import Group from "../models/Group.js";
import Notification from "../models/Notification.js";

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User does not exist!"));

    if (user._id.toString() !== req.user.id) {
      return next(createError(401, "You can only update your own profile."));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;

    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User does not exist!"));

    if (user._id.toString() !== req.user.id) {
      return next(createError(401, "You can only delete your own profile."));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully.");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const followGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (group.followedUsers.includes(req.user.id)) {
      return res.status(403).json("You are already following this group!");
    }

    await Group.findByIdAndUpdate(
      req.params.groupId,
      {
        $addToSet: { followedUsers: req.user.id },
        $inc: { followers: 1 },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { followedGroups: req.params.groupId },
      },
      { new: true }
    );

    res.status(200).json("Successfully joined group.");
  } catch (error) {}
};

export const unfollowGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group.followedUsers.includes(req.user.id)) {
      return res.status(403).json("You are not following this group!");
    }

    await Group.findByIdAndUpdate(
      req.params.groupId,
      {
        $pull: { followedUsers: req.user.id },
        $inc: { followers: -1 },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { followedGroups: req.params.groupId },
      },
      { new: true }
    );

    res.status(200).json("Successfully left group.");
  } catch (error) {}
};

export const requestGame = async (req, res, next) => {
  try {
    const requestedPost = await Post.findById(req.params.postId);

    if (requestedPost.joinable === false)
      return res.status(403).json("Game is not joinable.");

    if (req.user.id === requestedPost.userId) {
      return res.status(403).json("You cannot join your own game!");
    }

    const requestedUser = await User.findById(req.user.id);

    if (requestedPost.pendingUsers.includes(req.user.id)) {
      return res.status(403).json("You have already requested for this game.");
    } else {
      const post = await Post.findByIdAndUpdate(
        req.params.postId,
        { $addToSet: { pendingUsers: req.user.id } },
        { new: true }
      );

      const notification = new Notification({
        senderId: req.user.id,
        receiverId: post.userId,
        postId: post._id,
        title: "Player Request!",
        message: `${requestedUser.username} wants to join ${post.title}`,
        type: "request",
      });

      await notification.save();

      res.status(200).json("Request to join have been sent.");
    }
  } catch (error) {
    next(error);
  }
};

export const unrequestGame = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { pendingUsers: req.user.id } },
      { new: true }
    );

    const requestedUser = await User.findById(req.user.id);

    const notification = await Notification.findOne({
      senderId: req.user.id,
      receiverId: post.userId,
      postId: post._id,
      title: "Player Request!",
      message: `${requestedUser.username} wants to join ${post.title}`,
      type: "request",
    });

    await Notification.findOneAndDelete({
      senderId: req.user.id,
      receiverId: post.userId,
      postId: post._id,
      title: "Player Request!",
      message: `${requestedUser.username} wants to join ${post.title}`,
      type: "request",
    });

    res.status(200).json("Request to join have been cancelled.");
  } catch (error) {
    next(error);
  }
};

export const acceptRequest = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.isMatched.includes(req.body.senderId)) {
      return res.status(403).json("Player is already matched!");
    }

    if (post.userId !== req.user.id) {
      return res.status(401).json("You can only accept your games!");
    }

    if (post.joinable === true) {
      let updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $pull: { pendingUsers: req.body.senderId },
          $addToSet: { isMatched: req.body.senderId },
        },
        { new: true }
      );

      if (updatedPost.isMatched.length + 1 >= updatedPost.noOfPeople) {
        updatedPost = await Post.findByIdAndUpdate(
          req.params.postId,
          {
            $set: { joinable: false },
          },
          { new: true }
        );
      }

      const notification = new Notification({
        senderId: req.user.id,
        receiverId: req.body.senderId,
        postId: post._id,
        title: `Game Matched!`,
        message: `${post.title} is ready for you to play.`,
        type: "match",
      });

      await notification.save();

      res.status(200).json(updatedPost);
    } else {
      return res.status(403).json("This game is no longer joinable.");
    }
  } catch (error) {
    next(error);
  }
};

export const declineRequest = async (req, res, next) => {
  try {
    const postToDecline = await Post.findById(req.params.postId);

    if (postToDecline.userId !== req.user.id) {
      return res.status(401).json("You can only decline your games!");
    }

    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { pendingUsers: req.body.senderId },
      },
      { new: true }
    );

    await Notification.findOneAndDelete({
      senderId: req.body.senderId,
      receiverId: req.user.id,
      postId: post._id,
      title: "Player Request!",
      type: "request",
    });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const completeGame = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(400).json("Post does not exist!");

    if (post.userId !== req.user.id)
      return res.status(401).json("You can only complete your own games.");

    if (post.isCompleted === true)
      return res.status(403).json("Game is already completed!");

    // TODO*: If game has venue/paid, then cannot comlpete game until bill settled

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { isCompleted: true } },
      { new: true }
    );

    const playedUsers = updatedPost.isMatched;
    for (let i = 0; i < playedUsers.length; i++) {
      let notification = new Notification({
        senderId: req.user.id,
        receiverId: playedUsers[i],
        postId: updatedPost._id,
        title: `${updatedPost.title} is completed.!`,
        message: `Click here to rate each other.`,
        type: "complete",
      });

      await notification.save();
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
