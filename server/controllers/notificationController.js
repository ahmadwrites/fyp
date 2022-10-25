import mongoose from "mongoose";
import Notification from "../models/Notification.js";

export const getReceived = async (req, res, next) => {
  const limit = req.query.limit;
  try {
    const notifcations = await Notification.find({
      receiverId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json(notifcations);
  } catch (error) {
    next(error);
  }
};

export const readNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (notification.receiverId !== req.user.id) {
      return res.status(403).json("You can only read your own notification!");
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $set: { read: true },
      },
      { new: true }
    );

    res.status(200).json(updatedNotification);
  } catch (error) {
    next(error);
  }
};
