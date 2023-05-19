const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

//Getting all the contacts from the database
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

//creating a new contact and adding it to the database
const createContact = asyncHandler(async(req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    })
    res.status(201).json(contact);
})

//Getting a contact by id
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
})

//Update a contact
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    };

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You dont have permission to update another users contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true }
    );

    res.status(200).json(updatedContact);
})

//delete a contact
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    };

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You dont have permission to delete another users contacts")
    }

    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json(contact)
})

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}