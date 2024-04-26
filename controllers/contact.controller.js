import asyncHandler from "express-async-handler";
import { Contact } from "../models/contact.model.js";

// Get contacts for the authenticated user
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.id});
    res.status(200).json(contacts);
});

// Create a new contact
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400).json({ error: "All fields (name, email, phone) are required" });
        return;
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user._id
        });

    res.status(201).json({ message: "Contact created successfully", contact });
});


// Get a contact by ID
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ error: "Contact not found" });
        return;
    }
    res.status(200).json({ message: `Get contact by ID ${req.params.id}`, contact });
});


//Update contact
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(400)
        throw new Error("Contact Not Found");
    }

    if (contact.user_id !== req.id) {
        res.status(403)
        throw new Error("User don't have permission to update other user contact")
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

    if (contact.user_id !== req.id) {
        res.status(403)
        throw new Error("User don't have permission to delete other user contact")
    }

    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json({ message: "Contact deleted successfully", contact })
})


export {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact
}