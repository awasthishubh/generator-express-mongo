const mongoose = require("mongoose");

const schema = mongoose.Schema;

const model = new schema({
    attrName:{
        type:String
    }
});

module.exports = mongoose.model("attrName", model);