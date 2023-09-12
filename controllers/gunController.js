const fs = require("fs");

const gunzData = JSON.parse(fs.readFileSync(`./dev-data/data/gunz-data.json`));

exports.checkID = (req, res, next, val) => {
  const gun = gunzData.find(
    (element) => element.id === parseInt(req.params.id),
  );
  if (!gun) {
    return res.status(404).json({
      status: "Failed",
      message: "Wrong ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "Fail",
      message: "Client must provide both name and price of the gun"
    });
  }
  next()
};

exports.getAllGuns = (req, res) => {
  res.status(200).json({
    status: "success",
    quantity: gunzData.length,
    data: {
      guns: gunzData,
    },
  });
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
exports.createNewGun = (req, res) => {
  const newId = gunzData[gunzData.length - 1].id + 1;
  const newGun = { id: newId, ...req.body };
  gunzData.push(newGun);
  fs.writeFile(
    `${__dirname}/dev-data/data/gunz-data.json`,
    JSON.stringify(gunzData),
    (err) => {
      res.status(201).json({
        status: "Success",
        gun: newGun,
      });
    },
  );
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
