import express from 'express';

 import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post('/create-booking', BookingController.createBooking);
router.patch('/cancel/:id', BookingController.cancelBooking);


router.patch('/approve/:id', BookingController.approveBooking);
router.patch('/:id', BookingController.updateBookingById);

router.get('/', BookingController.getAllBookings);
router.get('/:id', BookingController.getBookingById);

router.delete('/:id', BookingController.deleteBookingById);
router.get('/bookings/:id', BookingController.getUserBookingOrdersController);



export const BookingRoutes = router;
