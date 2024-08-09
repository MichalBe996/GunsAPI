const express = require("express");
const gunController = require("../controllers/gunController");
const authController = require("../controllers/authController")

const router = express.Router();
// param middleware, define param name and function as second argument

//router.param("id", gunController.checkID);

/// alias for top 3 cheapest
router.route("/top-3-cheap").get(gunController.aliasTopGuns, gunController.getAllGuns)


router.route("/gun-stats").get(gunController.getGunStats)


router
  .route("/")
  .get(gunController.getAllGuns)
  .post(gunController.createNewGun);

router
  .route("/:id")
  .get(gunController.getSingleGun)
  .patch(gunController.updateGun)
  .delete(authController.protect, authController.restrictTo("admin"), gunController.deleteGun);

module.exports = router;
