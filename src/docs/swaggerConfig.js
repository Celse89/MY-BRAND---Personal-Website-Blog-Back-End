import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { User } from './userSchema.js';
import { Blogs } from './blogsSchema.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        User, Blogs
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    path.resolve(__dirname, '../routes/auth.js'),
    path.resolve(__dirname, '../routes/users.js'),
    path.resolve(__dirname, '../routes/blogs.js'),
  ],
};