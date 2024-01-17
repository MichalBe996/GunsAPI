const User = require("../models/userModel")




exports.signup = async (req, res, next) => {
    const newUser = await User.create(req.body);
    try {
        res.status(201).json({
            status: "Success",
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err
        })
    }
    
}