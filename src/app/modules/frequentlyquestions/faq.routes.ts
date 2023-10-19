import express from 'express';
import { FAQController } from './faq.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';


const router = express.Router();
router.post(
  '/',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  FAQController.createFAQ
);

router.patch(
  '/:id',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  FAQController.updateFAQ
);
router.get(
  '/:id',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  FAQController.getFAQById
);

router.delete(
  '/:id',
  auth(UserRole.Admin, UserRole.Super_Admin),
  FAQController.deleteFAQ
);
router.get(
  '/',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  FAQController.getAllFAQs
);


export const FaqRoutes = router;
