/// <reference path="../types/custom.d.ts" />

import jwt, { type JwtPayload } from "jsonwebtoken";
import { Customer } from "../models/customer";
import { Employee } from "../models/employee";
import type { Request, Response, NextFunction } from "express";

// middleware to check if the customer is authenticated
export const customerAuthMiddleware = async (
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

// middleware to check if the employee is authenticated
export const employeeAuthMiddleware = async (
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

    const employee = await Employee.findOne({
      _id: decoded._id,
    });

    if (!employee) throw new Error();

    req.employee = employee;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

// middleware to check if the employee is authenticated and is an admin
export const adminAuthMiddleware = async (
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

    const employee = await Employee.findOne({
      _id: decoded._id,
    });

    if (!employee || employee.username !== "employee1") throw new Error();

    req.employee = employee;
    req.token = token;
    next();
  } catch (e) {
    return res.status(403).json({ error: "Forbidden" });
  }
};
