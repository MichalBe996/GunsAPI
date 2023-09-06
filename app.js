
const fs = require("fs")
const express = require("express")
const morgan = require("morgan")




// 1) MIDDLEWARE 
const gunzData = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/gunz-data.json`)
)


const app = express();


app.use(express.json())
app.use(morgan("dev"))



// 2) ROUTE HANDLER
const getAllGuns = (req, res)=>{
    res.status(200).json({
        status: "success",
        quantity: gunzData.length,
        data: {
            guns: gunzData
        }
    })
}

const getSingleGun = (req, res)=>{
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
}
const createNewGun = (req, res)=>{
    const newId = gunzData[gunzData.length - 1].id + 1;
    const newGun = {id: newId, ...req.body}
    gunzData.push(newGun)
    fs.writeFile(`${__dirname}/dev-data/data/gunz-data.json`, JSON.stringify(gunzData), err=>{
        res.status(201).json({
            status: "Success",
            gun: newGun
        })
    })
    
}

const updateGun = (req, res) => {
    const gun = gunzData.find(element=> element.id === parseInt(req.params.id))
    if(!gun){
        return res.status(404).json({
            status: "Fail",
            message: `No gun with id: ${req.params.id}`
        })
    }
    res.status(200).json({
        status: "Success",
        message: "Element updated successfully"
    })
}

const deleteGun = (req, res)=>{
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
    
    
    
    
}

// app.get("/api/v1/guns", getAllGuns)
// app.get("/api/v1/guns/:id", getSingleGun) 
// app.post("/api/v1/guns", createNewGun)
// app.patch("/api/v1/guns/:id", updateGun)
// app.delete("/api/v1/guns/:id", deleteGun)

// 3) ROUTES
app
    .route("/api/v1/guns")
    .get(getAllGuns)
    .post(createNewGun)

app
    .route("/api/v1/guns/:id")
    .get(getSingleGun)
    .patch(updateGun)
    .delete(deleteGun)


//4) SERVER
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`)
})