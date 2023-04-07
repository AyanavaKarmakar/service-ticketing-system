/// <reference path="../types/custom.d.ts" />

import type { Request, Response } from "express";
import { RequestForm } from "../models/requestForm";
import type { IEmployee, IEmployeeDocument } from "../models/employee";

// GET /tasks/unallocated
export const getUnallocatedTasks = async (req: Request, res: Response) => {
  try {
    const employee = req.employee as IEmployee & IEmployeeDocument;

    // Only allow employee1 (ADMIN) to access unallocated tasks
    if (employee.username !== "employee1") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const unallocatedTasks = await RequestForm.find({
      assignedEmployee: { $exists: false },
    }).populate("customer");

    return res.status(200).json({ unallocatedTasks });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /tasks/allocated
export const getAllocatedTasks = async (req: Request, res: Response) => {
  try {
    const employee = req.employee as IEmployee & IEmployeeDocument;

    // Only allow employee1 (ADMIN) to access unallocated tasks
    if (employee.username !== "employee1") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const allocatedTasks = await RequestForm.find({
      assignedEmployee: { $exists: true },
    }).populate("assignedEmployee customer");

    return res.status(200).json({ allocatedTasks });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
