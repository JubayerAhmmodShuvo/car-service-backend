import { RequestHandler } from 'express';
import { PaymentService } from './payment.service';
import PaymentModel from './payment.model';

const createPayment: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const sessionData = await PaymentService.createCheckoutSession(data);

    const paymentData = {
      price: data.price,
      name: data.name,
      transactionId: sessionData.sessionId,
      image: data.image,
    };

    const payment = new PaymentModel(paymentData);
    await payment.save();

    res.status(200).json({
      status: 200,
      message: 'payment created successfully',
      data: sessionData,
    });
  } catch (err) {
    next(err);
  }
};

export const PaymentController = {
  createPayment,
};
