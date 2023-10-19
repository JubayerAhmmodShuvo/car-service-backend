import express from 'express';

 import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post('/create-booking', BookingController.createBooking);
router.patch(
  '/cancel/:id',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  BookingController.cancelBooking
);


router.patch('/approve/:id',auth(UserRole.Admin,UserRole.Super_Admin,), BookingController.approveBooking);
router.patch('/:id', BookingController.updateBookingById);

router.get(
  '/',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
 BookingController.getAllBookings
);
router.get('/:id', BookingController.getBookingById);

router.delete(
  '/:id',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  BookingController.deleteBookingById
);
router.get('/bookings/:id', BookingController.getUserBookingOrdersController);



export const BookingRoutes = router;
