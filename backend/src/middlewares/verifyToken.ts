import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json({ message: "Please provide token" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Failed to authenticate token", err });
    }
    req.body.userId = (decoded as { userId: string }).userId;
    next();
  });
};

export default verifyToken;
