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
    auto:
      baseFare.auto +
      perKmRate.auto * (distanceTime.distance.value / 1000) +
      (perMinuteRate.auto * distanceTime.duration.value) / 60,

    car:
      baseFare.car +
      perKmRate.car * (distanceTime.distance.value / 1000) +
      (perMinuteRate.car * distanceTime.duration.value) / 60,

    moto:
      baseFare.moto +
      perKmRate.moto * (distanceTime.distance.value / 1000) +
      (perMinuteRate.moto * distanceTime.duration.value) / 60,
  };
  return fare;
}


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
    otp:getOTP(6)
  });
  return ride;
};
