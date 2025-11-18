import express, { Request, Response } from 'express';
import { CreateUserRequest, User } from 'src/model/user';
import { UserSignInInput } from 'src/model/user';
import * as userService from '../../service/userService';
import { ApiError } from '../../error/ApiError';

const router = express.Router();

// get users
router.get('/', async (_req: Request, res: Response<User[]>) => {
  const users = await userService.getUsers();
  res.json(users);
});

router.post('/signin', async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Sign in attempt:', req.body.email);

  if (!req.body) {
    res.status(400).json({ error: 'Request body is missing' });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email, password } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const signinData: UserSignInInput = { email, password };
  const user = await userService.signinUser(signinData);

  res.status(200).json({
    message: 'Sign in successful',
    user: user,
    success: true,
  });
});

// get a user by id
router.get('/:userId', async (req: Request, res: Response<User>) => {
  const { userId } = req.params;
  const user = await userService.getUser(userId);
  if (!user) {
    throw new ApiError(`No user found for id ${userId}`, 404);
  }
  res.json(user);
});

// create a user
router.post('/', async (req: Request<CreateUserRequest>, res: Response) => {
  const createUserRequest = req.body as CreateUserRequest;
  const user = await userService.createUser(createUserRequest);
  res.json(user);
});

// delete a user
router.delete('/:userId', (_req: Request, res: Response) => {
  // implement delete user here
  res.json({});
});

export default router;
