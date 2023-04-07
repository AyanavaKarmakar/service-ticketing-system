import { Router } from "express";
import {
  assignTask,
  getAllocatedTasks,
  getTaskByID,
  getUnallocatedTasks,
} from "../controllers/tasks";
import {
  adminAuthMiddleware,
  employeeAuthMiddleware,
} from "../middleware/auth";

const router = Router();

router.get("/unallocated", adminAuthMiddleware, getUnallocatedTasks);
router.get("/allocated", adminAuthMiddleware, getAllocatedTasks);
router.post("/:id/assign", employeeAuthMiddleware, assignTask);

router.get("/:id", employeeAuthMiddleware, getTaskByID);

export const TasksRouter = router;
