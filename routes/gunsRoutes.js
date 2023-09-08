const express = require("express")
const gunController = require("../controllers/gunController")

const router = express.Router();



router
    .route("/")
    .get(gunController.getAllGuns)
    .post(gunController.createNewGun)

router
    .route("/:id")
    .get(gunController.getSingleGun)
    .patch(gunController.updateGun)
    .delete(gunController.deleteGun)



module.exports = router;