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

app.get("/patie")

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
    res.sendFile("mymeals.html",{root : "views"});
})

app.post("/mymeals/view",(req,res)=>{
    let q=`https://api.spoonacular.com/recipes/findByNutrients?`;
    for (const [key, value] of Object.entries(req.body)) {
        if(value=== '' || value===' ' || value==null || value==undefined){
            continue;
        }
        q+=`${key}=${value}&`;
    }
    q+=`apiKey=70e5bc4a77d24acd97246d0b2745be70`;
    fetch(`${q}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(userData => {
        res.render("mymeals.ejs",{userData});
    })
    .catch(error => {
        let code=201;
        let msg="No Food Available";
        let description="";

        res.render("error.ejs",{code,msg,description});
    });
});

app.get("/mymeals/:id/view",(req,res)=>{
    let {id}=req.params;
    let q=`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=70e5bc4a77d24acd97246d0b2745be70`;
    // console.log(q);
    fetch(`${q}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let bad=data.bad;
        let good=data.good;
        // let image=data
        console.log(good,bad);
        res.render("viewMeal.ejs",{bad , good});
    })
    .catch(error => {
        let code=201;
        let msg="No Food Available";
        let description="";

        res.render("error.ejs",{code,msg,description});
    });
})