import Doctor from "./../models/doctor.js"


//create doctor
export const createDoctor=async(req,res)=>{

    try {

        //create new document using model and the request body

        let user=await Doctor.find({email : req.body.email});

        if(!user){
            const newDoctor=new Doctor(req.body);

            //save the newuser data to the database

            const data=await newDoctor.save();
            //respond with success message
            res.status(201).json({message:"new user created successfully",data});
        }
        else{
            res.status(500).json({message:"User Exists"});
        }
        
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }



}

//update Doctor

export const UpdateDoctor=async(req,res)=>{
    const id=req.params.id

    try {

        //create new document using model and the request body and fire update query

    

        const updateDoctor=await Doctor.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true});

        const data=await updateDoctor.save();
        //respond with success message
        res.status(201).json({message:"update user created successfully",data})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}

//get single doctor

export const getSingleDoctor=async(req,res)=>{
    const id=req.params.id

    try {

        //create new document using model and the request body and fire update query

    

        const getDoctor=await Doctor.findById(id);

        
        //respond with success message
        res.status(201).json({message:"success",getDoctor})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}

//delete user

export const deleteDoctor=async(req,res)=>{
    const id=req.params.id

    try {

        
    

        const deletedoctor=await Doctor.findByIdAndDelete(id);

        
        //respond with success message
        res.status(201).json({message:"success",deletedoctor})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}

//get all user
export const getAllDoctor=async(req,res)=>{
    

    try {

        

    

        const allDoctor=await Doctor.find({});

        
        //respond with success message
        res.status(201).json({message:"success",allDoctor})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}