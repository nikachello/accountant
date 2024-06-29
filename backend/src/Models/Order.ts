// models/Order.ts
import mongoose, { Schema, Document } from "mongoose";
import { Seller } from "./Seller";
import { Product } from "./Product";

export interface Order extends Document {
  clientId: mongoose.Types.ObjectId;
  products: Array<mongoose.Types.ObjectId | Product>; // Array of product IDs or embedded products
  sellerId: mongoose.Types.ObjectId;
  total: number;
  date: Date;
  isShipped: boolean;
  weight: number;
  paymentType: string;
  isMoneyReceived: boolean;
  totalCargo: number;
}

const OrderSchema: Schema = new Schema({
  clientId: {
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
  sellerId: {
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
  totalCargo: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Order>("Order", OrderSchema);
