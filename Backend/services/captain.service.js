const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({email, password, fullname,vehicle})=>{
    if (!fullname?.firstName || !fullname?.lastName || !email || !password || !vehicle?.capacity || !vehicle?.color || !vehicle?.plate || !vehicle?.vehicleType) {
        throw new Error("All fields are required");
    }
    const captain = await captainModel.create({
        fullname: {
            firstName: fullname.firstName,
            lastName: fullname.lastName,
        },
        email,
        password,
        vehicle:{
            color:vehicle.color,
            capacity:vehicle.capacity,
            plate:vehicle.plate,
            vehicleType:vehicle.vehicleType
        }
    });

    return captain;
}