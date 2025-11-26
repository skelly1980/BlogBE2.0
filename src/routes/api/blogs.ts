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

// Update Blog route
router.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const blogblogContent = req.body as BlogContent;
  const updatedPost = await blogService.updateBlog(id, blogblogContent);
  if (!updatedPost) {
    throw new Error(`No blog found for id ${id}`);
  }
  res.json(updatedPost);
});

// Delete blog route
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedPost = await blogService.deleteBlog(id);
  if (!deletedPost) {
    res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).send();
});

export default router;
