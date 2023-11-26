const express = require("express");
const router = express.Router();

const mapsController = require("../controllers/mapsController");
const verifyToken = require('../middlewares/verifyToken');


// Create a new commentary
router.post("/create-point", verifyToken,mapsController.addPoint);

router.get("/get-all-points", verifyToken, mapsController.getAllPoints);


// Delete a commentary by ID
router.delete("/delete-points/:pointsId", verifyToken, mapsController.deletePoint);

module.exports = router;
