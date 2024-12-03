const express = require("express")
const morgan = require("morgan")
const userRouter = require("./routes/userRoutes")
const gunRouter = require("./routes/gunsRoutes")
const cors = require('cors')
const rateLimit = require('express-rate-limit')




const app = express();




// 1) GLOBAL MIDDLEWARES



console.log(process.env.NODE_ENV)



if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}
let corsOptions = {
    origin: 'http://localhost:3000',
    credentials : true
   }
  
  // limiting the number of requests per one IP in one hour timeframe
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour."
})
app.use("/api", limiter)
app.use(express.json())
app.use(cors(corsOptions));
  
  app.use(function (req, res, next) {	
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
      res.setHeader('Access-Control-Allow-Credentials', true);    
      next();
  });


app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    
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
