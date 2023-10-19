import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
  user: string; 
  service: string; 
  date: Date;
  time: string;
  status: string;
  payment?: number;
  orderName: string;
  customerName: string;
}

const BookingSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'pending' },
  payment: { type: Number },
  orderName: { type: String, required: true },
  customerName: { type: String, required: true },
});

const BookingModel = model<IBooking>('Booking', BookingSchema);

export default BookingModel;
