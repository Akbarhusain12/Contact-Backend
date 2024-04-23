import express from "express"
import {
    getContacts,
    createContact,
    getContactbyId,
    updateContact,
    deleteContact
} from "../controllers/contact.controller.js"
const router = express.Router()

router.route("/").get(getContacts).post(createContact)

router.route("/:id").get(getContactbyId).put(updateContact).delete(deleteContact)

export default router