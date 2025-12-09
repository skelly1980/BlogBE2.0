import express, { Request, Response } from 'express';
import * as blogService from '../../service/blogService';
import { Blog, BlogContent } from 'src/model/blogs';
import { upload } from '../../service/upload';
const router = express.Router();

// get blogs
router.get('/', async (_req: Request, res: Response<Blog[]>) => {
  const blogs = await blogService.getBlogs();
  res.json(blogs);
});

//Create blog route
// router.post('/', async (req: Request, res: Response) => {
//   const blogContent = req.body as BlogContent;
//   const blog = await blogService.createBlog(blogContent);
//   res.json(blog);
// });
//Create blog route with image upload
router.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    let blogContent: BlogContent;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.body.blogData) {
      blogContent = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (req.body.blogData as string) ?? '{}',
      ) as BlogContent;
    } else {
      blogContent = req.body as BlogContent;
    }

    if (req.file) {
      const file = req.file as Express.Multer.File & {
        path: string;
        filename: string;
      };
      console.log('Cloudinary URL:', file.path);
      blogContent.img = file.path;
    }

    const blog = await blogService.createBlog(blogContent);
    res.json(blog);
  },
);

// Update Blog route
// router.patch('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const blog = req.body as Blog;
//   const updatedPost = await blogService.updateBlog(id, blog);
//   if (!updatedPost) {
//     throw new Error(`No blog found for id ${id}`);
//   }
//   res.json(updatedPost);
// });

// Update blog route with optional new image
router.patch(
  '/:id',
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const blogContent = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (req.body.blogData as string) ?? '{}',
    ) as Blog;

    if (req.file) {
      const file = req.file as Express.Multer.File & {
        path: string;
        filename: string;
      };
      blogContent.img = file.path;
    }

    const updatedPost = await blogService.updateBlog(id, blogContent);

    if (!updatedPost) {
      throw new Error(`No blog found for id ${id}`);
    }

    res.json(updatedPost);
  },
);

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
