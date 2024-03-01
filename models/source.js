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
    },
    password :{
        type : String,
        required : true,
    },
    
    firstName : String,
    lastName : String,
    gender : {
        type : String,
    },
    location : String,
    dob : Date,

    meals : [{
        id : String,
        name : String,
    }]
});

// const User=mongoose.model("User",userSchema);
// module.exports=User;
export default mongoose.model("User", userSchema);