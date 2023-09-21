const mongoose = require("mongoose")
const dotenv = require("dotenv");
const fs = require("fs")
const Gun = require("./../../models/gunModel")

dotenv.config({ path: "./../../config.env" });


const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

// console.log(process.env)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log("DB connection successful..."))


// READ JSON FILE

const guns = JSON.parse(fs.readFileSync(`${__dirname}/guns-simple.json`, "utf-8"))

// import data into database

const importData = async () => {
    try {
        await Gun.create(guns)
        console.log("Data successfully loaded")
    } catch (err) {
        console.log(err)
        
    }
}


/// delete all data from database

const deleteData = async () => {
    try {
        await Gun.deleteMany();
        console.log("Data successfully deleted!")
    } catch (err) {
       console.log(err) 
    }
}



console.log(process.argv)
if(process.argv[2]==="--import"){
    importData();
}
    else if(process.argv[2]==="--delete"){
        deleteData()
    }
