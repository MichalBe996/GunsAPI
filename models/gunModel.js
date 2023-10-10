const mongoose = require("mongoose")
const slugify = require("slugify")
const validator = require("validator")


const gunSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Gun's name must be defined"],
        unique: true,
        trim: true,
        maxlength: [40, "A gun name must have less or equal than 40 characters!"],
        minlength: [5, "A gun name must be 5 or more characters long!"],
        
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
    
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val){
                return val < this.price;
            }
        },
        message: "Price discount must be lower than the regular price!"

        },
    

    type: {
        type: String,
        required: [true, "The gun type must be defined"]
    },
    ratingsAverage: {
        type: Number,
        default: 3.0,
        max: [5, "Rating must be below 1.0!"],
        min: [1, "Rating must be above 1.0!"]
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
    },
    secretGun: {
        type: Boolean,
        default: false
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



/// this is query middleware 

// regular expression


// /^find/ ------ all the strings that start with find, so queries for finding all data, finding data by id etc.
gunSchema.pre(/^find/, function(next){
    this.find({ secretGun: {$ne: true}})
    this.start = Date.now()
    
    next();
})


gunSchema.post(/^find/, function(docs, next){
    console.log(docs);
    console.log(`Query took: ${Date.now() - this.start} miliseconds`)
    next();
})

// aggregation middleware

gunSchema.pre("aggregate", function(next){
    this.pipeline().unshift({ $match: {secretGun: {$ne: true}}})
    console.log(this.pipeline())
    next();
})


const Gun = mongoose.model("Gun", gunSchema);




module.exports = Gun;