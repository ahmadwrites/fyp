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
        $set: {
          image: req.body.image,
          title: req.body.title,
          groupId: req.body.groupId,
          desc: req.body.desc,
          location: req.body.location,
          gender: req.body.gender,
          date: req.body.date,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          level: req.body.level,
          noOfPeople: req.body.noOfPeople,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
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

function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

export const getDistance = async (req, res, next) => {
  try {
    const distanceKm = distance(
      req.body.lat1,
      req.body.lat2,
      req.body.long1,
      req.body.long2
    );
    res.status(200).json(distanceKm);
  } catch (error) {
    next(error);
  }
};

// Todo: Reformat code so that all the gets return joinable games
// Todo: Look into how to reformat code such that it follows preferences model
