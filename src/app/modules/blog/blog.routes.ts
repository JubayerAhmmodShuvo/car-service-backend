import express from 'express';
import { BlogController } from './blog.controller';



const router = express.Router();
router.post('/', BlogController.createBlog);

router.patch('/:id', BlogController.updateBlog);
router.get('/:id', BlogController.updateBlog);

router.delete('/:id', BlogController.deleteBlog);
router.get('/', BlogController.getAllBlogs);
router.get('/all', BlogController.getAllBlogsByPagination);

export const BlogRoutes = router;
