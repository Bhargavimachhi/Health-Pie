import mongoose from "mongoose";

const appSchema= new mongoose.Schema({

    userId: {
        type: String
        
      },
      
      fullName: {
        type: String,
        required: true,
      },
      
      phone:{
          type:Number,
          required:true
      },
      
      
      text:{
        type:String,
        requred:true
      }
    },
    { timestamps: true }


)

export default mongoose.model("appointment", appSchema);