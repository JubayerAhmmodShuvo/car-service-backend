import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './users.service';
import catchAsync from '../../../shared/catchAsync';
import { IUser, UserModel } from './users.interface';
import jwt from 'jsonwebtoken';
import User from './users.model';
import { paginationHelpers } from '../../../helpers/paginationHelper';

const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  }
);

const getAllUsersPagination: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // Parse pagination options from the query parameters
    const paginationOptions = paginationHelpers.calculatePagination(req.query);

    // Get users with pagination information
    const users = await UserService.getAllUsersPagination(paginationOptions);

    // Create a meta object with pagination information
  

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: users,

      
    });
  }
);

const getUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
  
    if (user) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved successfully',
        data: user,
      });
    }
  }
);

const updateUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const user = await UserService.updateUserById(id, updatedData);

      if (user) {
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User updated successfully',
          data: user,
        });
      }
    } catch (error) {}
  }
);

const deleteUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.deleteUserById(id);
    if (user) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: user,
      });
    }
  }
);

const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role,
      address,
      bloodGroup,
      bio,
      gender,
      number,
    } = req.body;

    // Ensure that the provided "role" is either "admin" or "user"
    if (role !== 'admin' && role !== 'user') {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Invalid role specified',
      });
    }

    // Create a new user with the provided values
    const userData: IUser = {
      name,
      email,
      password,
      role,
      address,
      bloodGroup,bio,gender,number
    };

    const user = await UserService.createUser(userData);

    if (user) {
      return sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } else {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'User creation failed',
      });
    }
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'User creation failed',
    });
  }
};


export const UserController = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsersPagination,
  createUser,
};
