import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../../enum/user';



const router = express.Router();
router.post('/', auth(UserRole.Admin), BlogController.createBlog);

router.patch('/:id', BlogController.updateBlog);
router.get('/:id', BlogController.updateBlog);

router.delete('/:id', BlogController.deleteBlog);
router.get('/', BlogController.getAllBlogs);
router.get('/all', BlogController.getAllBlogsByPagination);

export const BlogRoutes = router;
