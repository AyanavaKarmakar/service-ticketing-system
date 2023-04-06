import { Router } from "express";
import { requestForm } from "../controllers/requestForm";

const router = Router();

router.post("/requestForm", requestForm);

export const RequestFormRouter = router;
