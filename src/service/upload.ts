import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../database/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  params: {
    folder: 'blog-images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 630, crop: 'limit' }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
