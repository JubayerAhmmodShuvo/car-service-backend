import { Model } from 'mongoose';
import { UserRole } from '../../../enum/user';

export type IUser = {
  toObject?: any;
  _id?: string;
  password: string;
  role?: string | undefined;
  name?: string;
  email: string;
  address?: string;
  budget?: number;
  income?: number;
  bloodGroup?: string;
  bio?: string;
  gender?: string;
  number?: string;
  image?:string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser,'_id'| 'email' | 'password'|'role' |'name'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;


