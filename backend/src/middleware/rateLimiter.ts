import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  // 15 minutes
  windowMs: 15 * 60 * 1000,

  // limit each IP to 100 requests per windowMs
  max: 100,

  message: "Too many requests from this IP, please try again after 15 minutes",
});
