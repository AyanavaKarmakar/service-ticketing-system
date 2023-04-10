import { Router } from "express";
import {
  CustomerSignup,
  EmployeeSignup,
  CustomerLogin,
  EmployeeLogin,
  GetAllEmployees,
} from "../controllers/auth";
import { adminAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post("/customer/signup", CustomerSignup);
router.post("/employee/signup", EmployeeSignup);
router.post("/customer/login", CustomerLogin);
router.post("/employee/login", EmployeeLogin);

router.get("/allemployees", adminAuthMiddleware, GetAllEmployees);

export const AuthRouter = router;
