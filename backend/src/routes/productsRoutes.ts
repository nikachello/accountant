import express, { Request, Response } from "express";

import Product from "../Models/Product";
import catchAsync from "../utils";
const router = express.Router();

// Get all products

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const products = await Product.find();
    res.json(products);
  })
);

router.post(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    // Data destructurizacia requestidan
    const { name, brand, price, img } = req.body;

    // New product

    const newProduct = new Product({
      name,
      brand,
      price,
      img,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  })
);

export default router;
