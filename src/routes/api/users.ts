import express, { Request, Response } from 'express';
import { User } from '../../model/user';
import * as userService from '../../service/userService';
import { ApiError } from '../../error/ApiError';

const router = express.Router();

// get users
router.get('/', async (_req: Request, res: Response<User[]>) => {
  const users = await userService.getUsers();
  res.json(users);
});

// get a user
router.get('/:userId', async (req: Request, res: Response<User>) => {
  const { userId } = req.params;
  const user = await userService.getUser(userId);
  if (!user) {
    throw new ApiError(`No user found for id ${userId}`, 404);
  }
  res.json(user);
});

// create a user
router.put('/', (req: Request<User>, res: Response) => {
  const user = req.body as User;
  // implement create user here
  res.json(user);
});

// update a user
router.post('/', (req: Request<User>, res: Response) => {
  const user = req.body as User;
  // implement update user here
  res.json(user);
});

// delete a user
router.delete('/:userId', (_req: Request, res: Response) => {
  // implement delete user here
  res.json({});
});

export default router;
