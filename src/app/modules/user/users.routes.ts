import express from 'express';

import { UserController } from './users.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.patch('/:id', UserController.updateUserById);
router.get('/:id', UserController.getUserById);

router.delete('/:id', UserController.deleteUserById);
router.get('/', UserController.getAllUsers);
router.get('/all', UserController.getAllUsersPagination);

export const UserRoutes = router;
