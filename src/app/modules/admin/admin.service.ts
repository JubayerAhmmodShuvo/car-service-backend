import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';
import { IAdmin } from './admin.interface';
import Admin from './admin.model';

const createAdmin = async (adminData: IAdmin): Promise<IAdmin | null> => {
  try {
    if (adminData.role !== 'admin') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role');
    }
    const isPhoneExist = await Admin.isUserExist(adminData.email);
    if (isPhoneExist) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists');
    }

    const newAdmin = await Admin.create(adminData);
    return newAdmin;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new ApiError(httpStatus.CONFLICT, 'Duplicate entry');
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create admin'
    );
  }
};

const loginAdmin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await Admin.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found');
  }

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { _id: id, role, email: number } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { id, role, number },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role, number },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { number } = verifiedToken;

  const isUserExist = await Admin.isUserExist(number);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const getProfile = async (id: string): Promise<IAdmin | null> => {
  try {
    const user = await Admin.findById({ _id: id });
    return user;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to retrieve admin profile'
    );
  }
};
const updateProfile = async (
  id: string,
  updatedData: Partial<IAdmin>
): Promise<IAdmin | null> => {
  try {
    const updatedUser = await Admin.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user profile'
    );
  }
};

export const AdminService = {
  createAdmin,
  loginAdmin,
  refreshToken,
  getProfile,
  updateProfile,
};
