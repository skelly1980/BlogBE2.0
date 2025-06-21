import express from 'express';
import * as routers from './view';

const router = express.Router();

router.use('/', routers.homeRouter);
router.use('/users', routers.usersRouter);

// Add more routes as needed

export default router;
