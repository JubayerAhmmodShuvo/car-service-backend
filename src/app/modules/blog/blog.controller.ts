import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { BlogService } from './blog.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const blogData = req.body;
    const createdBlog = await BlogService.createBlog(blogData);

    if (createdBlog) {
      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: createdBlog,
      });
    } 
  }
);

const deleteBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedBlog = await BlogService.deleteBlog(id);

    if (deletedBlog) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: deletedBlog,
      });
    } 
  }
);

const updateBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBlog = await BlogService.updateBlog(id, updatedData);

    if (updatedBlog) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog updated successfully',
        data: updatedBlog,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Blog not found',
      });
    }
  }
);

const getAllBlogs: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const blogs = await BlogService.getAllBlogs();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: blogs,
      message: 'All Blogs fetched successfully',
    });
  }
);

const getAllBlogsByPagination: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
   
    const { page, limit, sortBy, sortOrder, search } = req.query;

    const blogs = await BlogService.getAllBlogsPagination({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: blogs,
      message: 'Blogs fetched successfully with pagination',
    });
  }
);

const getBlogById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await BlogService.getBlogById(id);

    if (blog) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog retrieved successfully',
        data: blog,
      });
    } 
  }
);

export const BlogController = {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllBlogs,
  getAllBlogsByPagination,
  getBlogById,
};
