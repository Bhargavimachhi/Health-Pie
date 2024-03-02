import { register } from "../controllers/authController.js";
import express from "express";
const app=express.Router();

app.post("/create",register);

export default app;