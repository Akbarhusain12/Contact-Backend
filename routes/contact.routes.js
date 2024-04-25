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
// router.use(validateToken);

router.route("/")
    .get(getContacts)  
    .post(createContact);  

router.route("/:id")
    .get(getContactById) 
    .put(updateContact)  
    .delete(deleteContact);  

export default router;
