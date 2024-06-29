import express, { Request, Response } from "express";

import Order from "../models/Order";
import catchAsync from "../utils";
import verifyToken from "../middlewares/verifyToken";
import Seller from "../models/Seller";
import Client from "../models/Client";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  catchAsync(async (req: Request, res: Response) => {
    const {
      clientId,
      products,
      total,
      isShipped,
      weight,
      paymentType,
      isMoneyReceived,
      totalCargo,
    } = req.body;

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const sellerId = req.body.userId;

    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const newOrder = new Order({
      clientId: client._id,
      sellerId: seller._id,
      products,
      total,
      isShipped,
      weight,
      paymentType,
      isMoneyReceived,
      totalCargo,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  })
);

router.get(
  "/",
  verifyToken,
  catchAsync(async (req: Request, res: Response) => {
    const orders = await Order.find({ sellerId: req.body.userId })
      .populate("products")
      .populate({
        path: "clientId",
        select: "name mail phone", // fields to include from Client model
      })
      .populate({
        path: "sellerId",
        select: "name comission", // fields to include from Seller model
      })
      .exec();
    res.status(200).json(orders);
  })
);

export default router;
