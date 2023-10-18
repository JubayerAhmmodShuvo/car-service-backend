import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
  user: string; // Reference to user's MongoDB ID
  service: string; // Reference to service's MongoDB ID
  date: Date;
  time: string;
  status: string; // Initialize status to 'pending'
  payment: number;
  ordername: string;
  customerName: string;
}

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'pending' }, 
  payment: { type: Number, required: true },
  ordername: { type: String, required: true },
  customerName: { type: String, required: true },
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;
