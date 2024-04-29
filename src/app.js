import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables
dotenv.config();

const app = express()

export const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;