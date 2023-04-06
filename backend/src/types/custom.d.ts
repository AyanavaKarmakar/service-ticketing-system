import { ICustomer } from "../models/customer";
import { IEmployee } from "../models/employee";

declare global {
  namespace Express {
    interface Request {
      employee?: IEmployee;
      customer?: ICustomer;
      token?: string;
    }
  }
}
