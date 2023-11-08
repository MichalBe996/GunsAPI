const mongoose = require("mongoose")




const userSchema = new mongooseSchema({
    name: {
        type: String,
        required: [true, "User name must be provided"]
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password must be provided"]
    },
    passwordConfirm: {
        type: String,
        required: [true, "You must confirm password"]
    }

})


const User = mongoose.model("User", userSchema)


module.exports = User;