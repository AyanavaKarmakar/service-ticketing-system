import { Router } from "express";
import { getAllocatedTasks, getUnallocatedTasks } from "../controllers/tasks";
import { adminAuthMiddleware } from "../middleware/auth";

const router = Router();

router.get("/unallocated", adminAuthMiddleware, getUnallocatedTasks);
router.get("/allocated", adminAuthMiddleware, getAllocatedTasks);

export const TasksRouter = router;
