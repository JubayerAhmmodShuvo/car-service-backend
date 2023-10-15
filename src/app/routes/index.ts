import express from 'express';
import { UserRoutes } from '../modules/user/users.routes';
import { UserAuth } from '../modules/auth/auth.route';

import { AdminAuth } from '../modules/admin/admin.route';
import { ServiceRoutes } from '../modules/service/service.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';

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
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
