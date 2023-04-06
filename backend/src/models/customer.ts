import { Schema } from "mongoose";

export const Customer = new Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});
