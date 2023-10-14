
import express from 'express';
const router = express.Router();
import { ServiceController } from './service.controller';



router.post('/:id/add-review', ServiceController.addReview);
router.post('/', ServiceController.createService);
router.patch('/:id', ServiceController.updateServiceById);
router.get('/', ServiceController.getAllServices);
router.get('/:id', ServiceController.getServiceById);
router.delete('/:id', ServiceController.deleteServiceById);

export const ServiceRoutes = router;
