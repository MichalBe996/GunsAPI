const crypto = require("crypto")
const { promisify } = require("util")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/appError")
const sendEmail = require("../utils/email.js")



const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createAndSendToken = (user, statusCodeSuccess, statusCodeError, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: false
    }
    try {
        const token = signToken(user._id)
        if(process.env.NODE_ENV === "production"){
            cookieOptions.secure = true;
        }
        res.cookie("jwt", token, cookieOptions)
        // remove the password from the output
        user.password = undefined;
        res.status(statusCodeSuccess).json({
        status: "Success",
        token,
        data: {
            user
        }
    })
    } catch (error) {
        res.status(statusCodeError).json({
            status: "Fail",
            message: error

        })
    }
    
}

exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
    });
    createAndSendToken(newUser, 201, 400, res)

    
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
    createAndSendToken(user, 201, 400, res)
    
    
     
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


exports.forgotPassword =  async (req, res, next) =>{
    //1) Get user based on posted email
    
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return next(new AppError("There is no user with given e-mail adress", 404))
        }
        


    //2) Generate random token
        try {
            const resetToken = user.createPasswordResetToken()
            await user.save({validateBeforeSave: false});
            const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
    
            const message = `Forgot your password? Submit your PATCH request with your new password and passwordConfirm to ${resetURL}.\nIf you didn't
            forget your password, please ignore this e-mail!`
            
                await sendEmail({
                    email: user.email,
                    subject: "Your password reset token (valid for 10 minutes)",
                    message: message
                })
        
            res.status(200).json({
                status: "success",
                message: "Token sent to email!"
            })
        }catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false})
        return next(new AppError("There was an error sending an email, try again later."), 500)
        
        }}
        
        
     
exports.resetPassword = async (req, res, next) => {
        //1) Get user based on a token
        const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
        try{
            const user = await User.findOne({
                passwordResetToken: hashedToken, 
                passwordResetExpires: {$gt: Date.now()}})
                //2) If token has not expired and user exists, set the new password
                if(!user){
                    return next(new AppError("Token is invalid or has expired"), 400)
                }
                user.password = req.body.password;
                user.passwordConfirm = req.body.passwordConfirm;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                await user.save();
                //4) Log in the user, send JWT
                createAndSendToken(user, 201, 400, res)

        }catch(err){
            console.log(err)
        }
        

}

exports.updatePassword = async (req, res, next) => {
    //1) Get the user from the colleciton
    // you can't update the password by User.findByIdAndUpdate because the new password wouldn't get encrypted
    const user = await User.findById(req.user.id).select("+password")
        
    //2) Check if the posted password is correct
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))){
        return next(new AppError("Your current password is wrong!"), 401)
    }
    //3) If so, update the password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save()



    //4) Log the user in, send JWT
    createAndSendToken(user, 201, 400, res)
}

