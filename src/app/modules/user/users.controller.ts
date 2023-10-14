import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './users.service';
import catchAsync from '../../../shared/catchAsync';
import { IUser, UserModel } from './users.interface';
import jwt from 'jsonwebtoken';
import User from './users.model';

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

export const UserController = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
