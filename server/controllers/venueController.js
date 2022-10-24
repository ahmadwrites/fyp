import mongoose from "mongoose";
import Venue from "../models/Venue.js";
import User from "../models/User.js";

export const addVenue = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json("User not found!");

    if (user.type === "player")
      return res.status(403).json("You must be a merchant to add a venue.");

    const venue = new Venue({ userId: req.user.id, ...req.body });
    await venue.save();

    res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
};

export const deleteVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(400).json("Venue does not exist!");

    if (venue.userId !== req.user.id)
      return res.status(403).json("You can only delete your own venue");

    await Venue.findByIdAndDelete(req.params.id);

    res.status(200).json("Successfully deleted venue.");
  } catch (error) {
    next(error);
  }
};

export const updateVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(400).json("Venue does not exist!");

    if (venue.userId !== req.user.id)
      return res.status(403).json("You can only edit your own venue");

    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedVenue);
  } catch (error) {
    next(error);
  }
};

export const getVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
};

export const getVenueBySport = async (req, res, next) => {
  const q = req.query.sport;

  try {
    const venues = await Venue.find({ sport: { $regex: q, $options: "i" } });
    res.status(200).json(venues);
  } catch (error) {
    next(error);
  }
};

export const getAllVenues = async (req, res, next) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    next(error);
  }
};

// Todo: Make it able to review venues
