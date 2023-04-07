import { Router } from "express";
import { getUnallocatedTasks } from "../controllers/tasks";

const router = Router();

router.get("/unallocated", getUnallocatedTasks);

export const TasksRouter = router;
