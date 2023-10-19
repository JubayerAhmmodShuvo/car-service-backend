import express from 'express';

 import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post('/create-booking', BookingController.createBooking);
router.patch('/:id', BookingController.updateBookingById);
router.get('/:id', BookingController.getBookingById);

router.delete('/:id', BookingController.deleteBookingById);
router.get('/', BookingController.getAllBookings);


export const BookingRoutes = router;
