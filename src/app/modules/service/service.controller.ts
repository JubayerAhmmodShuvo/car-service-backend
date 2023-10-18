
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.service';
import catchAsync from '../../../shared/catchAsync';
import { IService } from './service.model';



const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const serviceData: IService = req.body;
    const service = await ServiceService.createService(serviceData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  }
);


const getAllServices: RequestHandler = async (req: Request, res: Response) => {
  try {
    const services = await ServiceService.getAllServices();

    for (const service of services) {
      const userReviews = service.userReviews || [];
      if (userReviews.length > 0) {
        const totalRating = userReviews.reduce(
          (total, review) => total + review.rating,
          0
        );
        const averageRating = totalRating / userReviews.length;
        service.overallRating = averageRating;
      } else {
        service.overallRating = 0;
      }
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services retrieved successfully',
      data: services,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to retrieve services',
      data: error,
    });
  }
};



const getServiceById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
   
    const service = await ServiceService.getServiceById(id);
    if (service) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service retrieved successfully',
        data: service,
      });
    }
  }
);


const updateServiceById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData: Partial<IService> = req.body;
    const service = await ServiceService.updateServiceById(id, updatedData);
    if (service) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service updated successfully',
        data: service,
      });
    }
  }
);


const deleteServiceById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const service = await ServiceService.deleteServiceById(id);
    if (service) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service deleted successfully',
        data: service,
      });
    }
  }
);

const addReview: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, rating, comment } = req.body;
   
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Rating must be a number between 0 and 5',
      });
    }

    const service = await ServiceService.getServiceById(id);

    if (service) {
      if (service.userReviews === undefined) {
        service.userReviews = []; 
      }

      service.userReviews.push({ name, rating, comment });
      await service.save();

      
      if (service.userReviews.length > 0) {
        const totalRating = service.userReviews.reduce(
          (total, review) => total + review.rating,
          0
        );
        const averageRating = totalRating / service.userReviews.length;
        service.overallRating = averageRating;
      } else {
        service.overallRating = 0;
      }

      await service.save();


      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review added successfully',
        data: service,
      });
    } 
  } catch (error) {
    console.error('Error:', error); 
   
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to add review',
      data: error,
    });
  }
};


const searchServices: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const query: string = req.query.query as string;
     
      const services = await ServiceService.searchServices(query);
     

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Services retrieved successfully',
        data: services,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to retrieve services',
        data: error,
      });
    }
  }
);



export const ServiceController = {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
  addReview,
  searchServices,
};
