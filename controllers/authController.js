import User from"./../models/source.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


//user registration

export const register=async(req,res)=>{


      // hashing password

      const salt=await bcrypt.genSalt(10);
      const hash=await bcrypt.hash(req.body.password,salt);
    try {

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            role:req.body.role,
            password:hash,
            gender:req.body.gender


        });

        const data=await newUser.save();
        res.json({ message: "created new user succesfull", data });
        
    } catch (err) {
        console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
    }
};

//user login
  export const login=async(req,res)=>{

    const email=req.body.email;

    try {
        const user=await User.findOne({email});

        //if user does not exist

        if(!user){

            res.json({ message: "user is not found" });
        }

        //if user exist then compare password or check password

        const checkCorrectPass=await bcrypt.compare(

            req.body.password,
         user.password
        )

        //if password not correct

        if(!checkCorrectPass){
            res.json({ message: "incorrect password or email" });
        }

        const {password,role,...rest}=user._doc;


        //create jwt token
         const payload={Id:user._id,role:user.role};
         const secretKey=process.env.JWT_SECRET_KEY;
         const token=jwt.sign(payload,secretKey,{expiresIn:"15d"})

         //set the token into the browser token and send the response to the client


         res.cookie("accessToken",token,{
            httpOnly:true,
            expires:token.expiresIn,
         })
         .json({ message: "successfully login", token, role, data: { ...rest } });
    } catch (err) {
        res.json({ message: "failed to login" });
    }
  }


  