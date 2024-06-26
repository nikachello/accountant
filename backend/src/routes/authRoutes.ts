import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Seller from "../models/Seller";
import catchAsync from "../utils";

const router = express.Router();
router.use(cookieParser());

//register

router.post(
  "/register",
  catchAsync(async (req: Request, res: Response) => {
    const { name, comission, mail, password } = req.body;
    const existingSeller = await Seller.findOne({ mail });
    if (existingSeller) {
      return res.status(400).json({ message: "გამყიდველი ამ მეილით არსებობს" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // shevkmnat axali seller

    const newSeller = new Seller({
      name,
      comission,
      mail,
      password: hashedPassword,
    });
    const savedSeller = await newSeller.save();
    res
      .status(201)
      .json({ message: "გამყიდველი წარმატებით დარეგისტრირდა", savedSeller });
  })
);

//login
router.post(
  "/login",
  catchAsync(async (req: Request, res: Response) => {
    const { mail, password } = req.body;
    const seller = await Seller.findOne({ mail });

    if (!seller) {
      return res.status(404).json({ message: "გამყიდველი არ მოიძებნა" });
    }

    // Shevadarot passwordebi

    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "არასწორი პაროლი" });
    }

    // JWT create

    const token = jwt.sign(
      {
        userId: seller._id,
        mail: seller.mail,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    // davakenot jwt token cookied

    res.cookie("jwt", token, {
      httpOnly: true,
    });

    res.json({ message: "წარმატებული შესვლა", seller, token });
  })
);

export default router;
