const express = require("express");
const {registerValidations,loginValidations} = require("../validations/userValidations");
const {parentCreate,parentGetSingle} = require("../controllers/parentController");
const router = express.Router();
router.post("/parent_create", parentCreate);
router.get("/parent_get_single", parentGetSingle);

module.exports = router;