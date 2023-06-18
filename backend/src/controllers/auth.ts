import type { Request, Response } from "express";
import { Customer } from "../models/customer";
import bycrypt from "bcrypt";
import { Employee } from "../models/employee";

// POST /auth/customer/signup
export const CustomerSignup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // handle admin login with "customer" user type
    if (username === "employee1") {
      return res.status(403).json({ error: "invalid usertype" });
    }

    // handle existing customer
    const isExistingCustomer = await Customer.findOne({ username });
    if (isExistingCustomer) {
      return res.status(400).json({ error: "username already exists" });
    }

    // create new customer
    const customer = new Customer({ username, password });
    await customer.save();
    const token = customer.generateAuthToken();
    return res.status(200).json({
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// POST /auth/customer/login
export const CustomerLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // handle non-existing customer & invalid account type
    const customer = await Customer.findOne({ username });
    if (!customer || customer.userType !== "customer") {
      return res.status(400).json({ error: "invalid username or password" });
    }

    // check password
    const passwordMatch = await bycrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "invalid username or password" });
    }

    // generate & return token
    const token = customer.generateAuthToken();
    return res.status(200).json({
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// POST /auth/employee/signup
export const EmployeeSignup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // handle existing employee
    const isExistingEmployee = await Employee.findOne({ username });
    if (isExistingEmployee) {
      return res.status(400).json({ error: "username already exists" });
    }

    // create new employee
    const employee = new Employee({ username, password });
    await employee.save();
    const token = employee.generateAuthToken();
    return res.status(200).json({
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// POST /auth/employee/login
export const EmployeeLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // handle non-existing employee & invalid account type
    const employee = await Employee.findOne({ username });
    if (!employee || employee.userType !== "employee") {
      return res.status(400).json({ error: "invalid username or password" });
    }

    // check password
    const passwordMatch = await bycrypt.compare(password, employee.password);
    if (!passwordMatch) {
      res.status(400).json({ error: "invalid username or password" });
    }

    // generate & return token
    const token = employee.generateAuthToken();
    return res.status(200).json({
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// GET /auth/allemployees
export const GetAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({ employees });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
