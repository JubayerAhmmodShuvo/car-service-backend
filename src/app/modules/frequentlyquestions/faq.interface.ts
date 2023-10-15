import { Document } from 'mongoose';

export interface FAQ {
  question: string;
  answer?: string;
}

export type FAQDocument = Document & FAQ;
