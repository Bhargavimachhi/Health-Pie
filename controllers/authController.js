import User from"./../models/source.js"
import Doctor from "./../models/doctor.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


//user registration

export const register=async(req,res)=>{


      // hashing password

      const salt=await bcrypt.genSalt(10);
      const hash=await bcrypt.hash(req.body.password,salt);
        const role=req.body.role;
        let user=[];
        let newUser;
        if(role==='User'){
            user=await User.find({email : req.body.email});
            newUser=new User({
                username:req.body.username,
                email:req.body.email,
                role:req.body.role,
                password:hash,
                gender:req.body.gender
            });
        }
        else{
            user=await Doctor.find({email : req.body.email});
            newUser=new Doctor({
                username:req.body.username,
                email:req.body.email,
                role:req.body.role,
                password:hash,
                experience:req.body.experience,
                location : req.body.location,
                speciality:req.body.speciality,
                language : req.body.language,
                contact : req.body.path,
                appoinments : req.body.appoinments
            });
        }
      if(user.length==0){
        try {
            const data=await newUser.save();
            res.sendFile("index.html",{root : "views"});
            
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
    const role=req.body.role;
    const user=await User.findOne({email});
    const doctor=await Doctor.findOne({email});
    console.log(user,doctor);
    if(user==null && doctor==null){
        let code=404;
        let msg="User Not Found";
        let description ="the user you are trying to login doesn't exist";

        res.render("../views/error.ejs",{code,msg,description});
        return;
    }
    else if(user==null){

        if(role==='User'){
            let code=200;
            let msg="Invalid Input";
            let description ="";
    
            res.render("../views/error.ejs",{code,msg,description});
            return;
        }
        try {

            //if user exist then compare password or check password
    
            const checkCorrectPass=await bcrypt.compare(
    
                req.body.password,
                doctor.password
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
    
            const {password,role,...rest}=doctor._doc;
    
    
            //create jwt token
             const payload={Id:doctor._id,role:doctor.role};
             const secretKey=process.env.JWT_SECRET_KEY;
             const token=jwt.sign(payload,secretKey,{expiresIn:"15d"})
    
             //set the token into the browser token and send the response to the client
            
    
            //  res.cookie("accessToken",token,{
            //     httpOnly:true,
            //     expires:token.expiresIn,
            //  })
            //  .json({ message: "successfully login", token, role, data: { ...rest } });

            res.render("doctorDash.ejs",{data : doctor});
            } catch (err) {
                console.error(err);
                let code=500;
                let msg="Internal Server Error";
                let description ="";
        
                res.render("../views/error.ejs",{code,msg,description});
            }
        }
        else if(doctor==null){

            if(role==='Doctor'){
                let code=200;
                let msg="Invalid Input";
                let description ="";
        
                res.render("../views/error.ejs",{code,msg,description});
                return;
            }
            try {

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
            
             res.sendFile("patientDashboard.html",{root : "views"});
    
            } catch (err) {
                console.error(err);
                let code=500;
                let msg="Internal Server Error";
                let description ="";
        
                res.render("../views/error.ejs",{code,msg,description});
            }
        }
        else if(user!=null && doctor!=null){
            let code=500;
                let msg="User Exist as Both user and ddoctor";
                let description ="Your account is terminated for breaking rules";
        
                res.render("../views/error.ejs",{code,msg,description});
        }
        else{
            let code=500;
                let msg="Internal Server Error";
                let description ="";
        
                res.render("../views/error.ejs",{code,msg,description});
        }
  }


  