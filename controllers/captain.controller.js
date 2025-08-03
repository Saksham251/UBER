const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.registerCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const { fullname: { firstName, lastName }, email, password,vehicle:{color,plate,vehicleType,capacity} } = req.body;
    console.log("Request body:", req.body);
    
    const hashedPassword = await captainModel.hashPassword(password);
    const isAlreadyCaptainExist = await captainModel.findOne({email});

    if(isAlreadyCaptainExist){
      return res.status(400).json({message:"Captain already exists."});
    } 

    const captain = await captainService.createCaptain({
      fullname: {
        firstName,
        lastName,
      },
      email,
      password: hashedPassword,
      vehicle:{
        color,
        plate,
        vehicleType,
        capacity
      }
    });

    const token = captain.generateAuthToken();
    
    res.status(201).json({ token, captain });
    

  } catch (err) {
    console.error("Error registering captain:", err);
    res.status(500).json({ message: "Server error" });
  }
}




module.exports.loginCaptain  = async (req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
      return res.status(401).json({message:"Invalid email or password"});
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid email or password"});
    }

    const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(201).json({ token, captain });
  }
  catch (error) {
    console.error("Error while logging captain", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports.getCaptainProfile = async (req,res,next)=>{
  return res.status(200).json({captain:req.captain});
}


module.exports.logoutCaptain = async (req,res,next)=>{
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  res.clearCookie('token');
  await blackListTokenModel.create({token});
  res.status(200).json({message:"Logged out"});
}