import { IBlog } from './blog.inerface';
import Blog from './blog.model';


const createBlog = async (blogData: IBlog): Promise<IBlog> => {
  try {
    const blog = await Blog.create(blogData);
    return blog;
  } catch (error) {
    throw new Error('Failed to create a blog');
  }
};

const getAllBlogs = async (): Promise<IBlog[]> => {
  try {
    const blogs = await Blog.find();
    return blogs;
  } catch (error) {
    throw new Error('Failed to retrieve blogs');
  }
};

const getBlogById = async (id: string): Promise<IBlog | null> => {
  try {
    const blog = await Blog.findById(id);
    return blog;
  } catch (error) {
    throw new Error('Failed to retrieve the blog');
  }
};

const updateBlog = async (
  id: string,
  updatedBlog: IBlog
): Promise<IBlog | null> => {
  try {
    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    return blog;
  } catch (error) {
    throw new Error('Failed to update the blog');
  }
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
  } catch (error) {
    throw new Error('Failed to delete the blog');
  }
};

const getAllBlogsPagination = async (
  paginationOptions: any
): Promise<IBlog[]> => {
  try {
    const { page, limit, sortBy, sortOrder, search } = paginationOptions;

    const query: any = {};

    // Apply any filtering conditions you need here, e.g., search by title or other criteria.
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const blogs = await Blog.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    return blogs;
  } catch (error) {
    throw new Error('Failed to retrieve blogs with pagination');
  }
};



export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getAllBlogsPagination,
};
