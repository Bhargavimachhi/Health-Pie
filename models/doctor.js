import mongoose from "mongoose";

const doctorSchema= new mongoose.Schema({

    userId: {
        type: String
        
      },
      userEmail: {
        type: String,
        
      },
    
      fullName: {
        type: String,
        required: true,
      },
      
      phone:{
          type:Number,
          required:true
      },
      document:{
        type:File
      },
      clinic:{
        type:String,
        required:true
      },
      designation:{
        type:String,
        required:true
      },
      experience:{
        type:String,
        required:true
      },
      type:{
        type:String,
        required:true
      },
      speciality:{
        type:String,
        requred:true
      }
    },
    { timestamps: true }


)

export default mongoose.model("Doctor", doctorSchema);