import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  // eslint-disable-next-line n/no-process-env
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // eslint-disable-next-line n/no-process-env
  api_key: process.env.CLOUDINARY_API_KEY,
  // eslint-disable-next-line n/no-process-env
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
