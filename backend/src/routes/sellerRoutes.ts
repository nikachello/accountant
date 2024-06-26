import express, { Request, Response } from "express";

import Seller from "../Models/Seller";
import catchAsync from "../utils";

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const sellers = await Seller.find();
    res.json(sellers);
  })
);

router.post(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const { name, comission } = req.body;

    const newSeller = new Seller({
      name,
      comission,
    });

    const savedSeller = await newSeller.save();
    res.status(201).json(savedSeller);
  })
);

export default router;
