
const fs = require("fs")
const express = require("express")




const gunzData = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/gunz-data.json`)
)


const app = express();
///// MIDDLEWARE --> gets body parameteres
app.use(express.json())


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

app.post("/api/v1/guns", (req, res)=>{
    const newId = gunzData[gunzData.length - 1].id + 1;
    const newGun = {id: newId, ...req.body}
    gunzData.push(newGun)
    fs.writeFile(`${__dirname}/dev-data/data/gunz-data.json`, JSON.stringify(gunzData), err=>{
        res.status(201).json({
            status: "Success",
            gun: newGun
        })
    })
    
})




app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`)
})