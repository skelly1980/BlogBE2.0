import express, { Request, Response } from 'express';
import * as blogService from '../../service/blogService';
import { Blog, BlogContent } from 'src/model/blogs';
import { upload } from '../../service/upload';
import cloudinary from '../../database/cloudinary';

const router = express.Router();

// get blogs
router.get('/', async (_req: Request, res: Response<Blog[]>) => {
  const blogs = await blogService.getBlogs();
  res.json(blogs);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const blog = await blogService.getBlogById(id);

  if (!blog) {
    res.status(404).json({ message: 'Blog post not found' });
    return;
  }

  res.json(blog);
});

// Create blog route
router.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    const blogData = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (req.body.blogData as string) ?? '{}',
    ) as BlogContent;
    const imageFile = req.file;

    // Upload image to Cloudinary if file exists
    if (imageFile) {
      const cloudinaryResult = await cloudinary.uploader.upload(
        `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
          'base64',
        )}`,
        {
          folder: 'blog-images',
          transformation: {
            width: 1200,
            height: 630,
            crop: 'fill',
          },
        },
      );

      blogData.img = cloudinaryResult.secure_url;
    }

    const blog = await blogService.createBlog(blogData);
    res.json(blog);
  },
);

// Update blog route
router.patch(
  '/:id',
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const blogData = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (req.body.blogData as string) ?? '{}',
    ) as Blog;
    const imageFile = req.file;

    if (imageFile) {
      const cloudinaryResult = await cloudinary.uploader.upload(
        `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
          'base64',
        )}`,
        {
          folder: 'blog-images',
          transformation: {
            width: 630,
            height: 630,
            crop: 'fill',
          },
        },
      );

      blogData.img = cloudinaryResult.secure_url;
    }

    const updatedPost = await blogService.updateBlog(id, blogData);
    if (!updatedPost) {
      throw new Error(`No blog found for id ${id}`);
    }
    res.json(updatedPost);
  },
);

// Delete blog route
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedPost = await blogService.deleteBlog(id);
  if (!deletedPost) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.status(200).send();
});

export default router;
