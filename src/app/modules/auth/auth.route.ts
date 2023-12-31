import express from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post('/signup', AuthController.createUser);
router.post('/login', validateRequest(AuthValidation.loginZodSchema),AuthController.loginUser);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
export const UserAuth = router;
