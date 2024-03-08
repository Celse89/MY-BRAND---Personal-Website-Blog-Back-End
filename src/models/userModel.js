import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: String,
    socialMediaLinks: {
        facebook: String,
        twitter: String,
        linkedin: String
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    subscribed: {
        type: Boolean,
        default: false
    },
    profilePicture: String

    
}, {
    timestamps: true
});

export const User = mongoose.model('User', userSchema);