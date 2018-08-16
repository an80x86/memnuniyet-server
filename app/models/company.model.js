const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    namename: String,
    description: String,
    active: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);