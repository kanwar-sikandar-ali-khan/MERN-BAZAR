const express = require("express");
const {boilerValidations} = require("../validations/boilerValidations");
const {boiler} = require("../controllers/boilerController");
const router = express.Router();
router.post("/boiler",boilerValidations, boiler);
module.exports = router;    