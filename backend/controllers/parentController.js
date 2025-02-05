const {validationResult} = require("express-validator");
const ParentModel = require("../models/ParentModel");
const ChildrenModel = require("../models/ChildrenModel");

const {hashedPassword, createToken,comparePassword} = require("../services/authServices");


module.exports.parentCreate = async (req, res) => {
    console.log(req.body)
    const {father_name,mother_name,cnic} = req.body;
    try {
        const parent_create_with_table = await ParentModel.create({
            father_name,
            mother_name,
            cnic
        });
        return res.status(201).json({msg: 'Parent created!', parent_create_with_table});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Server internal error!");
    }

}


module.exports.parentGetSingle = async (req, res) => {
    const { id } = req.query; // Parent ID from query parameters
    console.log("Parent ID:", id);

    try {
        // Find the parent by ID
        const parent = await ParentModel.findById(id);
        if (!parent) {
            return res.status(404).json({ message: "Parent not found!" });
        }

        // Find children associated with the parent
        const children = await ChildrenModel.find({ parent_id: id });

        // Add children array to parent object
        const parentWithChildren = {
            ...parent.toObject(), // Convert Mongoose document to plain object
            children: children,   // Add children array
        };

        return res.status(200).json(parentWithChildren);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server internal error!" });
    }
};

