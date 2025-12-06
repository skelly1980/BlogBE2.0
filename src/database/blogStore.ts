import { Blog, BlogContent } from 'src/model/blogs';
import mongoose from 'mongoose';

type DbBlog = Omit<Blog, 'id'> & { _id: string };

const convertBlog = (dbBlog: DbBlog): Blog => {
  return {
    id: dbBlog._id,
    tags: dbBlog.tags,
    date: dbBlog.date,
    title: dbBlog.title,
    description: dbBlog.description,
    content: dbBlog.content,
    img: dbBlog.img,
  };
};

export const getBlogs = async (): Promise<Blog[]> => {
  const collection = mongoose.connection.db?.collection('blog');

  const dbBlogs = await collection?.find<DbBlog>({}).toArray();

  const blogs = dbBlogs?.map((blog) => convertBlog(blog));

  return blogs ?? [];
};

export const createBlog = async (blogContent: BlogContent): Promise<Blog> => {
  const blog = {
    ...blogContent,
    date: new Date(),
  };

  const collection = mongoose.connection.db?.collection('blog');

  const res = await collection?.insertOne({ ...blog });
  const id = res!.insertedId.toString();

  return { ...blog, id };
};

export const updateBlog = async (
  id: string,
  blog: Blog,
): Promise<Blog | null> => {
  const collection = mongoose.connection.db?.collection('blog');
  if (collection) {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const res = await collection.findOneAndUpdate(
        { _id: objectId },
        { $set: blog },
        { returnDocument: 'after' },
      );

      return res ? convertBlog(res as unknown as DbBlog) : null;
    } catch (_err) {
      return null;
    }
  }
  return null;
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  const collection = mongoose.connection.db?.collection('blog');

  if (collection) {
    try {
      const objectId = new mongoose.mongo.ObjectId(id);
      const res = await collection.deleteOne({ _id: objectId });
      return (res?.deletedCount ?? 0) > 0;
    } catch (_err) {
      return false;
    }
  }
  return true;
};
