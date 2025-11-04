import express from 'express';
import blogs from './api/blogs';
import users from './api/users';

const router = express.Router();

router.use('/blogs', blogs);
router.use('/users', users);

// Add more routes as needed

export default router;
