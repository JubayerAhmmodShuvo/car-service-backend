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

const getAllUsersPagination = async (
  paginationOptions: any
): Promise<IUser[]> => {
  try {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      location,
      searchTerm,
    } = paginationOptions;

    // Define a base query object with type definitions
    const query: any = {};

    // Add filtering conditions based on your paginationOptions
    if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    }
    if (maxPrice !== undefined) {
      if (query.price) {
        query.price.$lte = maxPrice;
      } else {
        query.price = { $lte: maxPrice };
      }
    }
    if (location) {
      query.location = location;
    }
    if (searchTerm) {
      // Customize this part for your search requirements
      query.$or = [
        { username: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        // Add other fields you want to search by
      ];
    }

    // Find users based on the query and apply sorting and pagination
    const users = await User.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

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
  getAllUsersPagination
};
