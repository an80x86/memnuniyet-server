const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: String,
    description: String,
    active: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);