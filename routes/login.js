import { login } from "../controllers/authController.js";
import express from "express";
const app=express.Router();

app.post("/",login);

export default app;
