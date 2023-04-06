import { Router } from "express";
import {
  CustomerSignup,
  EmployeeSignup,
  CustomerLogin,
  EmployeeLogin,
} from "../controllers/auth";

const router = Router();

router.post("/customer/signup", CustomerSignup);
router.post("/employee/signup", EmployeeSignup);
router.post("/customer/login", CustomerLogin);
router.post("/employee/login", EmployeeLogin);

export const AuthRouter = router;
