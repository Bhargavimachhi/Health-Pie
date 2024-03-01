import mongoose from "mongoose";

const doctorSchema= new mongoose.Schema({

      id: {
        type: String
        
      },
      email: {
        type: String,
        required : true,
      },
    
      name: {
        type: String,
        required: true,
      },
      
      phone:{
          type:Number,
          required:true
      },
      document:{
        data: Buffer, 
        contentType: String
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
      speciality:{
        type:String,
        requred:true
      },
      password:{
        type : String,
        required : true
      },
    },
    { timestamps: true }


)

export default mongoose.model("Doctor", doctorSchema);
