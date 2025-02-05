const mongoose = require("mongoose");

const ParentSchema = mongoose.Schema({
    father_name: {
        required: true,
        type: String
    },
    mother_name: {
        required: true,
        type: String
    },
    cnic: {
        required: true,
        type: Number
    },
    is_Filer:{
        required: true,
        type: Boolean,
        default: false
    }
   
});

const ParentModel = mongoose.model("ParentTable", ParentSchema);
module.exports = ParentModel;