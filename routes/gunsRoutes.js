const express = require("express");
const gunController = require("../controllers/gunController");

const router = express.Router();
// param middleware, define param name and function as second argument

//router.param("id", gunController.checkID);

router
  .route("/")
  .get(gunController.getAllGuns)
  .post(gunController.checkBody, gunController.createNewGun);

router
  .route("/:id")
  .get(gunController.getSingleGun)
  .patch(gunController.updateGun)
  .delete(gunController.deleteGun);

module.exports = router;
