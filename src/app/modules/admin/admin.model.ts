import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { UserRole } from '../../../enum/user';
import { AdminModel, IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      firstName: String,
      lastName: String,
    },
    address: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

adminSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IAdmin, '_id' | 'email' | 'password' | 'role'> | null> {
  return await Admin.findOne({ email }, { email: 1, password: 1, role: 1 });
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.pre('save', async function (next) {
  const admin = this;
  admin.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);

export default Admin;
