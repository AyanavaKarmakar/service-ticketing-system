/// <reference path="../types/custom.d.ts" />

import type { Request, Response } from "express";
import { RequestForm } from "../models/requestForm";
import type { ICustomer, ICustomerDocument } from "../models/customer";

// POST /customer/requestform
export const requestForm = async (req: Request, res: Response) => {
  try {
    const { productType, issueType, issueDescription, policyUpload } = req.body;
    const customer = req.customer as ICustomer & ICustomerDocument;

    // Check if all the mandatory fields are present
    if (!productType || !issueType || !policyUpload) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRequestForm = new RequestForm({
      customer: customer._id,
      productType,
      issueType,
      issueDescription,
      policyUpload,
    });

    await newRequestForm.save();

    res.status(201).json({ newRequestForm, message: "Request Form Created" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
