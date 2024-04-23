import asyncHandler from "express-async-handler"
import { Contact } from "../models/contact.model.js"
//Get contact
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
})

//Create contact
const createContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body

    if (!(name && email && phone)) {

        res.status(400)
        throw new Error("All fields are required")
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json({ message: "Contact created successfully", contact })
})

//Get contact by ID
const getContactbyId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(400)
        throw new Error("Contact Not Found");
    }
    res.status(200).json({ message: `Get all contact for ${req.params.id}`, contact })
})

//Update contact
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(400)
        throw new Error("Contact Not Found");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json({ message: `Update contact for ID ${req.params.id}`, updateContact })
})

//Delete contact
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(400)
        throw new Error("Contact Not Found");
    }

    await Contact.deleteMany()
    res.status(200).json(contact)
})


export {
    getContacts,
    createContact,
    getContactbyId,
    updateContact,
    deleteContact
}