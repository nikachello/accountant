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
      clientPhone,
      // products,
      total,
      isShipped,
      productName,
      productBrand,
      productPrice,
      weight,
      paymentType,
      isMoneyReceived,
      cargo,
    } = req.body;

    let client = await Client.findOne({ phone: clientPhone });
    if (!client) {
      client = new Client({
        phone: clientPhone,
        name: req.body.clientName,
        mail: req.body.clientMail,
      });

      await client.save();
    }

    const sellerId = req.body.userId;

    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const newOrder = new Order({
      client: client._id,
      seller: seller._id,
      // products,
      productName,
      productBrand,
      productPrice,
      total,
      isShipped,
      weight,
      paymentType,
      isMoneyReceived,
      cargo,
      date: new Date().toISOString(),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  })
);

router.get(
  "/",
  verifyToken,
  catchAsync(async (req: Request, res: Response) => {
    const orders = await Order.find({ seller: req.body.userId })
      .populate("products")
      .populate({
        path: "client",
        select: "name mail phone", // fields to include from Client model
      })
      .populate({
        path: "seller",
        select: "name comission", // fields to include from Seller model
      })
      .exec();
    res.status(200).json(orders);
  })
);

export default router;
