import { createUser , deleteUser , getAllUser , getSingleUser , UpdateUser } from "../controllers/userController.js";
import express from "express";
const app=express();

app.post("/user/create",createUser);
app.post("/user/:id/update",UpdateUser);
app.get("/user/:id/view",getSingleUser);
app.get("/user/view",getAllUser);
app.get("/user/:id/remove",deleteUser);
