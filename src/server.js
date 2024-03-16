import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js'; 
import blogRoutes from './routes/blogs.js';
import commentRoutes from './routes/comments.js'; 
import messageRoutes from './routes/messages.js';

import setupUserSwagger from './docs/usersSwagger.js';
import setupBlogSwagger from './docs/blogsSwagger.js';
import setupAuthSwagger from './docs/authSwagger.js';

import { errorHandlingMiddleware } from './utils/error.js';
import connectDB from './database/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: ['http://localhost:5501', 'http://127.0.0.1:5501'], 
    credentials: true
}));
app.use(express.json());

setupUserSwagger(app);
setupBlogSwagger(app);
setupAuthSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs', commentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

app.use('/uploads/profiles', express.static('uploads/profiles'));
app.use('/uploads/blogs', express.static('uploads/blogs'));

app.use(errorHandlingMiddleware);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error) => {
    console.error(`Failed to connect to the database: ${error}`);
});

export default app;