import { connect } from "mongoose";

export const connectDB = (url: string) => {
  return connect(url);
};
