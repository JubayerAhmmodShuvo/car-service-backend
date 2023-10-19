
import express from 'express';
const router = express.Router();
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';



router.post('/:id/add-review', ServiceController.addReview);
router.post('/',auth(UserRole.Admin,UserRole.Super_Admin), ServiceController.createService);
router.patch('/:id', ServiceController.updateServiceById);
router.get('/search',auth(UserRole.Admin,UserRole.Super_Admin,UserRole.User), ServiceController.searchServices);
router.get(
  '/',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  ServiceController.getAllServices
);
router.get(
  '/:id',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  ServiceController.getServiceById
);
router.delete(
  '/:id',
  auth(UserRole.Admin, UserRole.Super_Admin),
  ServiceController.deleteServiceById
);

export const ServiceRoutes = router;
