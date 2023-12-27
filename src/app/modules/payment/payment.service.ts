import Stripe from 'stripe';

const DOMAIN = 'https://shoehouse-frontend.vercel.app';

const stripeApiKey = process.env.STRIPE_KEY;

if (!stripeApiKey) {
  throw new Error('Stripe API key is not defined.');
}

const stripe = new Stripe(stripeApiKey);

const createCheckoutSession = async (product: any) => {
  try {
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.image],
            metadata: {
              id: product._id,
            },
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${DOMAIN}/payment/success`,
      cancel_url: `${DOMAIN}/payment/cancel`,
    });

    return {
      sessionId: session.id,
      sessionUrl: session.url,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const PaymentService = {
  createCheckoutSession,
};
