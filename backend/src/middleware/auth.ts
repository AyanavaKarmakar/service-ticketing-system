import jwt, { type JwtPayload } from "jsonwebtoken";
import { Customer } from "../models/customer";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) throw new Error();

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded._id) {
      throw new Error("Invalid token");
    }
    const customer = await Customer.findOne({
      _id: decoded._id,
    });

    if (!customer) throw new Error();

    req.customer = customer;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
