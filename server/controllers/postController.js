import mongoose from "mongoose";
import Group from "../models/Group.js";
import Post from "../models/Post.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Rating from "../models/Rating.js";
import Preference from "../models/Preference.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const addPost = async (req, res, next) => {
  try {
    const newPost = new Post({ userId: req.user.id, ...req.body });
    const savedPost = await newPost.save();

    const newConversation = new Conversation({
      postId: savedPost._id,
      members: req.user.id,
    });

    await newConversation.save();

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
    const conversation = await Conversation.findOne({ postId: req.params.id });
    await Message.deleteMany({ conversationId: conversation._id });
    await Conversation.findOneAndDelete({ postId: req.params.id });
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
    const posts = await Post.find({ joinable: true, isCompleted: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const searchPosts = async (req, res, next) => {
  const title = req.query.title;
  try {
    const posts = await Post.find({
      title: { $regex: title, $options: "i" },
      isCompleted: false,
      isjoinable: true,
    }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getGroupPosts = async (req, res, next) => {
  const sortType = req.query.sortType;
  try {
    const group = await Group.findOne({ title: req.params.groupTitle });
    if (!group)
      return res
        .status(200)
        .json({ message: `${req.params.groupTitle} does not exist!` });

    const posts = await Post.find({
      groupId: group._id,
      joinable: true,
      isCompleted: false,
    }).sort(sortType === "createdAt" ? { createdAt: -1 } : { date: 1 });
    res.status(200).json({ posts, group });
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
export const getCustom = async (req, res, next) => {
  // sort by the createdAt or date
  const sortType = req.query.sortType;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json("User does not exist!");

    const preference = await Preference.findOne({ userId: req.user.id });
    const followedGroups = user.followedGroups;
    let followingPosts;

    // Todo: delete as preference is already setup upon signup ->
    if (preference === null) {
      followingPosts = await Promise.all(
        followedGroups.map((group) => {
          return Post.find({
            groupId: group,
            isCompleted: false,
            joinable: true,
          });
        })
      );
    } else {
      // Todo: filter distance
      followingPosts = await Promise.all(
        followedGroups.map((group) => {
          return Post.find({
            groupId: group,
            isCompleted: false,
            joinable: true,
            gender:
              preference.gender === "all"
                ? { $in: ["male", "female", "all"] }
                : preference.gender === "male"
                ? "male"
                : "female",
          });
        })
      );
    }

    res.status(200).json(
      followingPosts.flat().sort((a, b) => {
        if (sortType === "createdAt") {
          return a.createdAt < b.createdAt ? 1 : -1;
        } else {
          return a.date > b.date ? 1 : -1;
        }
      })
    );
  } catch (error) {
    next(error);
  }
};

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

export const getUserPosts = async (req, res, next) => {
  const sort = req.query.sort;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json("User does not exist!");

    const posts = await Post.find({ userId: req.params.userId }).sort({
      createdAt: sort,
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

function distance(lat1, lat2, lon1, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;

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

export const getPostsWithUser = async (req, res, next) => {
  const isCompleted = req.query.isCompleted;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json("User does not exist!");

    const posts = await Post.find({
      $or: [
        { isMatched: { $in: req.params.userId } },
        { userId: req.params.userId },
      ],
      isCompleted: isCompleted,
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Todo: Reformat code so that all the gets return joinable games
// Todo: Look into how to reformat code such that it follows preferences model
