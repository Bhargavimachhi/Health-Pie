import jwt from "jsonwebtoken"


export const verifyToken=async(req,res,next)=>{


    const token=req.cookies.accessToken;
    console.loog(token)

    if(!token){
        return res.json({

            message:"Unauthorized"
        })
    }

    //if token exist then verify token

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{


        if(err){
            console.log(err);
            return res.json({message:"token is invalid"});
        }

        req.user=user;
        next()
    })
}




//verifyUser


export const verifyUser=(req,res,next)=>{

    verifyToken(req,res,next,()=>{

        if (req.user.id === req.params.id || req.user.role === "user") {
            next();
          } else {
            return res.json({ message: "you are not authenticated!" });
          }
    })
}

//verifyDoctor

export const verifyDoctor=(req,res,next)=>{

    verifyToken(req,res,next,()=>{

        if ( req.user.role === "Doctor") {
            next();
          } else {
            return res.json({ message: "you are not authorized!" });
          }
    })
}

//verifyAdmin

export const verifyAdmin=(req,res,next)=>{

    verifyToken(req,res,next,()=>{

        if ( req.user.role === "Admin") {
            next();
          } else {
            return res.json({ message: "you are not authorized" });
          }
    })
}