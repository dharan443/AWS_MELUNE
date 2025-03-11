import { Message } from "../models/message.model.js";

export const getAllAIMessages = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: process.env.AI_ID },
                { senderId: process.env.AI_ID, receiverId: userId },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};
