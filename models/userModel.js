const mongoose = require("mongoose")
const validator = require("validator")




const userSchema = new mongooseSchema({
    name: {
        type: String,
        required: [true, "User name must be provided"]
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid e-mail adress"]
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, "Password must be provided"]
    },
    passwordConfirm: {
        type: String,
        required: [true, "You must confirm password"]
    }

})


const User = mongoose.model("User", userSchema)


module.exports = User;