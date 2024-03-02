import mongoose from "mongoose";

const doctorSchema= new mongoose.Schema({

      id: {
        type: String
        
      },
      email: {
        type: String,
        required : true,
      },
    
      username: {
        type: String,
        required: true,
      },
      
      contact:{
          type:String,
      },
      document:{
        data: Buffer, 
        contentType: String,
      },
      experience:{
        type:String,
        required:true
      },
      speciality:{
        type:String,
        requred:true
      },
      password:{
        type : String,
        required : true
      },
      language :{
        type : String,
        required : true
      }
    },
    { timestamps: true }


)

export default mongoose.model("Doctor", doctorSchema);
