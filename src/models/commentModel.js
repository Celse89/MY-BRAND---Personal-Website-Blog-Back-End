import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content:  {
        type: String, 
        required: true
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'BlogPosts'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;