
const fs = require("fs")
const express = require("express")




const gunzData = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/gunz-data.json`)
)
const app = express();


const port = 3000;

app.get("/api/v1/guns", (req, res)=>{
    res.status(200).json({
        status: "success",
        quantity: gunzData.length,
        data: {
            guns: gunzData
        }
    })
})




app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`)
})