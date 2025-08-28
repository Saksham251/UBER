const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const blackListTokenModel = require("../models/blackListToken.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


// User AuthMiddleware
module.exports.authUser = async (req,res,next)=>{
    console.log("req.headers.authorization:", req.headers.authorization);
    console.log("req.cookies.token:", req.cookies?.token);
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlackListed = await blackListTokenModel.findOne({token:token});
    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized"});
        }
        const user = await userModel.findById(decoded._id);

        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.user = user;
        return next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized"});
    }
}



// Captain AuthMiddleware
module.exports.authCaptain = async (req,res,next)=>{
    console.log("req.headers.authorization:", req.headers.authorization);
    console.log("req.cookies.token:", req.cookies?.captainToken);
    
    const token = req.cookies.captainToken || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlackListed = await blackListTokenModel.findOne({captainToken:token});
    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized"});
        }

        const captain = await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(401).json({message:"Unauthorized"});
        }
        
        req.captain = captain;
        return next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized"});
    }
}