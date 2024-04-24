import express from "express";
import {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact
} from "../controllers/contact.controller.js";
import validateToken from "../middleware/validateToken.middleware.js";

const router = express.Router();

// Middleware to validate token for all routes in this router
router.use(validateToken);

// Define routes for handling contacts
router.route("/")
    .get(getContacts)  // GET request to fetch all contacts
    .post(createContact);  // POST request to create a new contact

router.route("/:id")
    .get(getContactById)  // GET request to fetch a specific contact by ID
    .put(updateContact)   // PUT request to update a contact by ID
    .delete(deleteContact);  // DELETE request to delete a contact by ID

export default router;
