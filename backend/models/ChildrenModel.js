const { Schema, model, Types } = require("mongoose");

const ChildrenSchema = Schema({
    parent_id: { type: Types.ObjectId, ref: "ParentTable" },
    child_name: {
        required: true,
        type: String
    },
    cnic: {
        required: true,
        type: Number
    },
   
});

const ChildrenModel = model("ChildrenTable", ChildrenSchema);
module.exports = ChildrenModel;

