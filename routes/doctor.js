import express from "express";
import { createDoctor , UpdateDoctor , getAllDoctor , getSingleDoctor , deleteDoctor } from "../controllers/docController.js";
const app=express.Router();

app.post("/create",createDoctor);
app.post("/:id/update",UpdateDoctor);
app.get("/view",getAllDoctor);
app.get("/:id/view",getSingleDoctor);
app.get("/:id/remove",deleteDoctor);

export default app;
