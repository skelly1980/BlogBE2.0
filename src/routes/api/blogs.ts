import express, { Request, Response } from 'express';
import { Blog } from 'src/types/blog';

const router = express.Router();

// get blogs
router.get('/', async (_req: Request, res: Response<Blog[]>) => {
  res.json([]);
});

export default router;
