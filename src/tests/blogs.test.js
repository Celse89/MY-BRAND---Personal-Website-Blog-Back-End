import request from 'supertest';
import app from '../server.js';
import Blogs from '../models/blogsModels.js';

jest.mock('../models/blogsModels.js');

describe('POST /api/blogs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createPost - creates a new blog post', async () => {
    const mockUser = { id: 'userId', username: 'testUser' };
    Blogs.mockImplementation(() => {
      return {
        save: jest.fn().mockResolvedValue(),
      };
    });

    const response = await request(app)
      .post('/api/blogs')
      .send({
        title: 'Test Title',
        content: 'Test content',
        image: 'Test image',
      })
      .set('user', mockUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Post created');
    expect(response.body.postId).toBeTruthy();
  });

  test('createPost - user not found', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .send({
        title: 'Test Title',
        content: 'Test content',
        image: 'Test image',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not found');
  });
});

describe('GET /api/blogs', () => {
  test('getPosts - retrieves blog posts', async () => {
    const mockPosts = [
      { title: 'Post 1', content: 'Content 1' },
      { title: 'Post 2', content: 'Content 2' },
    ];
    Blogs.find.mockResolvedValue(mockPosts);

    const response = await request(app).get('/api/blogs');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPosts);
  });
});