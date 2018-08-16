module.exports = (app) => {
    const companies = require('../controllers/company.controller.js');

    // Create a new Note
    app.post('/companies', companies.create);

    // Retrieve all Notes
    app.get('/companies', companies.findAll);

    // Retrieve a single Note with noteId
    app.get('/companies/:companyId', companies.findOne);

    // Update a Note with noteId
    app.put('/companies/:companyId', companies.update);

    // Delete a Note with noteId
    app.delete('/companies/:companyId', companies.delete);
}