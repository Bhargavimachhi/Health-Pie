import { createUser , deleteUser , getAllUser , getSingleUser , UpdateUser } from "../controllers/userController.js";
import express from "express";
const app=express.Router();

app.post("/create",createUser);
app.post("/:id/update",UpdateUser);
app.get("/:id/view",getSingleUser);
app.get("/view",getAllUser);
app.get("/:id/remove",deleteUser);

export default app;
