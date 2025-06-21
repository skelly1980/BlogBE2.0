import fs from 'fs/promises';
import { User } from '../model/user';

// Dummy database. Replace with a real impl.

const getData = async (): Promise<User[]> => {
  const data = await fs.readFile(`${process.cwd()}/data/users.json`, 'utf8');
  return JSON.parse(data) as User[];
};

export const getUsers = async (): Promise<User[]> => {
  return await getData();
};

export const getUser = async (id: string): Promise<User | undefined> => {
  const users = await getData();
  return users.find((u) => u.id === id);
};
