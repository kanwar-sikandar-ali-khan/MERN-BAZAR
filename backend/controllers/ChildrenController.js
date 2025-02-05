const {validationResult} = require("express-validator");
const ChildrenModel = require("../models/ChildrenModel");
const {hashedPassword, createToken,comparePassword} = require("../services/authServices");


module.exports.childrenCreate = async (req, res) => {
    console.log(req.body)
    const {child_name,cnic,parent_id} = req.body;
    try {
        const children_create_with_table = await ChildrenModel.create({
            child_name,
            cnic,
            parent_id
        });
        return res.status(201).json({msg: 'children created!', children_create_with_table});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Server internal error!");
    }

}

