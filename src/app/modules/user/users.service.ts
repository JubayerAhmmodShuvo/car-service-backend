import User from './users.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUser } from './users.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to retrieve users'
    );
  }
};

const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to retrieve user'
    );
  }
};

const updateUserById = async (
  id: string,
  updatedData: Partial<IUser>
): Promise<IUser | null> => {
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (user) {
      return user;
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user'
    );
  }
};

const deleteUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete user'
    );
  }
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
