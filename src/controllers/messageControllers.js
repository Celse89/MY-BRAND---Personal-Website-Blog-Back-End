import { Message } from '../models/messageModel.js';
import { NotFoundError } from '../utils/error.js';

class MessageControllers {

    static async getMessages(req, res, next) {
        try {
            const messages = await Message.find();
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    }

    static async createMessage(req, res, next) {
        try {
            const message = new Message(req.body);
            await message.save();
            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }

    static async getMessage(req, res, next) {
        try {
            const message = await Message.findById(req.params.id);
            if (!message) {
                throw new NotFoundError('Message not found');
            }
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    static async deleteMessage(req, res, next) {
        try {
            const message = await Message.findByIdAndDelete(req.params.id);
            if (!message) {
                throw new NotFoundError('Message not found');
            }
            res.status(200).json({ message: 'Message deleted' });
        } catch (error) {
            next(error);
        }
    }

    static async replyMessage(req, res, next) {
        try {
            const message = await Message.findById(req.params.id);
            if (!message) {
                throw new NotFoundError('Message not found');
            }
            res.status(200).json({ message: 'Reply sent' });
        } catch (error) {
            next(error);
        }
    }
}

export { MessageControllers };