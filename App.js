import express from "express";
import userRouter from "./routes/User.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import taskRouter from "./routes/Task.js"
import { errorMiddleware } from "./middlewares/Error.js";
import cors from 'cors';

export const app = express();
config({
    path: "./data/config.env.FRONTED_URL"
})


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
app.use(errorMiddleware);