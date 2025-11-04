import express, { Request, Response } from 'express';
import { CreateUserRequest, User } from 'src/model/user';
import { UserSignInInput } from 'src/model/user';
import * as userService from '../../service/userService';
import { ApiError } from '../../error/ApiError';

const router = express.Router();

// Email validation function without regex
const isValidEmail = (email: string): boolean => {
  const parts = email.split('@');
  
  // Must have exactly one @ symbol
  if (parts.length !== 2) return false;
  
  const [localPart, domainPart] = parts;
  
  // Local part (before @) checks
  if (!localPart || localPart.length === 0) return false;
  if (localPart.length > 64) return false;
  
  // Domain part (after @) checks
  if (!domainPart || domainPart.length === 0) return false;
  if (!domainPart.includes('.')) return false;
  
  const domainParts = domainPart.split('.');
  
  // Must have at least 2 parts after splitting by .
  if (domainParts.length < 2) return false;
  
  // Check each domain part is not empty
  for (const part of domainParts) {
    if (!part || part.length === 0) return false;
  }
  
  return true;
};

// get users
router.get('/', async (_req: Request, res: Response<User[]>) => {
  const users = await userService.getUsers();
  res.json(users);
});

// signin route
(router as any).post('/signin', async (req: Request, res: Response) => {
  try {
    console.log('Sign in attempt:', req.body.email);

    if(!req.body) {
      return res.status(400).json({error: 'Request body is missing'});
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields: email and password are required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({error: 'Invalid email format'});
    }

    const signinData: UserSignInInput = { email, password };
    const user = await userService.signinUser(signinData);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password'});
    }

    res.status(200).json({
      message: 'Sign in successful',
      user: user,
      success: true
    });
  } catch (error: any) {
    console.error('Error signing in user:', error);
    res.status(500).json({error: 'Failed to sign in user'});
  }
})
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
