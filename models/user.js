const mongoose=require("mongoose");

let userSchema=new mongoose.Schema({
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
    }
});

const User=mongoose.model("User",userSchema);
module.exports=User;