const rideService = require("../services/ride.service");
const {validationResult} = require("express-validator");

module.exports.createRide = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }
    try {
        const {pickup,destination,vehicleType} = req.body;
        const ride = await rideService.createRide({pickup,destination,vehicleType,user:req.user._id});
        return res.status(200).json({
            ride
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }

}