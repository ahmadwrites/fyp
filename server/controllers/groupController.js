import mongoose from "mongoose";
import Group from "../models/Group.js";

export const addGroup = async (req, res, next) => {
  try {
    const newGroup = new Group(req.body);
    await newGroup.save();
    res.status(200).json(newGroup);
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(400).json("Group does not exist.");
    // TODO*: Find all posts related to group and delete
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json("Group deleted successfully.");
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    await Group.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Group updated successfully");
  } catch (error) {
    next(error);
  }
};

export const searchGroup = async (req, res, next) => {
  const query = req.query.q;

  try {
    const groups = await Group.find({
      title: { $regex: query, $options: "i" },
    });

    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
};

export const getGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

export const getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
};

export const getPopularGroups = async (req, res, next) => {
  try {
    const trendingGroups = await Group.find().sort({ followers: -1 }).limit(9);
    res.status(200).json(trendingGroups);
  } catch (error) {
    next(error);
  }
};
