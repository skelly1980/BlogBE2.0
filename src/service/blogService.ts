import { Blog, BlogContent } from 'src/model/blogs';
import * as blogStore from '../database/blogStore';

export const getBlogs = async (): Promise<Blog[]> => {
  return await blogStore.getBlogs();
};

export const createBlog = async (blogContent: BlogContent): Promise<Blog> => {
  return await blogStore.createBlog(blogContent);
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  return await blogStore.deleteBlog(id);
};

// export const getUser = async (id: string): Promise<User | undefined> => {
//   return await userStore.getUser(id);
