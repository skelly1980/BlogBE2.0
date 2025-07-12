import * as blogStore from '../database/blogStore';
import { Blog } from 'src/types/blog';

export const getBlogs = async (): Promise<Blog[]> => {
  return await blogStore.getBlogs();
};

// export const getUser = async (id: string): Promise<User | undefined> => {
//   return await userStore.getUser(id);
