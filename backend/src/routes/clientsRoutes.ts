import express, { Request, Response } from "express";

import Client from "../models/Client";
import catchAsync from "../utils";

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const { mail } = req.query;

    if (mail) {
      // tu gvakvs mail
      const clients = await Client.find({
        mail: { $regex: mail, $options: "i" },
      });
      res.json(clients);
    } else {
      // tu ar gvakvs mail davabrunot kvela client
      const clients = await Client.find();
      res.json(clients);
    }
  })
);

router.post(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const { name, mail, phone } = req.body;

    const newClient = new Client({
      name,
      mail,
      phone,
    });

    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  })
);

export default router;
