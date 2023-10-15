import { Document } from 'mongoose';

export interface IBlog {
  title: string;
  description: string;
}

export interface IBlogDocument extends IBlog, Document {}
