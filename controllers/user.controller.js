const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname: { firstName, lastName }, email, password } = req.body;
    console.log("Request body:", req.body);
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      fullname: {
        firstName,
        lastName,
      },
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
    

  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginUser  = async (req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
      return res.status(401).json({message:"Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid email or password"});
    }

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  }
  catch (error) {
    console.error("Error while logging user", error);
    res.status(500).json({ message: "Server error" });
  }
};