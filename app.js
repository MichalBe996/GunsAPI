const express = require("express")
const morgan = require("morgan")
const userRouter = require("./routes/userRoutes")
const gunRouter = require("./routes/gunsRoutes")
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require("helmet")

const app = express();

// 1) GLOBAL MIDDLEWARES

// Securing the HTTP headers
app.use(helmet())

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

  
// Limiting the number of requests per one IP in one hour timeframe
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour."
})
app.use("/api", limiter)

app.use(express.json())

// Setting up the CORS middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials : true
   }
app.use(cors(corsOptions));

// Allowing cross origin
app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
  });

// Test middleware
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    
    next();
})
app.use((req, res, next)=>{
    console.log("This is test middleware")
    next();
})


app.use("/api/v1/guns", gunRouter);
app.use("/api/v1/users", userRouter);



module.exports = app;
