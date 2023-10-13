import { Model } from 'mongoose';
import { UserRole } from '../../../enum/user';

export type IAdmin = {
  toObject: any;
  _id?: string;
  password: string;
  role: UserRole;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  address: string;
};

export type AdminModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IAdmin, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
