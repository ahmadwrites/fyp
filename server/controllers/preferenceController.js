import mongoose from "mongoose";
import User from "../models/User.js";
import Preference from "../models/Preference.js";

export const addPreference = async (req, res, next) => {
  console.log(req.body);
  try {
    const preference = await Preference.findOne({ userId: req.user.id });
    if (preference) return res.status(403).json("Preference already exists.");

    const newPreference = new Preference({ ...req.body, userId: req.user.id });
    newPreference.save();
    res.status(200).json(newPreference);
  } catch (error) {
    next(error);
  }
};

export const updatePreference = async (req, res, next) => {
  const preference = await Preference.findOne({ userId: req.user.id });
  if (!preference) return res.status(403).json("Preference does not exist.");

  if (preference.userId !== req.user.id)
    return res.status(403).json("You can only update your own preferences.");

  const updatedPreference = await Preference.findOneAndUpdate(
    { userId: req.user.id },
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedPreference);
  try {
  } catch (error) {
    next(error);
  }
};

export const getPreference = async (req, res, next) => {
  const preference = await Preference.findOne({ userId: req.user.id });

  res.status(200).json(preference);
  try {
  } catch (error) {
    next(error);
  }
};
