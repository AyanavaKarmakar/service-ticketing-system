import { ICustomer } from "../models/customer";

declare global {
  namespace Express {
    interface Request {
      customer?: ICustomer;
      token?: string;
    }
  }
}
