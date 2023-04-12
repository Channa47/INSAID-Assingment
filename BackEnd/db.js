const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://channa:channa@cluster0.hdqrudt.mongodb.net/?retryWrites=true&w=majority");

module.exports = connection;