const { promisify } = require("util")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/appError")



const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}




exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
    });
    const token = signToken(newUser._id)

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

exports.login =  async (req, res, next) => {
    
        // getting the variables from the body object
    const {email, password} = req.body;

    // 1) Check if email and passwords exists
    if(!email || !password){
        return next(new AppError("Please provide email and password!", 400))
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password")
    
    
    if(!user || !(await user.correctPassword(password, user.password)) ){
        res.status(401).json({
            status: "Fail",
            msg: "Wrong email or password"
        })
    }

    // 3) If everything ok, send token to client
    const token = signToken(user._id)
        res.status(200).json({
            status: "success",
            token
        })
    
    
     
    }      
    

exports.protect = async (req, res, next) => {
    let token;
    // 1) Getting the token and checking if it's there
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        
    }
    
    if(!token){
        return next(new AppError("You are not logged in! Please login to gain access", 401))
    }
    // 2) Verificating the token (using built-in node promisify function)
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log(decoded)
    


    // 3) Check if user still exists 
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError("The User belonging to this token does no longer exist!", 401))
    }


    // 4) Check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError("User recently changed password, please login again!", 401))
    }



    // grant access to protected route
    req.user = currentUser;
    next();
}


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError("You do not have permission to perform this action!", 403))
        }
        next();
    }
}

