const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")




const userSchema = new mongoose.Schema({
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
        required: [true, "Password must be provided"],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "You must confirm password"],
        validate: {
            // THIS ONLY WORKS ON CREATE AND SAVE!!!
            validator: function(el){
                return el === this.password
            },
            message: "Passwords are not the same"
        }
    },
    passwordChangedAt: Date

})

userSchema.pre("save", async function(next){
    // Only run this function if password was modified
    if(!this.isModified("password")) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete password confirm field
    this.passwordConfirm = undefined;
    next();
})


userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword) 
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }



    return false;
}


const User = mongoose.model("User", userSchema)


module.exports = User;