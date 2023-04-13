import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import "dotenv/config";
import { json, urlencoded } from "body-parser";
import { AuthRouter } from "./routes/auth";
import { connectDB } from "./db/connect";
import { RequestFormRouter } from "./routes/requestForm";
import { TasksRouter } from "./routes/tasks";
import { limiter } from "./middleware/rateLimiter";
import { MulterError } from "multer";
import path from "path";
import fs from "fs";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads/"));

// enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes

app.use("/welcome/api", limiter, (req: Request, res: Response) => {
  res.send(
    "Welcome to the Service Ticketing System API! Refer to the DOCS here: https://documenter.getpostman.com/view/22237577/2s93RZNqMd"
  );
});

app.use("/auth", limiter, AuthRouter);
app.use("/customer", limiter, RequestFormRouter);
app.use("/tasks", limiter, TasksRouter);

// handle multer-specific errors
app.use(
  (err: Error | null, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    } else {
      return res.status(500).json({
        message: "Something went wrong!",
      });
    }
  }
);

const start = async () => {
  try {
    console.log("Connecting to DB...");
    await connectDB(process.env.MONGODB_URI as string);
    console.log("Connected to DB!");

    // create upload directory if it does not exist
    const uploadDir = path.join("uploads/");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
      console.log("Created uploads directory!");
    }

    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is listening on port ${process.env.PORT || 3000}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
