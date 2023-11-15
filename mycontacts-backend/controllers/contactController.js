const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @ desc Get all contacts
// @ route Get /api/contacts
// @ access public (access to the api) (will be made private after integrating the authentication)

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    //This is a Mongoose method used to find a document by its ID and update it. It takes three parameters:
    req.params.id,
    req.body,
    { new: true } //By default, findByIdAndUpdate returns the original document before the update. Setting { new: true } ensures that it returns the modified or the updated document.
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
