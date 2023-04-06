import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Customer = new Schema({
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
Customer.pre("save", function (next) {
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
Customer.methods.generateAuthToken = function () {
  const customer = this;
  const token = jwt.sign(
    { _id: customer._id },
    process.env.JWT_SECRET as string
  );
  return token;
};
