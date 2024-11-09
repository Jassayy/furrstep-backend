import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
     cors({
          origin: process.env.CORS_ORIGIN, // Your Netlify URL
          credentials: true, // Important! Allows cookies
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
     })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

import petRoutes from "./routes/pet.routes.js";
app.use("/api/v1/pets", petRoutes);

import activityRoutes from "./routes/activity.routes.js";
app.use("/api/v1/activities", activityRoutes);

import goalRoutes from "./routes/goal.routes.js";
app.use("/api/v1/goals", goalRoutes);

export { app };
