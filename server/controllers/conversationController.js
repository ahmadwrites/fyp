import Conversation from "../models/Conversation.js";

export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      postId: req.params.postId,
    });
    if (!conversation.members.includes(req.user.id)) {
      res
        .status(403)
        .json("You must be a part of this game to join this chat.");
    }
    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
};
