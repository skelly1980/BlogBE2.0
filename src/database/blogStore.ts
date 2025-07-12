import fs from 'fs/promises';
import { Blog } from 'src/types/blog';

// Dummy database. Replace with a real impl.

const getData = async (): Promise<Blog[]> => {
  const data = await fs.readFile(`${process.cwd()}/data/blogs.json`, 'utf8');
  return JSON.parse(data) as Blog[];
};

export const getBlogs = async (): Promise<Blog[]> => {
  return await getData();
};

// export const getUser = async (id: string): Promise<User | undefined> => {
//   const users = await getData();
//   return users.find((u) => u.id === id);
// };
