import fs from 'fs/promises';
import { Blog, BlogContent } from 'src/model/blogs';
import mongoose from 'mongoose';

// Dummy database. Replace with a real impl.

const getData = async (): Promise<Blog[]> => {
  const data = await fs.readFile(`${process.cwd()}/data/blogs.json`, 'utf8');
  return JSON.parse(data) as Blog[];
};

export const getBlogs = async (): Promise<Blog[]> => {
  const collection = mongoose.connection.db?.collection('blog');

  const blogs = await collection?.find<Blog>({}).toArray()
  console.log(blogs);
  return blogs ?? [];
};

export const createBlog = async (blogContent: BlogContent): Promise<Blog> => {
  const blog = {
    ...blogContent,
    date: new Date(),
  };

  const collection = mongoose.connection.db?.collection('blog');

  await collection?.insertOne(blog);

  return {...blog, id:1};
};

// export const getUser = async (id: string): Promise<User | undefined> => {
//   const users = await getData();
//   return users.find((u) => u.id === id);
// };
