const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination both are required fields");
  }
  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };
  const perMinuteRate = {
    auto: 3,
    car: 5,
    moto: 2,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 6,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        perKmRate.auto * (distanceTime.distance.value / 1000) +
        (perMinuteRate.auto * distanceTime.duration.value) / 60
    ),

    car: Math.round(
      baseFare.car +
        perKmRate.car * (distanceTime.distance.value / 1000) +
        (perMinuteRate.car * distanceTime.duration.value) / 60
    ),

    moto: Math.round(
      baseFare.moto +
        perKmRate.moto * (distanceTime.distance.value / 1000) +
        (perMinuteRate.moto * distanceTime.duration.value) / 60
    ),
  };

  return fare;
}

module.exports.getFare = getFare;

function getOTP(num) {
  const min = 10 ** (num - 1);
  const max = 10 ** num;
  return crypto.randomInt(min, max).toString().padStart(num, "0");
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!pickup || !destination || !user || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: getOTP(6),
  });
  return ride;
};
module.exports.confirmRide = async ({ rideId, captainId }) => {
  if (!rideId || !captainId) {
    throw new Error("All fields are required");
  }

  const ride = await rideModel
    .findOneAndUpdate(
      { _id: rideId },
      { status: "accepted", captain: captainId },
      { new: true } 
    )
    .populate("user")
    .populate("captain")
    .select('+otp');
    ;

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};
module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.otp !== otp) {
    throw new Error("OTP is invalid");
  }
  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }
  const updatedRide = await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "ongoing" },
    { new: true } 
  )
    .populate("user")
    .populate("captain");

  return updatedRide;
};

module.exports.endRide = async ({rideId,captain})=>{
  if(!rideId){
    throw new Error("Ride id is required");
  }
  const ride = await rideModel.findOne({
    _id:rideId,
    captain:captain._id
  }).populate("user").populate("captain").select("+otp");

  if(!ride){
    throw new Error ("Ride not found");
  }
  if(ride.status!="ongoing"){
    throw new Error("Ride not ongoing");
  }
  await rideModel.findOneAndUpdate({_id:rideId},{
    status:"Completed"
  });
  return ride;
}