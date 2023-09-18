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

exports.updateGun = (req, res) => {
  const gun = gunzData.find(
    (element) => element.id === parseInt(req.params.id),
  );
  res.status(200).json({
    status: "Success",
    message: "Element updated successfully",
  });
};

exports.deleteGun = (req, res) => {
  const singleID = parseInt(req.params.id);
  const index = gunzData.findIndex((e) => e.id === singleID);
  if (index > 0) {
    gunzData.splice(index, 1);
    fs.writeFile(
      `${__dirname}/dev-data/data/gunz-data.json`,
      JSON.stringify(gunzData),
      (err) => {
        res.status(200).json({
          status: "Success",
          msg: `Element with id: ${singleID} has been deleted successfully.`,
        });
      },
    );
  } else {
    res.json({
      status: "Failed",
      msg: "No element with such id number",
    });
  }
};
