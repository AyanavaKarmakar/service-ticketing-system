import { Router } from "express";
import { requestForm } from "../controllers/requestForm";
import { customerAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post("/requestForm", customerAuthMiddleware, requestForm);

export const RequestFormRouter = router;
