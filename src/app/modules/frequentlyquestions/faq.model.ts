import { model, Schema } from 'mongoose';

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String },
  },
  {
    timestamps: true, 
  }
);

export default model('FAQ', faqSchema);
