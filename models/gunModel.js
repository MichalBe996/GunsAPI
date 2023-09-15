const mongoose = require("mongoose")



const gunSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Gun must have a name"],
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Gun must have a price"],
    },
    type: {
        type: String,
        required: [true, "The gun type must be defined"]
    }
})

const Gun = mongoose.model("Gun", gunSchema);




module.exports = Gun;