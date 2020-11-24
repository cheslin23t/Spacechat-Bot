const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
    Guild: String,
    Messages: Array
});
module.exports = mongoose.model("warns", Schema);