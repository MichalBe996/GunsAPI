
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

app.get("/api/v1/guns/:id", (req, res)=>{
    const gun = gunzData.find(element => element.id === parseInt(req.params.id))
    if(!gun){
        return res.status(404).json({
            status: "Fail",
            message: `There is no gun with id: ${req.params.id}`
        })
    }
    res.status(200).json({
        status: "Success",
        gun
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

app.delete("/api/v1/guns/:id", (req, res)=>{
    const singleID = parseInt(req.params.id);
    const index = gunzData.findIndex(e => e.id === singleID)
    if(index > 0){
        gunzData.splice(index, 1)
        fs.writeFile(`${__dirname}/dev-data/data/gunz-data.json`, JSON.stringify(gunzData), err=>{
            res.status(200).json({
                status: "Success",
                msg: `Element with id: ${singleID} has been deleted successfully.`
            })
        })
    }else{
        res.json({
            status: "Failed",
            msg: "No element with such id number"

        })
    }
    
    
    
    
})




app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`)
})