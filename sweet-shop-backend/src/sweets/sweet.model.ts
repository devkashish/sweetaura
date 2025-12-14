import mongoose, { Schema, Document } from "mongoose";

export interface ISweet extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

const SweetSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0.01 },
    quantity: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export const Sweet = mongoose.model<ISweet>("Sweet", SweetSchema);
