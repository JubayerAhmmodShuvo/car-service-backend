import ApiError from '../../../errors/ApiError';
import BookingModel, { IBooking } from './booking.model';
import httpStatus from 'http-status';

const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
  try {
    const booking = new BookingModel(bookingData);
    return await booking.save();
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create booking'
    );
  }
};

const getAllBookings = async (): Promise<IBooking[]> => {
  try {
    return await BookingModel.find().exec();
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to get bookings'
    );
  }
};

const getBookingById = async (id: string): Promise<IBooking | null> => {
  try {
    
    const booking = await BookingModel.findById(id)
      .populate('user') 
      .populate('service')
      .exec();

    return booking;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to get booking'
    );
  }
};

const updateBookingById = async (
  id: string,
  updatedData: Partial<IBooking>
): Promise<IBooking | null> => {
  try {
    return await BookingModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).exec();
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update booking'
    );
  }
};

const deleteBookingById = async (id: string): Promise<IBooking | null> => {
  try {
    return await BookingModel.findByIdAndDelete(id).exec();
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete booking'
    );
  }
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
};
