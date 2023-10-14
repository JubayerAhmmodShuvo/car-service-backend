
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import ServiceModel, { IService } from './service.model';


const createService = async (serviceData: IService): Promise<IService> => {
  try {
    const service = new ServiceModel(serviceData);
    return await service.save();
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to crate service'
    );
  }
};

const getAllServices = async (): Promise<IService[]> => {
  try {
    const services = await ServiceModel.find().exec();
    return services;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to get service'
    );
  }
};


const getServiceById = async (id: string): Promise<IService | null> => {
  try {
    return await ServiceModel.findById(id).exec();
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to get service'
    );
  }
};


const updateServiceById = async (
  id: string,
  updatedData: Partial<IService>
): Promise<IService | null> => {
  try {
    return await ServiceModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).exec();
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update service'
    );
  }
};


const deleteServiceById = async (id: string): Promise<IService | null> => {
  try {
    return await ServiceModel.findByIdAndDelete(id).exec();
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete service'
    );
  }
};

// const addReview= async (id: string, userId: string, rating: number, comment: string): Promise<IService | null> => {
//     try {
//       const service = await ServiceModel.findById(id);

//       if (service) {
//         if (service.userReviews === undefined) {
//           service.userReviews = [];
//         }

//         service.userReviews.push({ userId, rating, comment });

//         // Recalculate the overall rating
//         if (service.userReviews.length > 0) {
//           const totalRating = service.userReviews.reduce(
//             (total, review) => total + review.rating,
//             0
//           );
//           service.overallRating = totalRating / service.userReviews.length;
//         } else {
//           service.overallRating = 0;
//         }

//         await service.save();
//         return service;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       throw new ApiError(
//         httpStatus.INTERNAL_SERVER_ERROR,
//         'Failed to add the review'
//       );
//     }
//   }



export const ServiceService = {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
  
};
