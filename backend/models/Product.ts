import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNewArrival: boolean;
  isOnSale: boolean;
  sizes: string[];
  colors: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  category: { type: String, required: true },
  isNewArrival: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);