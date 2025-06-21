import express, { Request, Response } from 'express';
import { getUsers } from '../../service/userService';

export const usersRouter = express.Router();

usersRouter.get('/', async (_req: Request, res: Response) => {
  const users = await getUsers();
  res.render('users', { users });
});
