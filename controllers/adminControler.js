import Admin from "./../models/admin.js"

export const getAdmin=async(req,res)=>{
    const id=req.params.id

    try {

        //create new document using model and the request body and fire update query

    

        const getUser=await Admin.findById(id);

        
        //respond with success message
        res.status(201).json({message:"success",getUser})
    } catch (err) {
        
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }


}