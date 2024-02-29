import { login } from "../controllers/authController.js";
import express from "express";
const app=express();

app.post("/login",login);