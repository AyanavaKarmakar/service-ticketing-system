import express from "express";
import "dotenv/config";
import { json } from "body-parser";
import { AuthRouter } from "./routes/auth";
import { connectDB } from "./db/connect";

const app = express();
app.use(json());

// Routes
app.use("/auth", AuthRouter);

const start = async () => {
  try {
    console.log("Connecting to DB...");
    await connectDB(process.env.MONGODB_URI as string);
    console.log("Connected to DB!");

    app.listen(3000, () => {
      console.log("server is listening on port 3000!");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
