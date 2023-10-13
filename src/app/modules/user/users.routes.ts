import express from 'express';

import { UserController } from './users.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';

const router = express.Router();



    
router.patch('/:id', UserController.updateUserById);
    router.get('/:id', UserController.getUserById);
    
    router.delete('/:id', UserController.deleteUserById);
    router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
