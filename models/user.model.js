const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
    {
        fullname: {
            firstName: {
            type: String,
            required: true,
            minLength: [3, "Name should be at least 3 characters long"],
            maxLength: [50, "Name should not be more than 50 characters long"],
            },
            lastName: {
                type: String,
                required: true,
                minLength: [3, "Name should be at least 3 characters long"],
                maxLength: [50, "Name should not be more than 50 characters long"],
            },
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
        }
    },
);

userSchema.methods.generateAuthToken = function () {
    var token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET,{expiresIn:'24h'}
    );
    return token;
};
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
