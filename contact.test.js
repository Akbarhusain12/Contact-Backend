// Mocha and Chai for testing purpose

import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from './server.js'; // Assuming your Express app is exported from app.js
import { Contact } from './models/contact.model.js'; // Import your Contact model
import connectDB from './db/index.js';

const server = use(chaiHttp);

// Test suite for Contact API
describe('Contact API Tests', () => {
    before(async () => {
        // Start your Express server
        await new Promise((resolve) => {
            app.listen(0, () => {
                console.log('Server started');
                resolve();
            });
        });
    });

    before(async () => {
        try {
            await connectDB(); // Invoke the connectDB function to connect to MongoDB
        } catch (error) {
            console.error('Database connection error:', error);
            process.exit(1); // Exit the process if database connection fails
        }
    });


    // Test getContacts endpoint

    // Test case to fetch all contacts
    describe('GET /api/contact', () => {
        it('should fetch all contacts', async () => {
            // Send GET request to /api/contact
            const res = await server.request('http://localhost:5001/api/contact').get('/');

            // Assert response status code
            expect(res).to.have.status(200);
            // Assert response body (assuming it returns an array of contacts)
            expect(res.body).to.be.an('array').that.is.not.empty;
            // Additional assertions can be added based on your API response
        });
    });


    // Test createContact endpoint
    describe('POST /api/contact', () => {
        it('should create a new contact', async () => {
            const newContact = {
                name: 'Mark Doe',
                email: 'mark@example.com',
                phone: '1234567890'
                // user_id: req.user._id
            };
    
            // Send POST request to create a new contact
            const res = await server.request('http://localhost:5001/api/contact').post('/').send(newContact);
    
            // Assert response status code
            expect(res).to.have.status(201); // Expecting a successful creation (status code 201)

            // Assert response body
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').equal('Contact created successfully');
            expect(res.body).to.have.property('contact').to.be.an('object');
            expect(res.body.contact).to.have.property('name').equal('Mark Doe');
            expect(res.body.contact).to.have.property('email').equal('mark@example.com');
            expect(res.body.contact).to.have.property('phone').equal('1234567890');
            // Add more assertions to validate the response data as needed
        });
    });

    // Test getContactById endpoint
    describe('GET /api/contacts/:id', () => {
        it('should fetch a specific contact by ID', async () => {
            const contact = await Contact.findOne();
            const contactId = contact._id.toString();
            // console.log(contactId)
            const res = await server.request('http://localhost:5001/api/contact').get(`/${contactId}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal(`Get contact by ID ${contactId}`);
            expect(res.body).to.have.property('contact').to.deep.include(contact.toJSON());
            // Add more assertions to validate the response data
        });
    });

    // Test updateContact endpoint
    describe('PUT /api/contacts/:id', () => {
        it('should update a contact by ID', async () => {
            const contact = await Contact.findOne(); // Find an existing contact from the database
            const updatedData = { name: 'Updated Name' };
            const res = await server.request('http://localhost:5001/api/contact').get(`/${contact._id}`).send(updatedData);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal(`Update contact for ID ${contact._id}`);
            expect(res.body).to.have.property('updateContact').to.be.an('object');
            // Add more assertions to validate the updated contact data
        });
    });

    // Test deleteContact endpoint
    describe('DELETE /api/contacts/:id', () => {
        it('should delete a contact by ID', async () => {
            const contact = await Contact.findOne(); // Find an existing contact from the database
            const res = await server.request('http://localhost:5001/api/contact').get(`/${contact._id}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Contact deleted successfully');
            expect(res.body).to.have.property('contact').to.deep.include(contact.toJSON());
            // Add more assertions to validate the deleted contact data
        });
    });

});