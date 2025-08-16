import express, { Request, Response } from 'express';
import * as blogService from '../../service/blogService';
import { Blog, BlogContent } from 'src/model/blogs';

const router = express.Router();

// get blogs
router.get('/', async (_req: Request, res: Response<Blog[]>) => {
    const blogs = await blogService.getBlogs();
    res.json(blogs);
});

//Blogs route
router.put("/", async (req: Request<BlogContent>, res: Response<Blog>) => {  
    const blogContent = req.body as BlogContent;
    const blog = await blogService.createBlog(blogContent);
    res.json(blog);
});

export default router;
