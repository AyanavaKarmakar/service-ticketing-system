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

// GET /customer/requestform
export const getCustomerRequestForms = async (req: Request, res: Response) => {
  try {
    const customer = req.customer as ICustomer & ICustomerDocument;

    const requestForms = await RequestForm.find({ customer: customer._id });

    res.status(200).json({ requestForms });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// GER /customer/requestform/:id
export const getCustomerRequestFormById = async (
  req: Request,
  res: Response
) => {
  try {
    const customer = req.customer as ICustomer & ICustomerDocument;
    const { id } = req.params;

    const requestForm = await RequestForm.findOne({
      customer: customer._id,
      _id: id,
    });

    if (!requestForm) {
      return res.status(404).json({ error: "Request Form not found" });
    }

    res.status(200).json({ requestForm });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
