const express = require("express")
const morgan = require("morgan")
const userRouter = require("./routes/userRoutes")
const gunRouter = require("./routes/gunsRoutes")
const cors = require("cors")




const app = express();




// 1) MIDDLEWARE 
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}



app.use(express.json())
app.use(cors())
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime)
    next();
})
app.use((req, res, next)=>{
    console.log("This is test middleware")
    next();
})



// 2) ROUTE HANDLER




// app.get("/api/v1/guns", getAllGuns)
// app.get("/api/v1/guns/:id", getSingleGun) 
// app.post("/api/v1/guns", createNewGun)
// app.patch("/api/v1/guns/:id", updateGun)
// app.delete("/api/v1/guns/:id", deleteGun)

// 3) ROUTES



app.use("/api/v1/guns", gunRouter);
app.use("/api/v1/users", userRouter);



module.exports = app;
