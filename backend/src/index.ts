import express from "express";
import { json } from "body-parser";
import { AuthRouter } from "./routes/auth";

const app = express();
app.use(json());

// Routes
app.use("/auth", AuthRouter);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
