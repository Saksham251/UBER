const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { sendMessagesToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;

    const ride = await rideService.createRide({
      pickup,
      destination,
      vehicleType,
      user: req.user._id,
    });
    res.status(201).json({
      ride,
    });

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

    console.log(pickupCoordinates);

    const captainsInTheRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.lng,
      pickupCoordinates.lat,
      10
    );
    ride.otp = "";
    
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");


    captainsInTheRadius.map((captain) => {
      console.log(captain, ride);
      sendMessagesToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
    return;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { pickup, destination } = req.query;
    const fare = await rideService.getFare(pickup, destination);
    console.log(fare);

    return res.status(200).json({
      fare,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId } = req.body;
    const ride = await rideService.confirmRide({
      rideId,
      captainId: req.captain._id,
    });

    // Notify user via socket
    sendMessagesToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (error) {
    console.error("Confirm ride error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


module.exports.startRide = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { rideId,otp} = req.query;
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    // Notify user via socket
    sendMessagesToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (error) {
    console.error("Error in starting the ride:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.endRide = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    const {rideId} = req.body;
    const ride = await rideService.endRide({rideId,captain:req.captain});
    sendMessagesToSocketId(ride.user.socketId,{
      event:"ride-ended",
      data:ride
    });
    return res.status(200).json({
      ride
    });
  }
  catch(error){
    console.error("Error in starting the ride:", error.message);
    return res.status(500).json({ message: error.message });
  }
}