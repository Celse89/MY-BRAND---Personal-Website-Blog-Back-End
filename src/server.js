import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/users.js'; 
import blogRoutes from './routes/blogs.js';
import commentRoutes from './routes/comments.js'; 
import messageRoutes from './routes/messages.js';

import { errorHandlingMiddleware } from './utils/error.js';
import connectDB from './database/connection.js';
import { UsersController } from './controllers/usersControllers.js'; 
import { validateSignup } from './utils/validation.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs', commentRoutes);
app.use('/api/messages', messageRoutes);
app.post('/signup', validateSignup, UsersController.signup);
app.post('/login', UsersController.login);




app.use('/uploads/profiles', express.static('uploads/profiles'));
app.use('/uploads/blogs', express.static('uploads/blogs'));




app.use(errorHandlingMiddleware);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error) => {
    console.error(`Failed to connect to the database: ${error}`);
});

export default app;