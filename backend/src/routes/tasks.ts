import { Router } from "express";
import { getUnallocatedTasks } from "../controllers/tasks";
import { employeeAuthMiddleware } from "../middleware/auth";

const router = Router();

router.get("/unallocated", employeeAuthMiddleware, getUnallocatedTasks);

export const TasksRouter = router;
