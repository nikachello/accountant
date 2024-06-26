import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  name: string;
  brand: string;
  price: number;
  img: string;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide model name"],
  },
  brand: {
    type: String,
    required: [true, "Please provide brand name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price of the product"],
  },
  img: {
    type: String,
    required: [true, "Please provide product image"],
  },
});

export default mongoose.model<Product>("Product", ProductSchema);
