import express from "express";
import path from "path";
import methodOverride from "method-override";
import mongoose from "mongoose";
const port=8000;
const app=express();

import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import loginRoute from "./routes/login.js";
import signupRoute from "./routes/signup.js";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended :true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use("/user",userRoute);
app.use("/doc",doctorRoute);
app.use("/signup",signupRoute);
app.use("/login",loginRoute);

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/healthPie");
}

main().then(()=>{
    console.log("MongoDB connection successfull");
}).catch((err)=>{
    console.log("Failure");
});

app.listen(port,()=>{
    console.log("Server Started");
});