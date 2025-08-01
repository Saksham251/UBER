const userModel = require("../models/user.model");

module.exports.createUser = async ({ email, password, fullname }) => {
    if (!fullname?.firstName || !fullname?.lastName || !email || !password) {
        throw new Error("All fields are required");
    }

    const user = await userModel.create({
        fullname: {
            firstName: fullname.firstName,
            lastName: fullname.lastName,
        },
        email,
        password,
    });

    return user;
};
