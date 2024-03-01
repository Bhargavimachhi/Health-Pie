import User from "../models/source.js"

//create user

export const createUser=async(req,res)=>{

    try {

        //create new document using model and the request body
        let user=await User.find({email : req.body.email});

        if(!user){
            const newUser=new User(req.body);

            //save the newuser data to the database

            const data=await newUser.save();
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

//update user

export const UpdateUser=async(req,res)=>{
    const id=req.params.id

    try {

        //create new document using model and the request body and fire update query

    

        const updateUse=await User.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true});

        const data=await updateUse.save();
        //respond with success message
        res.status(201).json({message:"update user created successfully",data})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}

//get single user

export const getSingleUser=async(req,res)=>{
    const id=req.params.id

    try {

        //create new document using model and the request body and fire update query

    

        const getUser=await User.findById(id);

        
        //respond with success message
        res.status(201).json({message:"success",getUser})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}

//delete user

export const deleteUser=async(req,res)=>{
    const id=req.params.id

    try {

        
    

        const deleteUser=await User.findByIdAndDelete(id);

        
        //respond with success message
        res.status(201).json({message:"success",deleteUser})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}

//get all user
export const getAllUser=async(req,res)=>{
    

    try {

        

    

        const allUser=await User.find({});

        
        //respond with success message
        res.status(201).json({message:"success",allUser})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}



