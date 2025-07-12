import express, { Request, Response } from 'express';
import { Blog } from 'src/types/blog';
import * as blogService from '../../service/blogService';

const router = express.Router();

// get blogs
router.get('/', async (_req: Request, res: Response<Blog[]>) => {
    const blogs = await blogService.getBlogs();
    res.json(blogs);
});

export default router;
