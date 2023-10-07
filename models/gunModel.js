const mongoose = require("mongoose")
const slugify = require("slugify")


const gunSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Gun's name must be defined"],
        unique: true,
        trim: true
    },
    slug: {
        type: String
    },
    gauge: {
        type: String,
        required: [true, "Gun's gauge must be defined"]
    },
    stockMaterial: {
        type: String,
        required: [true, "Gun's stock material must be defined"],
        trim: true
    },
    summary: {
        type: String,
        trim: true,
        required: true
    },
    descrption: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Gun must have a price"],
    },
    priceDiscount: Number,

    type: {
        type: String,
        required: [true, "The gun type must be defined"]
    },
    ratingsAverage: {
        type: Number,
        default: 3.0,
        max: 5.0,
        min: 0
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    action: {
        type: String,
        required: [true, "Action of a gun must be defined"]
    },
    stockColor: {
        type: String,
        required: [true, "Stock color must be defined"]
    },
    capacity: {
        type: String,
        required: [true, "Capacity of a gun mus be defined"]
    },
    imageCover: {
        type: String,
        required: [true, "A gun must have a cover image"]
    },
    /// array of strings
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        // select parameter can exclude parameter from response if set to false
        select: false
    }

})
// MONGOOSE MIDDLEWARE
// this is called before .save command and .create command
gunSchema.pre("save", function(next){
    this.slug = slugify(this.name, {lower: true})
    next();
})

gunSchema.pre("save", function(next){
    console.log("About to save document...")
    next();
})


// this middleware is called after the given method and has access not only to "next" parameter, but also to created document
gunSchema.post("save", function(doc, next){
    console.log(doc)
    next();
})

const Gun = mongoose.model("Gun", gunSchema);




module.exports = Gun;