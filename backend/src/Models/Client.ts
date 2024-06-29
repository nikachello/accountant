import mongoose, { Schema, Document } from "mongoose";

export interface Client extends Document {
  name: string;
  mail: string;
  phone: string;
}

const ClientSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide client's name"],
  },
  mail: {
    type: String,
    required: [true, "Please provide client's mail"],
    unique: [true, "Customer with this email already exists"],
  },
  phone: {
    type: String,
    required: [true, "Please provide client's phone numbers"],
  },
});

export default mongoose.model<Client>("Client", ClientSchema);
