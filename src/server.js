import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js'; 
import { errorHandlingMiddleware } from './utils/error.js';
import connectDB from './database/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

app.use('/api/v1', userRoutes); 

app.use(errorHandlingMiddleware);


connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error) => {
    console.error(`Failed to connect to the database: ${error}`);
});