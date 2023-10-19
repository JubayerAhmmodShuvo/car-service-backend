import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
  user: string;
  service: string;
  date: string;
  time: string;
  status: string;
  payment?: number;
  orderName: string;
  name: string;
  number: number;
}

const BookingSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'pending' },
    payment: { type: Number },
    orderName: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: Number, required: true },
  },
  {
    timestamps: true, 
  }
);

const BookingModel = model<IBooking>('Booking', BookingSchema);

export default BookingModel;
