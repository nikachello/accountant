// backend/src/index.ts
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productsRouter from "./routes/productsRoutes";
import clientRouter from "./routes/clientsRoutes";
import sellerRouter from "./routes/sellerRoutes";
import authRouter from "./routes/authRoutes";
import orderRouter from "./routes/orderRoutes";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(cookieParser()); // Add this line to parse cookies
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://nikachelidze9:Borblebi12@backenddb.cdq1kn7.mongodb.net/?retryWrites=true&w=majority&appName=backendDB"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });

// Routing

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/sellers", sellerRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/orders", orderRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
