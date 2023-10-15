import mongoose, { Schema } from 'mongoose';
import { IBlogDocument } from './blog.inerface';


const blogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);

const BlogModel = mongoose.model<IBlogDocument>('Blog', blogSchema);

export default BlogModel;
