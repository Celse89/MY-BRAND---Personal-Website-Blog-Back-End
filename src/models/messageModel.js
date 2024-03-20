import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    replies: [{
        type: String,
        default: []
    }]
}, {
    timestamps: true
});

export const Message = mongoose.model('Message', messageSchema);