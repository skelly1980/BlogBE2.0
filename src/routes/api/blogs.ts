import express, { Request, Response } from 'express';
import * as blogService from '../../service/blogService';
import { Blog, BlogContent } from 'src/model/blogs';
import { ApiError } from 'src/error/ApiError';

const router = express.Router();

// get blogs
router.get('/', async (_req: Request, res: Response<Blog[]>) => {
  const blogs = await blogService.getBlogs();
  res.json(blogs);
});

// Create blog route
router.post('/', async (req: Request, res: Response) => {
  const blogContent = req.body as BlogContent;
  const blog = await blogService.createBlog(blogContent);
  res.json(blog);
});

// Delete blog route
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPost = await blogService.deleteBlog(id);
    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
    }
    res.status(204).send();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
