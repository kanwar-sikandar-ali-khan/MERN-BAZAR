const {validationResult} = require("express-validator");
const UserModel = require("../models/User");
const {hashedPassword, createToken,comparePassword} = require("../services/authServices");

module.exports.boiler = async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body)
    return res.status(201).json({msg: 'api is working', });
}
