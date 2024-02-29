import express from "express";
import { createDoctor , UpdateDoctor , getAllDoctor , getSingleDoctor , deleteDoctor} from "../controllers/docController.js";
const app=express();

app.post("/doc/create",createDoctor);
app.post("/doc/:id/update",UpdateDoctor);
app.get("/doc/view",getAllDoctor);
app.get("/doc/:id/view",getSingleDoctor);
app.get("/doc/:id/remove",deleteDoctor);
