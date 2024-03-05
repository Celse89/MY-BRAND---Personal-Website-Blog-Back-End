import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
});

const Blogs = mongoose.model("BlogPosts", BlogsSchema);

export default Blogs;