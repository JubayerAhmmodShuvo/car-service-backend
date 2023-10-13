import express from 'express';
import { UserRoutes } from '../modules/user/users.routes';
import { UserAuth } from '../modules/auth/auth.route';

import { AdminAuth } from '../modules/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: UserAuth,
  },

  {
    path: '/admins',
    route: AdminAuth,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
