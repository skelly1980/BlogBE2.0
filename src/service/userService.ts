import { CreateUserRequest, User, UserSignInInput } from 'src/model/user';
import * as userStore from '../database/userStore';

export const getUsers = async (): Promise<User[]> => {
  return await userStore.getUsers();
};

export const getUser = async (id: string): Promise<User | undefined> => {
  return await userStore.getUser(id);
};

export const createUser = async (createUserRequest: CreateUserRequest): Promise<User> => {
  return await userStore.createUser(createUserRequest);
};

export const signinUser = async (signinData: UserSignInInput): Promise<User | null> => {
  return await userStore.authenticateUser(signinData.email, signinData.password);
};
