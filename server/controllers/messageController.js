import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const addMessage = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      postId: req.params.postId,
    });

    if (!conversation.members.includes(req.user.id)) {
      res
        .status(403)
        .json("You can only send messages to a conversation you're in.");
    }

    const newMessage = new Message({
      conversationId: conversation._id,
      senderId: req.user.id,
      text: req.body.text,
    });

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      postId: req.params.postId,
    });

    if (!conversation.members.includes(req.user.id)) {
      res
        .status(403)
        .json("You can only view messages to a conversation you're in.");
    }

    const messages = await Message.find({ conversationId: conversation._id });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const readMessages = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      postId: req.params.postId,
    });

    if (!conversation.members.includes(req.user.id)) {
      res
        .status(403)
        .json("You can only view messages to a conversation you're in.");
    }

    await Message.updateMany(
      { conversationId: conversation._id },
      { $set: { read: req.user.id } },
      { new: true }
    );
    const messages = await Message.find({ conversationId: conversation._id });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
