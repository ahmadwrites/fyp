import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const getReceived = async (req, res, next) => {
  const limit = req.query.limit;
  try {
    const notifications = await Notification.find({
      receiverId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    // Get the notification senders (userId)
    const notificationSenders = notifications.map(
      (notification) => notification.senderId
    );

    // Get user object
    const users = await Promise.all(
      notificationSenders.map((senderId) => {
        const user = User.findById(senderId);
        return user;
      })
    );

    // Get only important details of user object
    let newUsers = [];
    for (let i = 0; i < users.length; i++) {
      let {
        password,
        type,
        _id,
        email,
        phoneNumber,
        followedGroups,
        followedUsers,
        createdAt,
        updatedAt,
        __v,
        desc,
        gender,
        ...others
      } = users[i]._doc;
      newUsers.push(others);
    }

    // Combine notification with user object
    let notificationsToSend = [];
    for (let i = 0; i < users.length; i++) {
      let obj = { ...notifications[i]._doc, ...newUsers[i] };
      notificationsToSend.push(obj);
    }

    res.status(200).json(notificationsToSend);
  } catch (error) {
    next(error);
  }
};

export const getReceivedFalse = async (req, res, next) => {
  const limit = req.query.limit;
  try {
    const notifications = await Notification.find({
      receiverId: req.user.id,
      read: false,
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    // Get the notification senders (userId)
    const notificationSenders = notifications.map(
      (notification) => notification.senderId
    );

    // Get user object
    const users = await Promise.all(
      notificationSenders.map((senderId) => {
        const user = User.findById(senderId);
        return user;
      })
    );

    // Get only important details of user object
    let newUsers = [];
    for (let i = 0; i < users.length; i++) {
      let {
        password,
        type,
        _id,
        email,
        phoneNumber,
        followedGroups,
        followedUsers,
        createdAt,
        updatedAt,
        __v,
        desc,
        gender,
        ...others
      } = users[i]._doc;
      newUsers.push(others);
    }

    // Combine notification with user object
    let notificationsToSend = [];
    for (let i = 0; i < users.length; i++) {
      let obj = { ...notifications[i]._doc, ...newUsers[i] };
      notificationsToSend.push(obj);
    }

    res.status(200).json(notificationsToSend);
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
