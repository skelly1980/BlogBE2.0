import multer from 'multer';

// Use memory storage - files stored in memory as Buffer
const storage = multer.memoryStorage();

// Create multer instance with 5MB limit
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
