import fs from 'fs/promises';
import { Blog, BlogContent } from 'src/model/blogs';


// Dummy database. Replace with a real impl.

const getData = async (): Promise<Blog[]> => {
  const data = await fs.readFile(`${process.cwd()}/data/blogs.json`, 'utf8');
  return JSON.parse(data) as Blog[];
};

export const getBlogs = async (): Promise<Blog[]> => {
  return await getData();
};

export const createBlog = async (blogContent: BlogContent): Promise<Blog> => {
  const blog: Blog = {
    ...blogContent, 
    id: 1,
    date: new Date(),
  }
  return blog;

}

// export const getUser = async (id: string): Promise<User | undefined> => {
//   const users = await getData();
//   return users.find((u) => u.id === id);
// };
