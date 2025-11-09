/* eslint-disable indent */
import express, { Request, Response } from 'express';
import * as blogService from '../../service/blogService';
import { Blog, BlogContent } from 'src/model/blogs';

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

export default router;
