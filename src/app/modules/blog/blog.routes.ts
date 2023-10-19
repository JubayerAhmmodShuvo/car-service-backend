import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';



const router = express.Router();
router.post('/', auth(UserRole.Admin,UserRole.Super_Admin), BlogController.createBlog);

router.patch('/:id',auth(UserRole.Admin,UserRole.Super_Admin), BlogController.updateBlog);
router.get('/:id', BlogController.getBlogById);

router.delete('/:id',auth(UserRole.Admin,UserRole.Super_Admin), BlogController.deleteBlog);
router.get(
  '/',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  BlogController.getAllBlogs
);
router.get(
  '/all',
  auth(UserRole.Admin, UserRole.Super_Admin, UserRole.User),
  BlogController.getAllBlogsByPagination
);

export const BlogRoutes = router;
