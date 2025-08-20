const {validationResult} = require("express-validator");
const rideService = require("../services/ride.service");

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


module.exports.getFare = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }
    try {
        const {pickup,destination} = req.query;
        const fare = await rideService.getFare(pickup,destination);    
        console.log(fare);
    
        return res.status(200).json({
            fare
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}