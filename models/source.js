import mongoose from "mongoose"

let userSchema=new mongoose.Schema({
    userId:{
     type: String
    },
    username :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    role :{
        type : String,
        required : true,
        enum :[["user","doctor","admin"],"Not Valid Role"],
    },
    password :{
        type : String,
        required : true,
    },
    
    firstName : String,
    lastName : String,
    gender : {
        type : String,
        enum :[["male","female","others"],"Not Valid Gender"],
    },
    location : String,
    dob : Date,
});

const User=mongoose.model("User",userSchema);
module.exports=User;