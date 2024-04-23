import asyncHandler from "express-async-handler"

//Get contact
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all contact" })
})

//Create contact
const createContact = asyncHandler(async (req, res) => {

    const { name, email } = req.body

    if (!(name && email)) {

        res.status(400)
        throw new Error("Name and email is required")
    }

    res.status(201).json({ message: "Contact created successfully" })
})

//Get contact by ID
const getContactbyId = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get all contact for ${req.params.id}` })
})
//Update contact
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` })
})

//Delete contact
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` })
})


export {
    getContacts,
    createContact,
    getContactbyId,
    updateContact,
    deleteContact
}