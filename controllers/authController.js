const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/appError")




exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    try {
        res.status(201).json({
            status: "Success",
            token,
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

exports.login = (req, res, next) => {
    // getting the variables from the body object
    const {email, password} = req.body;

    // 1) Check if email and passwords exists
    if(!email || !password){
        return next(new AppError("Please provide email and password!", 400))
    }

    // 2) Check if user exists && password is correct
    const user = User.findOne({ email });

    // 3) If everything ok, send token to client
    const token = "";
    res.status(200).json({
        status: "success",
        token
    })
}