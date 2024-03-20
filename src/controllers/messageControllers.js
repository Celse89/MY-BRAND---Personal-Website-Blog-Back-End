import { Message } from '../models/messageModel.js';
import { NotFoundError } from '../utils/error.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class MessageControllers {
    static async getMessages(req, res, next) {
        try {
            const messages = await Message.find();
            res.status(200).json({ status: 'ok', data: messages });
        } catch (error) {
            next(error);
        }
    }

    static async createMessage(req, res, next) {
        try {
            const message = new Message(req.body);
            await message.save();
            res.status(201).json({ status: 'ok', data: message });
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
            res.status(200).json({ status: 'ok', data: message });
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
            res.status(200).json({ status: 'ok', message: 'Message deleted' });
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
    
            if (!message) {
                return res.status(404).json({ status: 'error', message: 'Message not found' });
            }
    
            const replyContent = req.body.message;
            message.replies.push(replyContent); 
    
            try {
                await message.save(); 
            } catch (error) {
                console.error('Error saving message:', error);
                throw error;
            }
    
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
    
            try {
                let info = await transporter.sendMail({
                    from: '"Celse Honore RUGIRA " <rugiracelse89@gmail.com>',
                    to: req.body.email,
                    subject: "New Reply", 
                    text: replyContent, 
                });
            } catch (error) {
                console.error('Error sending email:', error);
                throw error;
            }
    
            res.status(200).json({ status: 'ok', message: 'Reply sent' });
        } catch (error) {
            console.error('Error in replyMessage:', error);
            next(error);
        }
    }
}

export { MessageControllers };