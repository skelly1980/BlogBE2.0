import express from 'express';
import blogs from './api/blogs';

const router = express.Router();

router.use('/blogs', blogs);

// Add more routes as needed

export default router;
