import { Router } from "express";
import {
  assignTask,
  deassignTask,
  getAllocatedTasks,
  getTaskByID,
  getUnallocatedTasks,
} from "../controllers/tasks";
import {
  adminAuthMiddleware,
  employeeAuthMiddleware,
} from "../middleware/auth";

const router = Router();

// ADMIN ROUTES
router.get("/unallocated", adminAuthMiddleware, getUnallocatedTasks);
router.get("/allocated", adminAuthMiddleware, getAllocatedTasks);
router.post("/:id/assign", adminAuthMiddleware, assignTask);
router.put("/:id/deassign", adminAuthMiddleware, deassignTask);

// EMPLOYEE ROUTES
router.get("/:id", employeeAuthMiddleware, getTaskByID);

export const TasksRouter = router;
