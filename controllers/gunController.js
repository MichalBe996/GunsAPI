const Gun = require("../models/gunModel")

//const gunzData = JSON.parse(fs.readFileSync(`./dev-data/data/gunz-data.json`));





exports.getAllGuns = async (req, res) => {

  try {
    const allGuns = await Gun.find({})
    res.status(200).json({
      status: "Success",
      results: allGuns.length,
      data: {
        allGuns
      }
    })
  } catch (err){
    res.status(404).json({
      status: "Fail",
      message: err
    })
  }
  
};

exports.getSingleGun =  async (req, res) => {
  try {
    const singleGun = await Gun.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        singleGun
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err
    })
  }
};
exports.createNewGun = async (req, res) => {
  try {
    const newGun = await Gun.create({
      ...req.body
    })
    res.status(201).json({
      status: "Success",
      message: "Gun added succesfully",
      data: newGun
    })
  } catch(err){
    res.status(400).json({
      status: "Fail",
      message: err
    })
  }
};

exports.updateGun = async (req, res) => {
  try {
    const gun = await Gun.findByIdAndUpdate(req.params.id, req.body, {
      //// below parameter returns new document after the update is applied
      new: true,
      // runValidators checks e.g. whether parameters are of desired type
      runValidators: true
    })
    res.status(200).json({
      status: "Success", 
      data: {
        gun: gun
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err
    })
  }
};

exports.deleteGun = async (req, res) => {
  try {
    await Gun.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "Success",
      message: "Gun deleted successfully"
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err
    })
  }
  
  
};

