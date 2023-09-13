const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

// console.log(process.env)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log("DB connection successful..."))

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

const Gun = mongoose.model("Gun", gunSchema)



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
