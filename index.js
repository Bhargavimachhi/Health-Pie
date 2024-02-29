const express=require("express");
const path=require("path");
const methodOverride=require("method-override");
const mongoose=require("mongoose");
const app=express();
const port=8000;
const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2/by-uri',
    params: {
      type: 'public',
      beta: 'true',
      'field[0]': 'uri'
    },
    headers: {
      'Accept-Language': 'en',
      'X-RapidAPI-Key': '62bc98c16fmsh4a02d2911afd72bp18ceb3jsnf683fc36b992',
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended :true}));
app.use(express.json());
app.use(methodOverride('_method'));

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(()=>{
    console.log("MongoDB connection successfull");
}).catch((err)=>{
    console.log("Failure");
});

app.listen(port,()=>{
    console.log("Server Started");
});

app.get("/",(req,res)=>{
    res.sendFile("index.html",{root :"views"});
});

app.get("/login",(req,res)=>{
    console.log("login get");
    res.sendFile("login.html",{root :"views"});
});

app.get("/signup",(req,res)=>{
    console.log("sign up get");
    res.sendFile("signup.html",{root :"views"});
});

app.post("/login",(req,res)=>{
    console.log("login post");
    let {email,password}=req.body;
    console.log(email,password);
});

app.post("/signup",(req,res)=>{
    console.log("sign up post");
    // let {email,password}=req.body;
    console.log(req.body);
    res.send(req.body);
});

app.get("/home",(req,res)=>{
    res.sendFile("patientDashboard.html",{root :"views"});
});