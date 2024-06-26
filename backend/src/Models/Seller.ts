import mongoose, { Schema, Document } from "mongoose";

export interface Seller extends Document {
  name: string;
  comission: Number;
  mail: string;
  password: string;
}

const SellerSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide seller's name"],
  },
  comission: {
    type: Number,
    required: [true, "Please provide seller's comissions"],
  },
  mail: {
    type: String,
    required: [true, "Please provide seller's email"],
    unique: [true, "Seller with this email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide seller's password"],
  },
});

export default mongoose.model<Seller>("Seller", SellerSchema);
