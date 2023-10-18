import { Document } from 'mongoose';

export interface IBooking extends Document {
  user: string;
  service: string;
  date: Date;
  time: string;
  status: string;
  payment: number;
  ordername: string;
  customerName: string;
}
