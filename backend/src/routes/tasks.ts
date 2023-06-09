import { Router } from "express";
import {
  assignTask,
  deassignTask,
  getAllocatedTasks,
  getMyTasks,
  getTaskByID,
  getUnallocatedTasks,
  updateTaskStatus,
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
router.get("/:id/details", employeeAuthMiddleware, getTaskByID);
router.get("/mytasks", employeeAuthMiddleware, getMyTasks);
router.put("/:id/changestatus", employeeAuthMiddleware, updateTaskStatus);

export const TasksRouter = router;
