const mongoose=require("mongoose");

let docSchema=new mongoose.Schema({
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
});

const Doctor=mongoose.model("Doctor",docSchema);
module.exports=Doctor;