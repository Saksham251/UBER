const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const captainSchema = new mongoose.Schema({
    fullname:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,"Name should be at least 3 characters long"],
            maxLength:[50,"Name should not be more than 50 chracters long"]
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "Name should be at least 3 characters long"],
            maxLength: [50, "Name should not be more than 50 characters long"],
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String,
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },

    vehicle:{
        vehicleType:{
            type:String,
            required:true,
            enum:['motorcycle','car','auto']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3, "Plate should be at least 3 characters long"],
        },
        color:{
            type:String,
            required:true,
            minLength:[3, "Color should be at least 3 characters long"],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity should be atleast 1"]
        }
    },

    location:{
        lat:{
            type:String,
        },
        lng:{
            type:String
        }
    }
});

captainSchema.methods.generateAuthToken = function (){
    var token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model("captain",captainSchema);
module.exports = captainModel;
