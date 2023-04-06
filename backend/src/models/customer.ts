import { Schema, Model, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Refer: https://mongoosejs.com/docs/typescript/statics.html

export interface ICustomer {
  username: string;
  password: string;
  passwordHash: string;
}

interface ICustomerDocument extends ICustomer, Document {
  generateAuthToken: () => string;
}

interface CustomerModel extends Model<ICustomerDocument> {}

export const CustomerSchema = new Schema<ICustomerDocument, CustomerModel>({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },
});

// hash the password
CustomerSchema.pre("save", function (next) {
  const customer = this;

  if (!customer.isModified("password")) {
    return next();
  }

  bcrypt
    .hash(customer.password, 10)
    .then((hash) => {
      customer.passwordHash = hash;
      next();
    })
    .catch((err) => next(err));
});

// generate auth token
CustomerSchema.methods.generateAuthToken = function () {
  const customer = this;
  const token = jwt.sign(
    { _id: customer._id },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const Customer = model<ICustomerDocument, CustomerModel>(
  "Customer",
  CustomerSchema
);
