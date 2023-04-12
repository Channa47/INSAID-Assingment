const mongoose = require('mongoose');


const adminSchema = mongoose.Schema({
    username: String,
    password: String,
});

const AdminModel = mongoose.model('admin',adminSchema);

module.exports = AdminModel;