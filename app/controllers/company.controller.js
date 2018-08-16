const Company = require('../models/company.model.js');

// Create and Save a new Company
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Company content can not be empty"
        });
    }

    // Create a Company
    const company = new Company({
        name: req.body.name || "Untitled Company", 
        description: req.body.description,
        active: req.body.active
    });

    // Save Company in the database
    company.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Company."
        });
    });
};

// Retrieve and return all companies from the database.
exports.findAll = (req, res) => {
    Company.find()
    .then(companies => {
        res.send(companies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};

// Find a single company with a noteId
exports.findOne = (req, res) => {
    Company.findById(req.params.companyId)
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });            
        }
        res.send(company);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving company with id " + req.params.companyId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Company content can not be empty"
        });
    }

    // Find note and update it with the request body
    Company.findByIdAndUpdate(req.params.noteId, {
        name: req.body.name || "Untitled Company",
        description: req.body.description,
        active: req.body.active
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.companyId
        });
    });
};

// Delete a note with the specified companyId in the request
exports.delete = (req, res) => {
    Company.findByIdAndRemove(req.params.companyId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });
        }
        res.send({message: "Company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.companyId
        });
    });
};
