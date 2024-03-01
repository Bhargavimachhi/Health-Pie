import { register } from "../controllers/authController.js";
import express from "express";
const app=express.Router();

app.post("/",register);

export default app;