import type { Request, Response } from "express";
import { RequestForm } from "../models/requestForm";

// GET /tasks/unallocated
export const getUnallocatedTasks = async (req: Request, res: Response) => {
  try {
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
    const allocatedTasks = await RequestForm.find({
      assignedEmployee: { $exists: true },
    }).populate("assignedEmployee customer");

    return res.status(200).json({ allocatedTasks });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// GET /tasks/:id
export const getTaskByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const task = await RequestForm.findById(id).populate("customer");
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ task });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
