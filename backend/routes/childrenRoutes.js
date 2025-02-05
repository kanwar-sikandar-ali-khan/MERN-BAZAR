const express = require("express");
const {registerValidations,loginValidations} = require("../validations/userValidations");
const {childrenCreate} = require("../controllers/ChildrenController");
const router = express.Router();
router.post("/children_create", childrenCreate);
module.exports = router;