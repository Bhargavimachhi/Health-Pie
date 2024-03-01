import User from"./../models/source.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


//user registration

export const register=async(req,res)=>{


      // hashing password

      const salt=await bcrypt.genSalt(10);
      const hash=await bcrypt.hash(req.body.password,salt);

      const user=await User.find({email : req.body.email});
      if(user.length==0){
        try {

            const newUser=new User({
                username:req.body.username,
                email:req.body.email,
                role:req.body.role,
                password:hash,
                gender:req.body.gender,
                meals : req.body.meals
    
            });
    
            const data=await newUser.save();
            res.json({ message: "created new user succesfull", data });
            
        } catch (err) {
            console.error(err);
        // res.status(500).json({ error: "Internal Server Error" });
            let code=500;
            let msg="Internal Server Error";
            let description ="";
    
            res.render("../views/error.ejs",{code,msg,description});
        }
      }else{
        let code=404;
            let msg="User Already Exists";
            let description ="the user you are trying to signup already exists";

            res.render("../views/error.ejs",{code,msg,description});
      }
};

//user login
  export const login=async(req,res)=>{

    const email=req.body.email;

    try {
        const user=await User.findOne({email});

        //if user does not exist

        if(!user){
            let code=404;
            let msg="User Not Found";
            let description ="the user you are trying to login doesn't exist";

            res.render("../views/error.ejs",{code,msg,description});
            return;
        }

        //if user exist then compare password or check password

        const checkCorrectPass=await bcrypt.compare(

            req.body.password,
            user.password
        )

        //if password not correct

        if(!checkCorrectPass){
            // res.json({ message: "incorrect password or email" });
            let code=201;
            let msg="Incorrect Email or Password";
            let description ="";

            res.render("../views/error.ejs",{code,msg,description});
            return;
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
        console.error(err);
        let code=500;
        let msg="Internal Server Error";
        let description ="";

        res.render("../views/error.ejs",{code,msg,description});
    }
  }


  