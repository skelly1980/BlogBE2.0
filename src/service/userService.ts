import { User } from '../model/user';
import * as userStore from '../database/userStore';

export const getUsers = async (): Promise<User[]> => {
  return await userStore.getUsers();
};

export const getUser = async (id: string): Promise<User | undefined> => {
  return await userStore.getUser(id);
};
