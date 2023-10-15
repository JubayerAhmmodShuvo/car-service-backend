import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { FAQService } from './faq.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createFAQ: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const faqData = req.body;
    const createdFAQ = await FAQService.createFAQ(faqData);

    if (createdFAQ) {
      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'FAQ created successfully',
        data: createdFAQ,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to create an FAQ',
      });
    }
  }
);

const deleteFAQ: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedFAQ = await FAQService.deleteFAQ(id);

    if (deletedFAQ) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'FAQ deleted successfully',
        data: deletedFAQ,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'FAQ not found',
      });
    }
  }
);

const updateFAQ: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedFAQ = await FAQService.updateFAQ(id, updatedData);

    if (updatedFAQ) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'FAQ updated successfully',
        data: updatedFAQ,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'FAQ not found',
      });
    }
  }
);

const getAllFAQs: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const faqs = await FAQService.getAllFAQs();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: faqs,
      message: 'All FAQs fetched successfully',
    });
  }
);

const getFAQById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const faq = await FAQService.getFAQById(id);

    if (faq) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'FAQ retrieved successfully',
        data: faq,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'FAQ not found',
      });
    }
  }
);

export const FAQController = {
  createFAQ,
  deleteFAQ,
  updateFAQ,
  getAllFAQs,
  getFAQById,
};
