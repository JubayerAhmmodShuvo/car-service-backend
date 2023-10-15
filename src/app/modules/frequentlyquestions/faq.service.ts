import { Model } from 'mongoose'; // Import Mongoose Model
import { FAQ, FAQDocument } from './faq.interface';
import faqModel from './faq.model';

// Create a new FAQ
const createFAQ = async (faqData: FAQ): Promise<FAQDocument | null> => {
  try {
    const faq = await faqModel.create(faqData);
    return faq;
  } catch (error) {
    throw new Error('Failed to create an FAQ');
  }
};

// Get all FAQs
const getAllFAQs = async (): Promise<FAQDocument[]> => {
  try {
    const faqs = await faqModel.find();
    return faqs;
  } catch (error) {
    throw new Error('Failed to retrieve FAQs');
  }
};

// Get an FAQ by its ID
const getFAQById = async (id: string): Promise<FAQDocument | null> => {
  try {
    const faq = await faqModel.findById(id);
    return faq;
  } catch (error) {
    throw new Error('Failed to retrieve the FAQ');
  }
};


const updateFAQ = async (id: string, updatedFAQ: FAQ): Promise<FAQDocument | null> => {
  try {
    const faq = await faqModel.findByIdAndUpdate(id, updatedFAQ, { new: true });
    return faq;
  } catch (error) {
    throw new Error('Failed to update the FAQ');
  }
};


const deleteFAQ = async (id: string): Promise<FAQDocument | null> => {
  try {
    const faq = await faqModel.findByIdAndDelete(id);
    return faq;
  } catch (error) {
    throw new Error('Failed to delete the FAQ');
  }
};

export const FAQService = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};
