import express from "express";
import path from "path";
import methodOverride from "method-override";
import mongoose from "mongoose";
import dotenv from "dotenv";
const port=8000;
const app=express();

import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import loginRoute from "./routes/login.js";
import signupRoute from "./routes/signup.js";
import cookieParser from "cookie-parser";


dotenv.config();
app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"/views"));

// app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended :true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

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

app.get("/public/style.css", function(req, res) {
    res.sendFile("style.css",{root : "public"});
});

app.get("/",(req,res)=>{
    res.sendFile("index.html",{root :  "views"});
})

app.get("/login",(req,res)=>{
    res.sendFile("login.html",{root : "views"});
});

app.get("/signup",(req,res)=>{
    res.sendFile("signup.html",{root : "views"});
});

app.get("/mymeals",(req,res)=>{
    res.render("mymeals.ejs");
})

app.post("/mymeals",(req,res)=>{
    let {minProtein,maxProtein,minVitaminA,maxVitaminA,minVitaminC,maxVitaminC,minVitaminE,maxVitaminE,minVitaminB12,maxVitaminB12,minCarbs,
        maxCarbs,minFat,maxFat,minFiber,maxFiber}=req.body;
    let data=[{'minProtein':minProtein},{'maxProtein':maxProtein},{'maxProtein':minVitaminA},{'maxVitaminA':maxVitaminA},{'minVitaminC':minVitaminC},
        {'maxVitaminC':maxVitaminC},{'minVitaminE':minVitaminE},{'maxVitaminE':maxVitaminE},{'minVitaminB12':minVitaminB12},{'maxVitaminB12':maxVitaminB12},
        {'minCarbs':minCarbs},{'maxCarbs':maxCarbs},{'minFat':minFat},{'maxFat':maxFat},{'minFiber':minFiber},{'maxFiber':maxFiber}];

    let q=`https://api.spoonacular.com/recipes/findByNutrients?`;
    for(let obj of data){
        console.log(obj);
    }

})