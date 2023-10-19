import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';
import catchAsync from '../../../shared/catchAsync';
import BookingModel, { IBooking } from './booking.model';
import ApiError from '../../../errors/ApiError';

const createBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookingData: IBooking = req.body;
 
    const booking = await BookingService.createBooking(bookingData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  }
);

const getAllBookings: RequestHandler = async (req: Request, res: Response) => {
  try {
    const bookings = await BookingService.getAllBookings();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to retrieve bookings',
      data: error,
    });
  }
};

const getBookingById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const booking = await BookingService.getBookingById(id);
    if (booking) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking retrieved successfully',
        data: booking,
      });
    }
  }
);

const updateBookingById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData: Partial<IBooking> = req.body;
    const booking = await BookingService.updateBookingById(id, updatedData);
    if (booking) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: booking,
      });
    }
  }
);

const deleteBookingById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const booking = await BookingService.deleteBookingById(id);
    if (booking) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking deleted successfully',
        data: booking,
      });
    }
  }
);

const getUserBookingOrdersController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params; 

  try {
    const userBookings = await BookingService.getUserBookingOrders(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User booking orders retrieved successfully',
      data: userBookings,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to retrieve user booking orders',
      data: error,
    });
  }
};

const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      { status: 'cancelled' }, 
      { new: true }
    ).exec();

    if (!updatedBooking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

const approveBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      { status: 'approved' }, 
      { new: true }
    ).exec();

    if (!updatedBooking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Booking approved successfully',
      data: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
};




export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
  getUserBookingOrdersController,
  cancelBooking,
  approveBooking,
};
