// models/Order.ts
import mongoose, { Schema, Document } from "mongoose";
import { Seller } from "./Seller";
import { Product } from "./Product";

export interface Order extends Document {
  clientId: number;
  products: Array<number | Product>;
  sellerId: number | Seller;
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
    type: Number,
    required: true,
  },
  products: [
    {
      type: Schema.Types.Mixed,
      required: true,
    },
  ],
  sellerId: {
    type: Schema.Types.Mixed,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
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
