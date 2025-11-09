import fs from 'fs/promises';
import { CreateUserRequest, User } from '../model/user';
import mongoose from 'mongoose';

// Dummy database. Replace with a real impl.

const getData = async (): Promise<User[]> => {
  const data = await fs.readFile(`${process.cwd()}/data/users.json`, 'utf8');
  return JSON.parse(data) as User[];
};

type DbUser = Omit<User, 'id'> & {
  _id: string;
};

const convertUser = (dbUser: DbUser): User => {
  return {
    id: dbUser._id,
    name: dbUser.name,
    email: dbUser.email,
    password: dbUser.password,
  };
};

export const getUsers = async (): Promise<User[]> => {
  const collection = mongoose.connection.db?.collection('user');

  const dbUsers = await collection?.find<DbUser>({}).toArray();

  const users = dbUsers?.map((user) => {
    return convertUser(user);
  });

  return users ?? [];
};

export const createUser = async (
  createUserRequest: CreateUserRequest,
): Promise<User> => {
  const collection = mongoose.connection.db?.collection('user');
  const res = await collection?.insertOne({ ...createUserRequest });
  const id = res!.insertedId.toString();
  return { ...createUserRequest, id };
};

//Todo: Make this mongo
export const getUser = async (id: string): Promise<User | undefined> => {
  const users = await getData();
  return users.find((u) => u.id === id);
};

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const collection = mongoose.connection.db?.collection('user');
  const dbUser = await collection?.findOne<DbUser>({ email });

  if (!dbUser) {
    throw new Error('User does not exist');
  }

  //Console log to check password error
  if (dbUser.password !== password) {
    throw new Error('Password does not exist');
  }

  return convertUser(dbUser);
};
