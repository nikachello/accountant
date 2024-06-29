// models/Order.ts
import mongoose, { Schema, Document } from "mongoose";
import { Seller } from "./Seller";
import { Product } from "./Product";

export interface Order extends Document {
  client: mongoose.Types.ObjectId;
  products: Array<mongoose.Types.ObjectId | Product>; // Array of product IDs or embedded products
  seller: mongoose.Types.ObjectId;
  total: number;
  isShipped: boolean;
  weight: number;
  paymentType: string;
  isMoneyReceived: boolean;
  cargo: number;
  date: Date;
}

const OrderSchema: Schema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  isShipped: {
    type: Boolean,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  isMoneyReceived: {
    type: Boolean,
    required: true,
  },
  cargo: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
});

export default mongoose.model<Order>("Order", OrderSchema);
