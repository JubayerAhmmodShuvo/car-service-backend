import express from 'express';
import { FAQController } from './faq.controller';


const router = express.Router();
router.post('/', FAQController.createFAQ);

router.patch('/:id', FAQController.updateFAQ);
router.get('/:id', FAQController.getFAQById);

router.delete('/:id', FAQController.deleteFAQ);
router.get('/', FAQController.getAllFAQs);


export const FaqRoutes = router;
