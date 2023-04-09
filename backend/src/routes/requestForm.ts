import { getCustomerRequestFormById } from "./../controllers/requestForm";
import { Router } from "express";
import {
  getCustomerRequestForms,
  requestForm,
} from "../controllers/requestForm";
import { customerAuthMiddleware } from "../middleware/auth";
import { upload } from "../middleware/multer";

const router = Router();

router.get(
  "/requestform/:id",
  customerAuthMiddleware,
  getCustomerRequestFormById
);
router.get("/requestform", customerAuthMiddleware, getCustomerRequestForms);
router.post("/requestform", customerAuthMiddleware, upload, requestForm);

export const RequestFormRouter = router;
