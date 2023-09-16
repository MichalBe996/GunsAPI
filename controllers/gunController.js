const Gun = require("../models/gunModel")

//const gunzData = JSON.parse(fs.readFileSync(`./dev-data/data/gunz-data.json`));



exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "Fail",
      message: "Client must provide both name and price of the gun"
    });
  }
  next()
};

exports.getAllGuns = async (req, res) => {
  const allGuns = await Gun.find({})
  res.status(200).json({
    status: "Success",
    data: allGuns
  })
};

exports.getSingleGun = (req, res) => {
  const gun = gunzData.find(
    (element) => element.id === parseInt(req.params.id),
  );
  res.status(200).json({
    status: "Success",
    gun,
  });
};
exports.createNewGun = async (req, res) => {
  const newGun = new Gun({
    ...req.body
  })
  await newGun.save()
    .then(element => {
      return res.status(201).json({
        status: "Success",
        message: "New Gun added successfully!",
        data: element
      })
  })
  .catch(err => console.log(err))
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
