import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  email?: string;
  description: string;
  images?: string;
  pricing: number;
  availability?: boolean;
  location?: string;
  contactInfo?: string;
  userReviews?: Review[];
  overallRating?: number;
}

export interface Review {
  email?: string;
  rating: number;
  comment?: string;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: String,
  pricing: Number,
  availability: Boolean,
  location: String,
  contactInfo: String,
  userReviews: [{ email: String, rating: Number, comment: String }],
  overallRating: { type: Number, default: 0 },
  email: String,
});


ServiceSchema.pre('save', function (next) {
  if (this.userReviews && this.userReviews.length > 0) {
    const totalRating = this.userReviews.reduce(
      (total: any, review: { rating: any; }) => total + review.rating,
      0
    );
    
    this.overallRating = Number.isNaN(totalRating)
      ? 0
      : totalRating / this.userReviews.length;
  } else {
    this.overallRating = 0;
  }
  next();
});


export default mongoose.model<IService>('Service', ServiceSchema);
