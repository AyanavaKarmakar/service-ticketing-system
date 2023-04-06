import { Schema, Model, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Refer: https://mongoosejs.com/docs/typescript/statics.html

interface IEmployee {
  username: string;
  password: string;
}

interface IEmployeeDocument extends IEmployee, Document {
  generateAuthToken: () => string;
}

interface EmployeeModel extends Model<IEmployeeDocument> {}

export const EmployeeSchema = new Schema<IEmployeeDocument, EmployeeModel>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hash the password before saving to the database
EmployeeSchema.pre("save", function (next) {
  const employee = this as IEmployeeDocument;

  if (!employee.isModified("password")) {
    return next();
  }

  bcrypt
    .hash(employee.password, 10)
    .then((hash) => {
      employee.password = hash;
      next();
    })
    .catch((err) => next(err));
});

// generate auth token
EmployeeSchema.methods.generateAuthToken = function () {
  const employee = this;
  const token = jwt.sign(
    { _id: employee._id },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const Employee = model<IEmployeeDocument, EmployeeModel>(
  "Employee",
  EmployeeSchema
);
